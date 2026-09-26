import React from 'react';
import { HelpCircle, ChevronRight } from 'lucide-react';

export default function ConsultationQuestions({ questions = [] }) {
  if (!questions.length) return null;

  return (
    <div className="bg-linear-to-br from-slate-800 to-slate-900 p-6 rounded-2xl shadow-md text-white">
      <div className="flex items-center gap-3 mb-4 border-b border-slate-700 pb-3">
        <HelpCircle className="w-6 h-6 text-blue-400" />
        <h3 className="text-xl font-bold">Ask Your Lawyer</h3>
      </div>
      
      <p className="text-slate-300 text-sm mb-4">
        Bring these AI-generated questions to your legal consultation for clarity:
      </p>

      <ul className="space-y-3">
        {questions.map((q, index) => (
          <li key={index} className="flex items-start gap-2 bg-slate-800 p-3 rounded-lg border border-slate-700">
            <ChevronRight className="w-5 h-5 text-blue-400 shrink-0" />
            <span className="text-slate-200 text-sm">{q}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}