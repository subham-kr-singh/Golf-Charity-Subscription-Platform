import { useAuth } from '../../hooks/useAuth';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';
import { User, Mail } from 'lucide-react';

export function ProfilePage() {
  const { user, logout } = useAuth();

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-heading font-extrabold text-white mb-2">
          Account Settings
        </h1>
        <p className="text-muted">Manage your profile information and preferences.</p>
      </div>

      <Card>
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border/50">
          <Avatar name={user?.full_name || 'User'} size="lg" />
          <div>
            <h2 className="text-xl font-heading font-bold text-white">{user?.full_name}</h2>
            <p className="text-muted flex items-center gap-2 mt-1">
              <Mail size={14} /> {user?.email}
            </p>
          </div>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid sm:grid-cols-2 gap-6">
            <Input 
              label="Full Name"
              defaultValue={user?.full_name}
              leftIcon={<User size={18} />}
              disabled
            />
            <Input 
              label="Email Address"
              defaultValue={user?.email}
              leftIcon={<Mail size={18} />}
              disabled
            />
          </div>
          
          <div className="pt-4 flex justify-between items-center">
            <Button variant="ghost" className="text-danger hover:text-danger hover:bg-danger/10" onClick={() => logout()}>
              Log Out
            </Button>
            <Button variant="primary" disabled>
              Update Profile
            </Button>
          </div>
        </form>
      </Card>
      
      <p className="text-xs text-muted text-center max-w-md mx-auto">
        Contact support if you need to change your email address or permanently delete your account.
      </p>
    </div>
  );
}
