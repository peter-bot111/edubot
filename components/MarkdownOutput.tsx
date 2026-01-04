import React from 'react';

interface MarkdownOutputProps {
  content: string;
}

// A simple formatter since we can't use extensive external markdown libraries
// This handles basic bolding, headers, and lists common in the prompt outputs
const MarkdownOutput: React.FC<MarkdownOutputProps> = ({ content }) => {
  const lines = content.split('\n');

  return (
    <div className="space-y-3 text-gray-800 leading-relaxed">
      {lines.map((line, index) => {
        // Headers
        if (line.startsWith('### ')) {
          return <h3 key={index} className="text-lg font-bold text-indigo-700 mt-4">{line.replace('### ', '')}</h3>;
        }
        if (line.startsWith('**') && line.endsWith('**')) {
           // Standalone bold line acting as a header
           return <h4 key={index} className="font-bold text-gray-900 mt-2">{line.replace(/\*\*/g, '')}</h4>;
        }
        if (line.startsWith('**') && !line.includes(':')) {
            // Likely a section title
             return <h4 key={index} className="font-bold text-indigo-900 mt-4 text-lg">{line.replace(/\*\*/g, '')}</h4>;
        }

        // List items
        if (line.trim().startsWith('- ')) {
          return (
            <div key={index} className="flex items-start ml-4">
              <span className="mr-2 text-indigo-500">•</span>
              <span>{formatInline(line.replace('- ', ''))}</span>
            </div>
          );
        }
         // List items with 1.
        if (/^\d+\./.test(line.trim())) {
             return (
            <div key={index} className="flex items-start ml-4">
              <span className="mr-2 text-indigo-500 font-bold">{line.split('.')[0]}.</span>
              <span>{formatInline(line.replace(/^\d+\.\s*/, ''))}</span>
            </div>
          );
        }

        // Empty lines
        if (!line.trim()) {
          return <div key={index} className="h-2"></div>;
        }

        // Standard text
        return <p key={index}>{formatInline(line)}</p>;
      })}
    </div>
  );
};

// Helper to handle inline bolding like **text**
const formatInline = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

export default MarkdownOutput;
