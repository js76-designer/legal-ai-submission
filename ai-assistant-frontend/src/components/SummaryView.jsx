import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function SummaryView({ summary }) {
  if (!summary) return null;

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 mt-6 h-full flex flex-col">
      {/* Sleek Header Section */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6 shrink-0">
        <h2 className="text-xl font-extrabold text-slate-800 tracking-tight font-sans">
          Contract Analysis
        </h2>
        <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-blue-100">
          Confidential
        </span>
      </div>
      
      {/* Document Reading Area */}
      <div className="text-slate-800 space-y-4 overflow-y-auto flex-1 pr-4 font-serif text-[15px] leading-relaxed custom-scrollbar">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          components={{
            // Typography styling
            h1: ({node, ...props}) => <h1 className="text-2xl font-bold mt-8 mb-4 font-sans text-slate-900" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-lg font-bold mt-8 mb-3 font-sans text-blue-900 uppercase tracking-wide border-b pb-1" {...props} />,
            h3: ({node, ...props}) => <h3 className="text-md font-bold mt-6 mb-2 font-sans text-slate-800" {...props} />,
            p: ({node, ...props}) => <p className="mb-4 text-slate-700" {...props} />,
            strong: ({node, ...props}) => <strong className="font-semibold text-slate-900" {...props} />,
            ul: ({node, ...props}) => <ul className="list-disc pl-6 space-y-2 mb-4 text-slate-700" {...props} />,
            ol: ({node, ...props}) => <ol className="list-decimal pl-6 space-y-2 mb-4 text-slate-700" {...props} />,
            li: ({node, ...props}) => <li className="pl-2" {...props} />,
            
            // Professional Table Styling
            table: ({node, ...props}) => (
              <div className="overflow-x-auto mb-8 mt-4 rounded-lg border border-slate-200 shadow-sm">
                <table className="min-w-full text-left font-sans border-collapse bg-white" {...props} />
              </div>
            ),
            thead: ({node, ...props}) => <thead className="bg-slate-50 border-b border-slate-200" {...props} />,
            th: ({node, ...props}) => <th className="px-4 py-3 font-semibold text-slate-800 text-sm" {...props} />,
            td: ({node, ...props}) => <td className="px-4 py-4 border-b border-slate-100 text-sm text-slate-700 align-top" {...props} />,
          }}
        >
          {summary}
        </ReactMarkdown>
      </div>
    </div>
  );
}