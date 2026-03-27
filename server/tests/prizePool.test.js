const { calculatePrizePools } = require('../services/prizePool.service');

describe('calculatePrizePools', () => {
  const config = {
    pool_percent_of_fee: 15,
    match5_share: 40,
    match4_share: 35,
    match3_share: 25
  };

  it('(100, 9.99, 0)', () => {
    const result = calculatePrizePools(100, 9.99, 0, config);
    expect(result.total_pool).toBe(149.85);
    expect(result.pool5).toBe(59.94);
    expect(result.pool4).toBe(52.45);
    expect(result.pool3).toBe(37.46);
    expect(result.active_subscribers).toBe(100);
  });

  it('Carried jackpot is added to pool5 correctly', () => {
    const result = calculatePrizePools(100, 9.99, 1000, config);
    expect(result.pool5).toBe(1059.94);
    expect(result.total_pool).toBe(149.85); 
  });

  it('(0, 9.99, 0): all pools are 0', () => {
    const result = calculatePrizePools(0, 9.99, 0, config);
    expect(result.total_pool).toBe(0);
    expect(result.pool5).toBe(0);
    expect(result.pool4).toBe(0);
    expect(result.pool3).toBe(0);
  });
});
