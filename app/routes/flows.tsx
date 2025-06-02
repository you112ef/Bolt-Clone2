import type { MetaFunction } from '@remix-run/cloudflare';
import { Card } from '~/components/ui/Card';
import { Button } from '~/components/ui/Button';
import { Input } from '~/components/ui/Input';
import { Label } from '~/components/ui/Label';
import { Switch } from '~/components/ui/Switch'; // Assuming Switch component exists and is styled
// import { Textarea } from '~/components/ui/Textarea'; // Textarea component does not exist, removing import
import { classNames } from '~/utils/classNames'; // For conditional styling
import { useState } from 'react'; // Moved import to top

export const meta: MetaFunction = () => {
  return [{ title: 'Flows | Bolt' }, { name: 'description', content: 'Create and manage your automation flows.' }];
};

// Placeholder data for node types
const nodeTypes = [
  { id: 'trigger', name: 'Trigger', icon: 'i-ph:play-circle-duotone', description: 'Starts the flow (e.g., Form Submitted, Tag Added).' },
  { id: 'action', name: 'Action', icon: 'i-ph:lightning-duotone', description: 'Performs a task (e.g., Send Email, Update CRM).' },
  { id: 'condition', name: 'Condition', icon: 'i-ph:git-fork-duotone', description: 'Splits the path (e.g., If/Else, Wait Until).' },
  { id: 'ai_prompt', name: 'AI Prompt', icon: 'i-ph:robot-duotone', description: 'Uses AI to generate content or make decisions.' },
];

// Placeholder for selected node configuration
// In a real app, this would come from the selected node on the canvas
const selectedNodeConfig = {
  type: 'action', // 'trigger', 'condition', 'ai_prompt'
  name: 'Send Welcome Email',
  settings: [
    { id: 'email_subject', label: 'Email Subject', type: 'text', value: 'Welcome to Our Platform!' },
    { id: 'send_delay', label: 'Send Delay (minutes)', type: 'number', value: '0' },
    { id: 'template_id', label: 'Email Template ID', type: 'text', value: 'tpl_123xyz' },
    { id: 'track_opens', label: 'Track Opens', type: 'switch', checked: true },
  ],
};

// Simple SVG line for placeholder connections - more complex routing needed in a real app
const ConnectionLine = ({ fromPos, toPos }: { fromPos: { x: number; y: number }; toPos: { x: number; y: number } }) => (
  <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
    <line x1={fromPos.x} y1={fromPos.y} x2={toPos.x} y2={toPos.y} className="stroke-border stroke-2" />
    {/* Could add arrowheads or labels here */}
  </svg>
);


export default function FlowsPage() {
  // Basic state for showing/hiding panels on mobile, and selected node for config panel
  // In a real app, this would be much more complex (e.g., using Zustand, Jotai, or Remix loaders/actions)
  const [isNodesPaletteOpen, setIsNodesPaletteOpen] = useState(false);
  const [isConfigPanelOpen, setIsConfigPanelOpen] = useState(true); // Default open on desktop, could be false on mobile
  const [currentSelectedNode, setCurrentSelectedNode] = useState<any>(selectedNodeConfig); // Simulate selecting the sample node

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {/* Top Bar for Flow specific actions - e.g., Save, Run, Flow Name */}
      <header className="flex items-center justify-between p-3 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div>
          <Input defaultValue="My New Automation Flow" className="text-lg font-semibold w-auto max-w-xs" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <span className="i-ph:floppy-disk-duotone mr-2" /> Save
          </Button>
          <Button variant="default" size="sm">
            <span className="i-ph:play-duotone mr-2" /> Run Flow
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* 1. Draggable Nodes Palette (Left Sidebar) */}
        {/* On mobile, this could be toggled by a button */}
        <aside
          className={classNames(
            "absolute md:static z-20 h-full w-64 bg-background border-r border-border p-4 space-y-3 overflow-y-auto transition-transform transform duration-300 ease-in-out", // Added duration-300 and ease-in-out
            isNodesPaletteOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          )}
        >
          <h2 className="text-lg font-semibold text-text mb-3">Nodes</h2>
          {nodeTypes.map((node) => (
            // To add a dragging effect, one might add a class like:
            // isDraggingNode(node.id) ? 'ring-2 ring-primary opacity-75 scale-105 shadow-xl' : ''
            <Card key={node.id} className="p-3 cursor-grab hover:shadow-md transition-shadow bg-background-hover">
              <div className="flex items-center">
                <span className={classNames(node.icon, 'h-6 w-6 text-primary mr-3')} />
                <span className="text-sm font-medium text-text">{node.name}</span>
              </div>
              <p className="text-xs text-text/75 mt-1">{node.description}</p>
            </Card>
          ))}
        </aside>

        {/* Mobile Toggles for Panels */}
        <div className="md:hidden fixed bottom-20 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsNodesPaletteOpen(!isNodesPaletteOpen)}>
                <span className="i-ph:list-bullets-duotone mr-1" /> Nodes
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsConfigPanelOpen(!isConfigPanelOpen)}>
                <span className="i-ph:gear-six-duotone mr-1" /> Config
            </Button>
        </div>


        {/* 2. Canvas Area (Center) */}
        <main className="flex-1 bg-background/50 relative overflow-auto"> {/* Changed to bg-background/50 for slight contrast */}
          {/* Placeholder Zoom/Pan Controls */}
          <div className="absolute top-2 right-2 z-10 flex gap-1 p-1 bg-background border border-border rounded-md shadow">
            <Button variant="ghost" size="icon" className="h-7 w-7"><span className="i-ph:plus-duotone text-lg" /></Button>
            <Button variant="ghost" size="icon" className="h-7 w-7"><span className="i-ph:minus-duotone text-lg" /></Button>
            <Button variant="ghost" size="icon" className="h-7 w-7"><span className="i-ph:corners-out-duotone text-lg" /></Button>
          </div>

          {/* Placeholder Flow Content */}
          <div className="p-8 relative" style={{ minHeight: '1000px', minWidth: '1000px' }}> {/* Ensure canvas is scrollable */}
            {/* Example Node 1 (Trigger) */}
            <Card className="absolute top-20 left-20 w-52 p-3 shadow-lg z-10" onClick={() => { setCurrentSelectedNode(selectedNodeConfig); setIsConfigPanelOpen(true); }}>
              <div className="flex items-center">
                <span className="i-ph:play-circle-duotone h-5 w-5 text-green-500 mr-2" />
                <h3 className="text-sm font-medium text-text">Form Submitted</h3>
              </div>
              <p className="text-xs text-text/75 mt-1">When "Contact Us" form is filled.</p>
            </Card>

            {/* Example Node 2 (Action) - this is the one whose config is shown */}
            <Card className="absolute top-20 left-96 w-52 p-3 shadow-lg z-10 border-2 border-primary" onClick={() => { setCurrentSelectedNode(selectedNodeConfig); setIsConfigPanelOpen(true); }}>
              <div className="flex items-center">
                <span className="i-ph:lightning-duotone h-5 w-5 text-blue-500 mr-2" />
                <h3 className="text-sm font-medium text-text">{selectedNodeConfig.name}</h3>
              </div>
              <p className="text-xs text-text/75 mt-1">Action to send an email.</p>
            </Card>
            
            {/* Example Node 3 (Condition) */}
            <Card className="absolute top-60 left-96 w-52 p-3 shadow-lg z-10" onClick={() => { setCurrentSelectedNode({ type: 'condition', name: 'Check Email Open', settings: [{id: 'wait_duration', label: 'Wait (days)', type: 'number', value: '3'}] }); setIsConfigPanelOpen(true); }}>
              <div className="flex items-center">
                <span className="i-ph:git-fork-duotone h-5 w-5 text-orange-500 mr-2" />
                <h3 className="text-sm font-medium text-text">Check Email Open?</h3>
              </div>
            </Card>

            {/* Placeholder Connection Lines */}
            <ConnectionLine fromPos={{ x: 20*4 + 52*4, y: 20*4 + 20 }} toPos={{ x: 96*4 - 10, y: 20*4 + 20 }} /> {/* Approx: (left-20 + w-52)/2 , (top-20 + h-card)/2 */}
            <ConnectionLine fromPos={{ x: 96*4 + 26*4, y: 20*4 + 12*4 + 10 }} toPos={{ x: 96*4 + 26*4, y: 60*4 - 10 }} />

          </div>
        </main>

        {/* 3. Node Configuration Panel (Right Sidebar) */}
        <aside
          className={classNames(
            "absolute md:static right-0 z-20 h-full w-80 bg-background border-l border-border p-4 space-y-4 overflow-y-auto transition-transform transform duration-300 ease-in-out", // Added duration-300 and ease-in-out
            isConfigPanelOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
          )}
        >
          {currentSelectedNode ? (
            <>
              <h2 className="text-lg font-semibold text-text">Configure: {currentSelectedNode.name}</h2>
              <p className="text-sm text-text/75 capitalize border-b border-border pb-2 mb-3">Type: {currentSelectedNode.type.replace('_', ' ')}</p>
              <form className="space-y-4">
                {currentSelectedNode.settings.map((setting: any) => (
                  <div key={setting.id}>
                    <Label htmlFor={setting.id} className="text-sm font-medium text-text/90">{setting.label}</Label>
                    {setting.type === 'text' && (
                      <Input id={setting.id} type="text" defaultValue={setting.value} className="mt-1" />
                    )}
                    {setting.type === 'number' && (
                      <Input id={setting.id} type="number" defaultValue={setting.value} className="mt-1" />
                    )}
                    {setting.type === 'switch' && (
                      <div className="flex items-center mt-1 space-x-2">
                        <Switch id={setting.id} defaultChecked={setting.checked} />
                        <Label htmlFor={setting.id} className="text-xs text-text/75">Toggle {setting.label.toLowerCase()}</Label>
                      </div>
                    )}
                    {/* Add more types like select, textarea etc. as needed */}
                    {/* Removed Textarea rendering as component doesn't exist
                    {setting.type === 'textarea' && (
                        <Textarea id={setting.id} defaultValue={setting.value} className="mt-1" />
                    )}
                    */}
                  </div>
                ))}
                <Button type="submit" variant="default" className="w-full mt-6" onClick={(e) => e.preventDefault()}>Apply Changes</Button>
              </form>
            </>
          ) : (
            <div className="text-center py-10">
              <span className="i-ph:cursor-text-duotone text-4xl text-text/30 mb-3 block mx-auto" />
              <p className="text-sm text-text/60">Select a node on the canvas to configure its settings.</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
