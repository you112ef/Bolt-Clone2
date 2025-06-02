import type { MetaFunction } from '@remix-run/cloudflare';
import { Link } from '@remix-run/react'; // For navigation if needed for edit/view stats
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '~/components/ui/Card';
import { Button } from '~/components/ui/Button';
import { Badge } from '~/components/ui/Badge';
import { Input } from '~/components/ui/Input';
import { Label } from '~/components/ui/Label';
import { SearchInput } from '~/components/ui/SearchInput';
// Simplified Dialog imports based on known exports from previous Dialog refactor
import { Dialog, DialogRoot, DialogClose, DialogTitle, DialogDescription } from '~/components/ui/Dialog';
import { classNames } from '~/utils/classNames';
import { useState } from 'react';

export const meta: MetaFunction = () => {
  return [{ title: 'Campaigns | Bolt' }, { name: 'description', content: 'Manage your marketing campaigns.' }];
};

// Placeholder Campaign Data
const campaignsData = [
  { id: 'cam1', name: 'Summer Sale 2024', status: 'Active', startDate: '2024-06-01', endDate: '2024-08-31', flowId: 'flow_summer', description: 'Annual summer blowout sale event.' },
  { id: 'cam2', name: 'New User Welcome Series', status: 'Paused', startDate: '2024-01-01', endDate: null, flowId: 'flow_welcome', description: 'Automated welcome emails for new sign-ups.' },
  { id: 'cam3', name: 'Holiday Special Q4', status: 'Draft', startDate: '2024-11-01', endDate: '2024-12-25', flowId: null, description: 'Q4 holiday promotional campaign.' },
  { id: 'cam4', name: 'Abandoned Cart Recovery', status: 'Active', startDate: '2023-09-15', endDate: null, flowId: 'flow_cart_recovery', description: 'Recovers abandoned shopping carts.' },
  { id: 'cam5', name: 'Product Launch X', status: 'Finished', startDate: '2023-05-01', endDate: '2023-05-31', flowId: 'flow_product_x', description: 'Launch campaign for new Product X.' },
];

// Type for campaign status for badge styling
type CampaignStatus = 'Active' | 'Paused' | 'Draft' | 'Finished';
const statusColors: Record<CampaignStatus, 'success' | 'warning' | 'subtle' | 'default'> = {
  Active: 'success',
  Paused: 'warning',
  Draft: 'subtle',
  Finished: 'default',
};


export default function CampaignsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<typeof campaignsData[0] | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCampaigns = campaignsData.filter(campaign => 
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenForm = (campaign?: typeof campaignsData[0]) => {
    setEditingCampaign(campaign || null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingCampaign(null);
  };
  
  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Logic to save campaign data would go here
    console.log("Form submitted with data:", new FormData(event.currentTarget));
    handleCloseForm();
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header Section */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-text">Campaigns</h1>
          <p className="text-lg text-text/75">Manage and create your marketing campaigns.</p>
        </div>
        <Button variant="default" size="default" onClick={() => handleOpenForm()}>
          <span className="i-ph:plus-circle-duotone mr-2 h-5 w-5" />
          Create New Campaign
        </Button>
      </header>

      {/* Filter and Search Section */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="w-full sm:w-auto flex-grow sm:max-w-xs">
          <SearchInput 
            placeholder="Search campaigns..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
        {/* Placeholder for more filters e.g., Dropdown for status */}
        {/* <Button variant="outline" size="sm"><span className="i-ph:funnel-duotone mr-2" /> Filters</Button> */}
      </div>

      {/* Campaign List */}
      <section className="grid gap-4 md:gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredCampaigns.map((campaign) => (
          <Card key={campaign.id} className="flex flex-col justify-between">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg mb-1">{campaign.name}</CardTitle>
                <Badge variant={statusColors[campaign.status as CampaignStatus]} size="sm">{campaign.status}</Badge>
              </div>
              <p className="text-xs text-text/60">
                {campaign.startDate} - {campaign.endDate || 'Ongoing'}
              </p>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-text/80 line-clamp-3">{campaign.description}</p>
            </CardContent>
            <CardFooter className="flex gap-2 pt-4">
              <Button variant="outline" size="sm" onClick={() => handleOpenForm(campaign)}>
                <span className="i-ph:pencil-simple-duotone mr-1.5" /> Edit
              </Button>
              <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-500/10 hover:text-red-600">
                <span className="i-ph:trash-duotone mr-1.5" /> Delete
              </Button>
              {/* <Link to={`/campaigns/${campaign.id}/stats`}>
                <Button variant="ghost" size="sm"><span className="i-ph:chart-bar-duotone mr-1.5" /> Stats</Button>
              </Link> */}
            </CardFooter>
          </Card>
        ))}
        {filteredCampaigns.length === 0 && (
          <p className="text-text/75 col-span-full text-center py-8">No campaigns found matching your search.</p>
        )}
      </section>

      {/* Create/Edit Campaign Dialog (Modal) */}
      <DialogRoot open={isFormOpen} onOpenChange={setIsFormOpen}>
        {/* DialogContent is not a separate export, Dialog itself is the content area */}
        <Dialog className="sm:max-w-lg p-0"> {/* Added p-0 to remove default Dialog padding if form sections handle it */}
          <form onSubmit={handleSubmitForm}>
            {/* Manually creating header structure if DialogHeader is not exported */}
            <div className="p-6 border-b border-border">
              <DialogTitle>{editingCampaign ? 'Edit Campaign' : 'Create New Campaign'}</DialogTitle>
              <DialogDescription>
                {editingCampaign ? 'Update the details of your campaign.' : 'Fill in the details to start a new campaign.'}
              </DialogDescription>
            </div>
            
            <div className="space-y-4 p-6"> {/* Content padding */}
              <div>
                <Label htmlFor="campaignName">Campaign Name</Label>
                <Input id="campaignName" name="campaignName" defaultValue={editingCampaign?.name || ''} required className="mt-1" />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                {/* Using Input for description as Textarea might not exist */}
                <Input id="description" name="description" defaultValue={editingCampaign?.description || ''} className="mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" name="startDate" type="date" defaultValue={editingCampaign?.startDate || ''} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date (optional)</Label>
                  <Input id="endDate" name="endDate" type="date" defaultValue={editingCampaign?.endDate || ''} className="mt-1" />
                </div>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                {/* Basic select, could be replaced with custom Select component if available */}
                <select 
                  id="status" 
                  name="status"
                  defaultValue={editingCampaign?.status || 'Draft'} 
                  className="w-full mt-1 h-10 rounded-lg border border-border bg-background px-3 py-2 text-sm text-text ring-offset-background focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <option>Draft</option>
                  <option>Active</option>
                  <option>Paused</option>
                  <option>Finished</option>
                </select>
              </div>
              <div>
                <Button type="button" variant="outline" size="sm" className="w-full">
                  <span className="i-ph:link-simple-duotone mr-2" /> Link Flow (Coming Soon)
                </Button>
              </div>
            </div>

            {/* Manually creating footer structure if DialogFooter is not exported */}
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-border">
              <DialogClose asChild>
                <Button type="button" variant="ghost">Cancel</Button>
              </DialogClose>
              <Button type="submit" variant="default">
                {editingCampaign ? 'Save Changes' : 'Create Campaign'}
              </Button>
            </div>
          </form>
        </Dialog>
      </DialogRoot>
    </div>
  );
}
