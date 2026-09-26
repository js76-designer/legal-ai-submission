import React from 'react';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';

export default function RiskAnalysisWidget({ risks = [] }) {
  if (!risks.length) return null;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-3">
        <AlertTriangle className="w-6 h-6 text-amber-500" />
        <h3 className="text-xl font-bold text-gray-800">Risk Assessment</h3>
      </div>
      
      <div className="space-y-4">
        {risks.map((risk, index) => (
          <div key={index} className="flex gap-4 p-4 rounded-xl bg-gray-50 border border-gray-200">
            <div className="mt-1">
              {risk.severity === 'HIGH' ? <AlertCircle className="w-5 h-5 text-red-500" /> : 
               risk.severity === 'MEDIUM' ? <AlertTriangle className="w-5 h-5 text-amber-500" /> : 
               <Info className="w-5 h-5 text-blue-500" />}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">{risk.clause}</h4>
              <p className="text-sm text-gray-600 mt-1">{risk.explanation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}