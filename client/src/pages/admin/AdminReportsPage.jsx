import { ReportCharts } from '../../components/admin/ReportCharts';
import { Button } from '../../components/ui/Button';
import { Download, FileText, PieChart } from 'lucide-react';
import { Card } from '../../components/ui/Card';

export function AdminReportsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-extrabold text-white mb-2">
            Reports & Analytics
          </h1>
          <p className="text-muted">Financial transparency, platform metrics, and immutable audit logs.</p>
        </div>
        <Button variant="primary" leftIcon={<Download size={18} />}>
          Generate Audit Report
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="flex flex-col items-center text-center p-8 hover:border-accent/50 transition-colors cursor-pointer">
          <div className="w-16 h-16 rounded-full bg-danger/10 text-danger flex items-center justify-center mb-4">
            <FileText size={32} />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Charity Distribution Logs</h3>
          <p className="text-sm text-muted">Download compliant records of all charity routing transactions.</p>
        </Card>
        
        <Card className="flex flex-col items-center text-center p-8 hover:border-accent/50 transition-colors cursor-pointer">
          <div className="w-16 h-16 rounded-full bg-accent-3/10 text-accent-3 flex items-center justify-center mb-4">
            <PieChart size={32} />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Financial Breakdown</h3>
          <p className="text-sm text-muted">Revenue vs exact allocations to prize pools, admin fees, and charity portions.</p>
        </Card>

        <Card className="flex flex-col items-center text-center p-8 hover:border-accent/50 transition-colors cursor-pointer">
          <div className="w-16 h-16 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-4">
            <Download size={32} />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Draw Verifiability Seeds</h3>
          <p className="text-sm text-muted">Export cryptographic seeds and nonces used in historical draws for public audit.</p>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-heading font-bold text-white mb-2 mt-12">Visual Trends</h2>
        <ReportCharts />
      </div>
    </div>
  );
}
