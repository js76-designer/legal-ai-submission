import React from 'react';
import { ShieldCheck, Zap, Scale } from 'lucide-react';
import DocumentDropzone from '../components/DocumentDropZone';

export default function UploadDashboardPage({ onFileProcessed }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="text-center max-w-3xl mb-12">
        <div className="inline-flex items-center justify-center p-4 bg-blue-100 rounded-full mb-6">
          <Scale className="w-10 h-10 text-blue-700" />
        </div>
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Understand Any Contract in <span className="text-blue-600">Seconds</span>
        </h1>
        <p className="text-xl text-gray-500">
          Powered by Groq AI. Upload your legal documents to instantly extract liabilities, clarify complex jargon, and prepare for negotiations.
        </p>
      </div>

      <div className="w-full max-w-2xl bg-white p-2 rounded-3xl shadow-xl shadow-blue-900/5 border border-gray-100">
        <DocumentDropzone onUploadSuccess={onFileProcessed} isLoading={false} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mt-16 text-center">
        <div>
          <ShieldCheck className="w-8 h-8 mx-auto text-emerald-500 mb-3" />
          <h3 className="font-bold text-gray-900">Identify Risks</h3>
          <p className="text-sm text-gray-500 mt-2">Spot hidden liabilities before you sign.</p>
        </div>
        <div>
          <Zap className="w-8 h-8 mx-auto text-amber-500 mb-3" />
          <h3 className="font-bold text-gray-900">Instant Processing</h3>
          <p className="text-sm text-gray-500 mt-2">Powered by the lightning-fast Groq LPU.</p>
        </div>
        <div>
          <Scale className="w-8 h-8 mx-auto text-indigo-500 mb-3" />
          <h3 className="font-bold text-gray-900">Plain English</h3>
          <p className="text-sm text-gray-500 mt-2">Legalese translated into simple terms.</p>
        </div>
      </div>
    </div>
  );
}