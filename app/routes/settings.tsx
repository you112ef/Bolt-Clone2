import type { MetaFunction } from '@remix-run/cloudflare';
import { Card, CardHeader, CardTitle, CardContent } from '~/components/ui/Card';
import { Button } from '~/components/ui/Button';
import { Input } from '~/components/ui/Input';
import { Label } from '~/components/ui/Label';
import { SearchInput } from '~/components/ui/SearchInput';
import { Switch } from '~/components/ui/Switch';
import WithTooltip from '~/components/ui/Tooltip'; // Corrected: WithTooltip is default export
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '~/components/ui/Collapsible'; // Assuming Collapsible components
import { classNames } from '~/utils/classNames';
import { useState } from 'react';

export const meta: MetaFunction = () => {
  return [{ title: 'Settings | Bolt' }, { name: 'description', content: 'Manage your application settings.' }];
};

// Placeholder Settings Data Structure
const settingsCategories = [
  {
    id: 'account',
    title: 'Account',
    icon: 'i-ph:user-circle-duotone',
    settings: [
      { id: 'username', label: 'Username', type: 'text', value: 'boltdiy', description: 'Your public display name.' },
      { id: 'email', label: 'Email Address', type: 'email', value: 'user@example.com', description: 'Your primary email for notifications and login.' },
      { id: 'change_password', label: 'Change Password', type: 'button', buttonLabel: 'Set New Password', description: 'Update your account password.' },
    ],
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: 'i-ph:bell-duotone',
    settings: [
      { id: 'email_updates', label: 'Email Notifications for Updates', type: 'switch', checked: true, description: 'Receive emails about new features and product updates.' },
      { id: 'activity_alerts', label: 'Activity Alerts', type: 'switch', checked: false, description: 'Get notified about important activities in your account.' },
      { id: 'notification_frequency', label: 'Notification Frequency', type: 'select', options: ['Instant', 'Daily Digest', 'Weekly Digest'], value: 'Instant', description: 'How often you want to receive general notifications.' },
    ],
  },
  {
    id: 'appearance',
    title: 'Appearance',
    icon: 'i-ph:paint-brush-duotone',
    settings: [
      { id: 'theme', label: 'Theme', type: 'select', options: ['Light', 'Dark', 'System'], value: 'System', description: 'Choose your preferred interface theme.' },
      // ThemeSwitch component could be used here directly if preferred
      { id: 'font_size', label: 'Font Size', type: 'select', options: ['Small', 'Medium', 'Large'], value: 'Medium', description: 'Adjust the text size across the application.' },
    ],
  },
  {
    id: 'integrations',
    title: 'Integrations',
    icon: 'i-ph:plugs-connected-duotone',
    settings: [
      { id: 'slack_connect', label: 'Slack', type: 'button', buttonLabel: 'Connect Slack', description: 'Connect your Slack workspace for notifications.' },
      { id: 'github_connect', label: 'GitHub', type: 'button', buttonLabel: 'Connect GitHub', description: 'Connect your GitHub account to link repositories.' },
    ],
  },
];

const SettingRow = ({ setting }: { setting: any }) => (
  <div className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
    <div>
      <Label htmlFor={setting.id} className="text-sm font-medium text-text">
        {setting.label}
      </Label>
      <p className="text-xs text-text/60">{setting.description}</p>
    </div>
    <WithTooltip tooltip={setting.description} side="left" delay={300}>
      <div className="shrink-0 ml-4"> {/* Added margin for spacing */}
        {setting.type === 'text' && <Input id={setting.id} defaultValue={setting.value} className="w-auto min-w-[200px]" />}
        {setting.type === 'email' && <Input id={setting.id} type="email" defaultValue={setting.value} className="w-auto min-w-[200px]" />}
        {setting.type === 'switch' && <Switch id={setting.id} defaultChecked={setting.checked} />}
        {setting.type === 'button' && <Button variant="outline" size="sm">{setting.buttonLabel}</Button>}
        {setting.type === 'select' && (
          <select
            id={setting.id}
            defaultValue={setting.value}
            className="w-auto min-w-[200px] h-10 rounded-lg border border-border bg-background px-3 py-2 text-sm text-text ring-offset-background focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            {setting.options?.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        )}
      </div>
    </WithTooltip>
  </div>
);


export default function SettingsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  // For Collapsible: manage open state for each category, default all to open
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(
    settingsCategories.reduce((acc, cat) => ({ ...acc, [cat.id]: true }), {})
  );

  const toggleCategory = (id: string) => {
    setOpenCategories(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Basic search filter (can be made more sophisticated)
  const filteredCategories = settingsCategories.map(category => ({
    ...category,
    settings: category.settings.filter(setting =>
      setting.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      setting.description.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter(category => category.settings.length > 0 || category.title.toLowerCase().includes(searchTerm.toLowerCase()));


  return (
    <div className="space-y-8 p-4 md:p-6 max-w-4xl mx-auto">
      {/* Page Header */}
      <header className="py-4">
        <h1 className="text-3xl font-semibold text-text">Settings</h1>
        <p className="text-lg text-text/75">Manage your account and application preferences.</p>
      </header>

      {/* Search Settings Bar */}
      <div className="mb-6">
        <SearchInput
          placeholder="Search settings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search settings" // Added aria-label
        />
      </div>

      {/* Settings Categories */}
      {filteredCategories.length > 0 ? (
        filteredCategories.map((category) => (
          <Collapsible key={category.id} open={openCategories[category.id]} onOpenChange={() => toggleCategory(category.id)} asChild>
            <Card>
              <CollapsibleTrigger asChild>
                <CardHeader className="flex flex-row items-center justify-between cursor-pointer hover:bg-background/50">
                  <div className="flex items-center">
                    {category.icon && <span className={classNames(category.icon, "h-6 w-6 text-primary mr-3")} />}
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                  </div>
                  <Button variant="ghost" size="icon">
                    <span className={classNames("i-ph:caret-down-duotone transition-transform duration-200", openCategories[category.id] ? "rotate-180" : "")} />
                  </Button>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent asChild>
                <CardContent className="pt-0"> {/* Remove CardContent default pt if CardHeader has pb */}
                  {category.settings.map((setting) => (
                    <SettingRow key={setting.id} setting={setting} />
                  ))}
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        ))
      ) : (
        <p className="text-text/75 text-center py-8">No settings found matching your search.</p>
      )}
    </div>
  );
}
