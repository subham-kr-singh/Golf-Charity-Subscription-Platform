const { supabaseAdmin } = require('../config/supabase');

const generateRandomDraw = () => {
  const numbers = Array.from({ length: 45 }, (_, i) => i + 1);
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  return numbers.slice(0, 5).sort((a, b) => a - b);
};

const generateWeightedDraw = (allScores) => {
  if (!allScores || allScores.length === 0) {
    return generateRandomDraw();
  }
  const frequency = {};
  for (let i = 1; i <= 45; i++) {
    frequency[i] = 0.5; // any number with 0 appearances gets frequency = 0.5
  }
  allScores.forEach(score => {
    if (frequency[score] === 0.5) frequency[score] = 1;
    else frequency[score]++;
  });

  const weights = {};
  let totalWeight = 0;
  for (let i = 1; i <= 45; i++) {
    const weight = 1 / frequency[i]; // inverse frequency
    weights[i] = weight;
    totalWeight += weight;
  }

  const selected = [];
  while (selected.length < 5) {
    let r = Math.random() * totalWeight;
    let chosen = null;
    for (let i = 1; i <= 45; i++) {
      if (selected.includes(i)) continue;
      r -= weights[i];
      if (r <= 0) {
        chosen = i;
        break;
      }
    }
    
    // Safety fallback
    if (!chosen) {
      const remaining = Array.from({length: 45}, (_,i) => i+1).filter(n => !selected.includes(n));
      chosen = remaining[0];
    }
    
    selected.push(chosen);
    totalWeight -= weights[chosen];
  }
  return selected.sort((a, b) => a - b);
};

const calculateMatches = (userScores, drawNumbers) => {
  if (!userScores || !drawNumbers) return 0;
  let matches = 0;
  userScores.forEach(score => {
    if (drawNumbers.includes(score)) {
      matches++;
    }
  });
  return matches;
};

const buildDrawEntries = async (drawId) => {
  // 1. Get active subscriptions
  const { data: subs, error: subsError } = await supabaseAdmin
    .from('subscriptions')
    .select('user_id')
    .eq('status', 'active')
    .gt('current_period_end', new Date().toISOString());
    
  if (subsError) return { data: null, error: subsError };
  
  const userIds = subs.map(s => s.user_id);
  if (userIds.length === 0) return { data: 0, error: null };

  // 2. Get their scores
  const { data: scores, error: scoresError } = await supabaseAdmin
    .from('scores')
    .select('user_id, value')
    .in('user_id', userIds);
    
  if (scoresError) return { data: null, error: scoresError };
  
  // Group scores
  const userScoresMap = {};
  scores.forEach(s => {
    if (!userScoresMap[s.user_id]) userScoresMap[s.user_id] = [];
    userScoresMap[s.user_id].push(s.value);
  });
  
  const entries = [];
  for (const userId in userScoresMap) {
    if (userScoresMap[userId].length >= 3) {
      entries.push({
        draw_id: drawId,
        user_id: userId,
        score_snapshot: userScoresMap[userId] // array of values
      });
    }
  }
  
  if (entries.length === 0) return { data: 0, error: null };
  
  const { error: insertError } = await supabaseAdmin
    .from('draw_entries')
    .insert(entries);
    
  if (insertError) return { data: null, error: insertError };
  
  return { data: entries.length, error: null };
};

const processDrawResults = async (drawId, winningNumbers) => {
  const { data: entries, error: entriesError } = await supabaseAdmin
    .from('draw_entries')
    .select('*')
    .eq('draw_id', drawId);
    
  if (entriesError) return { data: null, error: entriesError };
  
  const winners_5 = [];
  const winners_4 = [];
  const winners_3 = [];
  
  const winnerRows = [];
  
  entries.forEach(entry => {
    const matches = calculateMatches(entry.score_snapshot, winningNumbers);
    if (matches >= 3) {
      const intersection = entry.score_snapshot.filter(s => winningNumbers.includes(s));
      const row = {
        draw_id: drawId,
        user_id: entry.user_id,
        match_type: matches.toString(),
        matched_numbers: intersection,
        prize_amount: 0
      };
      
      if (matches === 5) winners_5.push(row);
      else if (matches === 4) winners_4.push(row);
      else if (matches === 3) winners_3.push(row);
      
      winnerRows.push(row);
    }
  });

  return { data: { winners_5, winners_4, winners_3, winnerRows }, error: null };
};

const calculateAndAssignPrizes = async (drawId, winners, pools, carriedJackpot) => {
  let { pool5, pool4, pool3 } = pools;
  pool5 += (carriedJackpot || 0);
  
  let jackpot_carried_forward = false;
  
  if (winners.winners_5 && winners.winners_5.length > 0) {
    const prize = Math.round((pool5 / winners.winners_5.length) * 100) / 100;
    winners.winners_5.forEach(w => w.prize_amount = prize);
  } else {
    jackpot_carried_forward = true;
  }
  
  if (winners.winners_4 && winners.winners_4.length > 0) {
    const prize = Math.round((pool4 / winners.winners_4.length) * 100) / 100;
    winners.winners_4.forEach(w => w.prize_amount = prize);
  }
  
  if (winners.winners_3 && winners.winners_3.length > 0) {
    const prize = Math.round((pool3 / winners.winners_3.length) * 100) / 100;
    winners.winners_3.forEach(w => w.prize_amount = prize);
  }
  
  const allWinners = [
    ...(winners.winners_5 || []), 
    ...(winners.winners_4 || []), 
    ...(winners.winners_3 || [])
  ];
  
  if (allWinners.length > 0) {
    for (const winner of allWinners) {
      if (winner.id) {
        await supabaseAdmin.from('winners').update({ prize_amount: winner.prize_amount }).eq('id', winner.id);
      }
    }
  }

  return { 
    data: { 
      jackpot_carried_forward, 
      next_jackpot: jackpot_carried_forward ? pool5 : 0 
    }, 
    error: null 
  };
};

module.exports = {
  generateRandomDraw,
  generateWeightedDraw,
  calculateMatches,
  buildDrawEntries,
  processDrawResults,
  calculateAndAssignPrizes
};
