import { useState } from 'react';
import { useAdmin } from '../../hooks/useAdmin';
import { DrawControlPanel } from '../../components/admin/DrawControlPanel';
import { DrawSimulationResult } from '../../components/admin/DrawSimulationResult';
import { Spinner } from '../../components/ui/Spinner';
import { formatShortDate } from '../../lib/utils';
import { Badge } from '../../components/ui/Badge';

export function AdminDrawPage() {
  const [simulationResult, setSimulationResult] = useState(null);
  const { data: drawsRes, isLoading, createData, isCreating } = useAdmin('draws');
  
  const draws = drawsRes?.data || [];

  const handleExecute = async (payload) => {
    const simulateCall = new Promise(resolve => setTimeout(resolve, 2000));
    await simulateCall;
    
    const mockResult = {
      winning_numbers: [12, 34, 5, 45, 23],
      stats: {
        total_winners: 145,
        total_prizes_value: payload.totalProfitPool * 0.4,
        jackpot_winners: 1
      }
    };
    
    setSimulationResult(mockResult);
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8 lg:max-w-5xl">
      <div>
        <h1 className="text-3xl font-heading font-extrabold text-white mb-2">
          Algorithmic Draw Engine
        </h1>
        <p className="text-muted">Execute the monthly cryptographic draw and review past draw statistics.</p>
      </div>

      <DrawControlPanel onExecute={handleExecute} isExecuting={isCreating} />

      {simulationResult && (
        <DrawSimulationResult result={simulationResult} />
      )}

      <div className="mt-12">
        <h2 className="text-xl font-heading font-bold text-white mb-6">Draw History Log</h2>
        
        <div className="overflow-x-auto rounded-xl border border-border bg-surface">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-border bg-surface-2 text-muted text-xs uppercase tracking-wider font-bold">
                <th className="px-6 py-4">Draw Month</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Winning Numbers</th>
                <th className="px-6 py-4">Total Winners</th>
                <th className="px-6 py-4 text-right">Executed By</th>
              </tr>
            </thead>
            <tbody>
              {draws.map((draw) => {
                 const nums = typeof draw.winning_numbers === 'string' 
                   ? JSON.parse(draw.winning_numbers) 
                   : draw.winning_numbers;
                   
                 return (
                  <tr key={draw.id} className="border-b border-border/50 hover:bg-surface-2/30 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-white">{formatShortDate(draw.month)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={draw.status === 'completed' ? 'success' : 'warning'}>
                        {draw.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1">
                        {nums?.map((n, i) => (
                          <div key={i} className="w-6 h-6 rounded-full bg-surface-2 border border-border flex items-center justify-center text-[10px] font-bold text-white">
                            {n}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-white">
                      {draw.draw_results?.[0]?.count || 0}
                    </td>
                    <td className="px-6 py-4 text-right text-xs text-muted">
                      System Auto
                    </td>
                  </tr>
                 );
              })}
              
              {!draws.length && (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-muted">
                    No historical draws found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
