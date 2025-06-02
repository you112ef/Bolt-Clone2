import type { MetaFunction } from '@remix-run/cloudflare';
import { Link } from '@remix-run/react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '~/components/ui/Card'; // CardDescription not used, can remove
import { Button } from '~/components/ui/Button';
// import { Icon } from '~/components/ui/Icon'; // Assuming an Icon component might exist or be created
import { classNames } from '~/utils/classNames'; // Added for icon class handling

export const meta: MetaFunction = () => {
  return [{ title: 'Dashboard | Bolt' }, { name: 'description', content: 'Your main dashboard.' }];
};

// Placeholder data
const stats = [
  { id: 1, name: 'Active Campaigns', value: '12', icon: 'i-ph:megaphone-duotone' },
  { id: 2, name: 'Active Flows', value: '5', icon: 'i-ph:graph-duotone' },
  { id: 3, name: 'Recent Activity', value: '24', unit: 'hrs', icon: 'i-ph:activity-duotone' },
];

const recentActions = [
  { id: 1, text: 'Campaign "Summer Sale" was launched.', time: '2 hours ago', icon: 'i-ph:rocket-launch-duotone' },
  { id: 2, text: 'Flow "New User Onboarding" was updated.', time: '5 hours ago', icon: 'i-ph:pencil-line-duotone' },
  { id: 3, text: 'User "alex@example.com" completed Flow "Intro Survey".', time: '1 day ago', icon: 'i-ph:check-circle-duotone' },
  { id: 4, text: 'AI Assistant drafted 3 new email variations.', time: '2 days ago', icon: 'i-ph:robot-duotone' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <header className="py-4">
        <h1 className="text-3xl font-semibold text-text">Welcome Back!</h1>
        <p className="text-lg text-text/75">Here's what's happening with your projects today.</p>
      </header>

      {/* Quick Stats Cards */}
      <section>
        <h2 className="text-xl font-semibold text-text mb-4">Quick Stats</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-text/90">{stat.name}</CardTitle>
                {stat.icon && <span className={classNames(stat.icon, 'h-5 w-5 text-text/50')} />}
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-text">{stat.value}
                  {stat.unit && <span className="text-lg font-normal text-text/75 ml-1">{stat.unit}</span>}
                </div>
                {/* <p className="text-xs text-text/60">Optional: +20% from last month</p> */}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Actions List */}
        <section className="lg:col-span-2">
          <h2 className="text-xl font-semibold text-text mb-4">Recent Actions</h2>
          <div className="space-y-4">
            {recentActions.map((action) => (
              <div key={action.id} className="flex items-center p-3 bg-background/50 hover:bg-background/75 rounded-lg transition-colors">
                {action.icon && <span className={classNames(action.icon, 'h-6 w-6 text-primary mr-4')} />}
                <div className="flex-1">
                  <p className="text-sm font-medium text-text">{action.text}</p>
                  <p className="text-xs text-text/60">{action.time}</p>
                </div>
                {/* Optional: Action button like "View Details" */}
                {/* <Button variant="ghost" size="sm">View</Button> */}
              </div>
            ))}
             {recentActions.length === 0 && (
              <p className="text-sm text-text/75">No recent actions to display.</p>
            )}
          </div>
        </section>

        {/* Create New Section */}
        <section>
          <h2 className="text-xl font-semibold text-text mb-4">Get Started</h2>
          <div className="space-y-3">
            <Link to="/flows/new"> {/* Placeholder link */}
              <Button variant="default" size="lg" className="w-full">
                <span className="i-ph:plus-circle-duotone mr-2 h-5 w-5" />
                Create New Flow
              </Button>
            </Link>
            <Link to="/campaigns/new"> {/* Placeholder link */}
              <Button variant="secondary" size="lg" className="w-full">
                <span className="i-ph:megaphone-simple-duotone mr-2 h-5 w-5" />
                Create New Campaign
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
