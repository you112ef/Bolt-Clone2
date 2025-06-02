import type { MetaFunction } from '@remix-run/cloudflare';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '~/components/ui/Card';
import { Button } from '~/components/ui/Button';
import { Badge } from '~/components/ui/Badge';
import { Input } from '~/components/ui/Input'; // For search, though SearchInput is better
import { SearchInput } from '~/components/ui/SearchInput';
import { FilterChip } from '~/components/ui/FilterChip'; // Assuming this exists from previous UI work or is a common component
import { classNames } from '~/utils/classNames';
import { useState } from 'react';

export const meta: MetaFunction = () => {
  return [{ title: 'Templates | Bolt' }, { name: 'description', content: 'Choose from a variety of templates to get started.' }];
};

// Placeholder Template Data
const allTemplates = [
  { 
    id: 'tpl1', 
    name: 'E-commerce Welcome Email Series', 
    description: 'A 3-email series to welcome new customers and guide them to their first purchase.', 
    category: 'Email Marketing', 
    tags: ['E-commerce', 'Welcome Series', 'Automation'], 
    icon: 'i-ph:shopping-cart-duotone', // Placeholder icon
    previewUrl: 'https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=Email+Series' 
  },
  { 
    id: 'tpl2', 
    name: 'SaaS User Onboarding Flow', 
    description: 'Guide new SaaS users through key activation steps with targeted messages and actions.', 
    category: 'SaaS', 
    tags: ['Onboarding', 'User Engagement', 'Automation'], 
    icon: 'i-ph:rocket-launch-duotone',
    previewUrl: 'https://via.placeholder.com/300x200/10B981/FFFFFF?text=SaaS+Onboarding'
  },
  { 
    id: 'tpl3', 
    name: 'Lead Nurturing Campaign', 
    description: 'Nurture leads from initial contact to sales-ready with a multi-touchpoint campaign.', 
    category: 'Lead Generation', 
    tags: ['Nurturing', 'CRM', 'Sales'], 
    icon: 'i-ph:users-three-duotone',
    previewUrl: 'https://via.placeholder.com/300x200/FACC15/111827?text=Lead+Nurturing'
  },
  { 
    id: 'tpl4', 
    name: 'Customer Feedback Survey Flow', 
    description: 'Automatically send feedback surveys after key interactions and analyze results.', 
    category: 'Customer Service', 
    tags: ['Surveys', 'Feedback', 'Automation'], 
    icon: 'i-ph:chat-circle-dots-duotone',
    previewUrl: 'https://via.placeholder.com/300x200/6D28D9/FFFFFF?text=Feedback+Survey'
  },
   { 
    id: 'tpl5', 
    name: 'Abandoned Cart Email for E-commerce', 
    description: 'Recover lost sales by sending timed reminders to customers who abandon their carts.', 
    category: 'Email Marketing', 
    tags: ['E-commerce', 'Cart Recovery', 'Automation'], 
    icon: 'i-ph:storefront-duotone',
    previewUrl: 'https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=Cart+Recovery' 
  },
  { 
    id: 'tpl6', 
    name: 'Feature Announcement Email', 
    description: 'Announce new product features to your user base effectively.', 
    category: 'Product', 
    tags: ['Announcement', 'Email Marketing'], 
    icon: 'i-ph:gift-duotone',
    previewUrl: 'https://via.placeholder.com/300x200/10B981/FFFFFF?text=Feature+Release'
  },
];

const allCategories = Array.from(new Set(allTemplates.map(t => t.category)));
const allTags = Array.from(new Set(allTemplates.flatMap(t => t.tags)));


export default function TemplatesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleFilter = (item: string, type: 'category' | 'tag') => {
    const currentFilters = type === 'category' ? selectedCategories : selectedTags;
    const setCurrentFilters = type === 'category' ? setSelectedCategories : setSelectedTags;
    if (currentFilters.includes(item)) {
      setCurrentFilters(currentFilters.filter(f => f !== item));
    } else {
      setCurrentFilters([...currentFilters, item]);
    }
  };
  
  const filteredTemplates = allTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(template.category);
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => template.tags.includes(tag));
    return matchesSearch && matchesCategory && matchesTags;
  });

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header Section */}
      <header className="py-4">
        <h1 className="text-3xl font-semibold text-text">Templates</h1>
        <p className="text-lg text-text/75">Choose a template to kickstart your project or get inspired.</p>
      </header>

      {/* Filter and Search Section */}
      <div className="space-y-4">
        <div>
          <SearchInput 
            placeholder="Search templates..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <h3 className="text-sm font-medium text-text/80 mb-2">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {allCategories.map(category => (
              <FilterChip 
                key={category} 
                label={category}
                isSelected={selectedCategories.includes(category)}
                onSelect={() => toggleFilter(category, 'category')}
              />
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-text/80 mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <FilterChip 
                key={tag} 
                label={tag}
                isSelected={selectedTags.includes(tag)}
                onSelect={() => toggleFilter(tag, 'tag')}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      {filteredTemplates.length > 0 ? (
        <section className="grid gap-4 md:gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="flex flex-col overflow-hidden group">
              {/* Placeholder for Image/Icon */}
              <div className="aspect-[3/2] bg-background-hover flex items-center justify-center overflow-hidden">
                {template.previewUrl ? (
                    <img src={template.previewUrl} alt={template.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                ) : (
                    <span className={classNames(template.icon || 'i-ph:layout-duotone', "text-5xl text-text/30")} />
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2">{template.name}</CardTitle>
                <div className="flex flex-wrap gap-1 mt-1">
                  <Badge variant="outline" size="sm">{template.category}</Badge>
                  {template.tags.slice(0, 2).map(tag => ( // Show max 2 tags initially
                    <Badge key={tag} variant="secondary" size="sm">{tag}</Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-text/80 line-clamp-3">{template.description}</p>
              </CardContent>
              <CardFooter className="pt-4">
                <Button variant="default" className="w-full">
                  <span className="i-ph:lightning-duotone mr-2" /> Use Template
                </Button>
              </CardFooter>
            </Card>
          ))}
        </section>
      ) : (
         <div className="text-center py-12">
            <span className="i-ph:magnifying-glass-duotone text-5xl text-text/30 mb-4 block mx-auto" />
            <p className="text-lg font-medium text-text">No templates found</p>
            <p className="text-sm text-text/75">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
