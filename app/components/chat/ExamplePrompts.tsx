import React from 'react';

const EXAMPLE_PROMPTS = [
  { text: 'Create a mobile app about bolt.diy' },
  { text: 'Build a todo app in React using Tailwind' },
  { text: 'Build a simple blog using Astro' },
  { text: 'Create a cookie consent form using Material UI' },
  { text: 'Make a space invaders game' },
  { text: 'Make a Tic Tac Toe game in html, css and js only' },
];

import { Button } from '~/components/ui/Button'; // Import Button component

export function ExamplePrompts(sendMessage?: { (event: React.UIEvent, messageInput?: string): void | undefined }) {
  return (
    <div id="examples" className="relative flex flex-col gap-9 w-full max-w-3xl mx-auto flex justify-center mt-6">
      <div
        className="flex flex-wrap justify-center gap-2"
        style={{
          animation: '.25s ease-out 0s 1 _fade-and-move-in_g2ptj_1 forwards', // Animation style can remain
        }}
      >
        {EXAMPLE_PROMPTS.map((examplePrompt, index: number) => {
          return (
            <Button
              key={index}
              variant="outline" // Use outline variant
              size="sm" // Use small size
              onClick={(event) => {
                sendMessage?.(event, examplePrompt.text);
              }}
              // Adjust padding and text size if default Button sm size is not suitable
              // className="px-3 py-1 text-xs rounded-full" // Example of overriding, if needed. Default sm is: h-8 rounded-lg px-3 text-xs
              // For rounded-full specifically, might need to add it if not default for outline/sm
              className="rounded-full !px-3 !py-1 !text-xs" // Force specific padding, text size and full rounding
            >
              {examplePrompt.text}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
