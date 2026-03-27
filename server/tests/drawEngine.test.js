const {
  generateRandomDraw,
  generateWeightedDraw,
  calculateMatches
} = require('../services/drawEngine.service');

describe('generateRandomDraw', () => {
  it('Returns array of exactly 5 numbers', () => {
    const draw = generateRandomDraw();
    expect(draw).toHaveLength(5);
  });

  it('All numbers are between 1 and 45 inclusive', () => {
    const draw = generateRandomDraw();
    draw.forEach(num => {
      expect(num).toBeGreaterThanOrEqual(1);
      expect(num).toBeLessThanOrEqual(45);
    });
  });

  it('All 5 numbers are unique', () => {
    const draw = generateRandomDraw();
    const unique = new Set(draw);
    expect(unique.size).toBe(5);
  });

  it('Returns different results across multiple calls (probabilistic)', () => {
    const draw1 = generateRandomDraw();
    const draw2 = generateRandomDraw();
    const draw3 = generateRandomDraw();
    expect(
      JSON.stringify(draw1) !== JSON.stringify(draw2) || 
      JSON.stringify(draw2) !== JSON.stringify(draw3)
    ).toBe(true);
  });
});

describe('generateWeightedDraw', () => {
  it('Returns array of exactly 5 numbers', () => {
    const draw = generateWeightedDraw([1, 2, 3, 4, 5, 2, 3]);
    expect(draw).toHaveLength(5);
  });

  it('All numbers are unique and in range 1–45', () => {
    const draw = generateWeightedDraw([10, 20, 30, 10, 20]);
    expect(new Set(draw).size).toBe(5);
    draw.forEach(num => {
      expect(num).toBeGreaterThanOrEqual(1);
      expect(num).toBeLessThanOrEqual(45);
    });
  });

  it('Works with empty allScores array (falls back gracefully)', () => {
    const draw = generateWeightedDraw([]);
    expect(draw).toHaveLength(5);
  });

  it('Works with allScores where some numbers have very high frequency', () => {
    const scores = Array(100).fill(15).concat(Array(100).fill(25));
    const draw = generateWeightedDraw(scores);
    expect(draw).toHaveLength(5);
  });
});

describe('calculateMatches', () => {
  it('([18, 25, 30, 14, 7], [25, 30, 7, 42, 3]) → 3', () => {
    expect(calculateMatches([18, 25, 30, 14, 7], [25, 30, 7, 42, 3])).toBe(3);
  });
  
  it('([1, 2, 3, 4, 5], [6, 7, 8, 9, 10]) → 0', () => {
    expect(calculateMatches([1, 2, 3, 4, 5], [6, 7, 8, 9, 10])).toBe(0);
  });
  
  it('([10, 20, 30, 40, 45], [10, 20, 30, 40, 45]) → 5', () => {
    expect(calculateMatches([10, 20, 30, 40, 45], [10, 20, 30, 40, 45])).toBe(5);
  });
  
  it('([], [1, 2, 3, 4, 5]) → 0', () => {
    expect(calculateMatches([], [1, 2, 3, 4, 5])).toBe(0);
  });
  
  it('([1], [1, 2, 3, 4, 5]) → 1', () => {
    expect(calculateMatches([1], [1, 2, 3, 4, 5])).toBe(1);
  });
});
