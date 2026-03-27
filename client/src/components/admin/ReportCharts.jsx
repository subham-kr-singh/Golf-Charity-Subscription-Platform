import { Card } from '../ui/Card';
import { BarChart3, LineChart } from 'lucide-react';

export function ReportCharts() {
  return (
    <div className="grid lg:grid-cols-2 gap-6 mt-8">
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-heading font-bold text-white">Subscription Growth</h3>
          <LineChart className="text-muted" size={20} />
        </div>
        <div className="h-64 flex items-end justify-between gap-2 border-b border-border pb-4">
          {[30, 45, 40, 60, 55, 75, 80].map((h, i) => (
             <div key={i} className="w-full bg-accent/20 rounded-t flex items-end overflow-hidden">
               <div 
                 className="w-full bg-accent transition-all hover:bg-accent-2" 
                 style={{ height: `${h}%` }}
               />
             </div>
          ))}
        </div>
        <div className="flex justify-between mt-4 text-xs text-muted font-bold">
          <span>Jan</span>
          <span>Feb</span>
          <span>Mar</span>
          <span>Apr</span>
          <span>May</span>
          <span>Jun</span>
          <span>Jul</span>
        </div>
      </Card>
      
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-heading font-bold text-white">Charity Distribution</h3>
          <BarChart3 className="text-muted" size={20} />
        </div>
        <div className="h-64 flex flex-col justify-center gap-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-white">St. Jude Children's Hospital</span>
              <span className="text-accent-3 font-bold">45%</span>
            </div>
            <div className="h-4 bg-surface-2 rounded-full overflow-hidden">
              <div className="h-full bg-accent-3 w-[45%]" />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-white">First Tee</span>
              <span className="text-accent w-[30%]">30%</span>
            </div>
            <div className="h-4 bg-surface-2 rounded-full overflow-hidden">
              <div className="h-full bg-accent w-[30%]" />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-white">Local Cancer Research</span>
              <span className="text-success font-bold">25%</span>
            </div>
            <div className="h-4 bg-surface-2 rounded-full overflow-hidden">
              <div className="h-full bg-success w-[25%]" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
