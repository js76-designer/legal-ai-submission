import React from 'react';
import { CheckSquare } from 'lucide-react';

export default function NextStepsList({ steps = [] }) {
  if (!steps.length) return null;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-3">
        <CheckSquare className="w-6 h-6 text-emerald-600" />
        <h3 className="text-xl font-bold text-gray-800">Actionable Next Steps</h3>
      </div>
      
      <ul className="space-y-3">
        {steps.map((step, index) => (
          <li key={index} className="flex items-start gap-3">
            <input 
              type="checkbox" 
              className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
            />
            <span className="text-gray-700">{step}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}