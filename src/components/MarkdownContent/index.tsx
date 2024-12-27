import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { cn } from '@/utils/cn';

import 'tailwindcss/tailwind.css';

type MarkdownContentProps = {
  content: string;
  className?: string;
};

const MarkdownContent: React.FC<MarkdownContentProps> = ({ content, className }) => {
  const fixContent = content + '...';
  return (
    <div className={cn('prose prose-lg max-w-none', className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{fixContent}</ReactMarkdown>
    </div>
  );
};

export default MarkdownContent;
