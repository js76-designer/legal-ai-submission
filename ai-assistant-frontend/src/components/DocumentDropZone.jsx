import React from 'react';

export default function DocumentDropzone({ onUploadSuccess, isLoading }) {
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onUploadSuccess(e.target.files[0]);
    }
  };

  return (
    <div 
      role="button"
      tabIndex={0}
      aria-label="Upload a legal PDF document for AI analysis"
      onKeyDown={(e) => e.key === 'Enter' && document.getElementById('file-upload').click()}
      onClick={() => document.getElementById('file-upload').click()}
      className="border-2 border-dashed border-slate-400 p-12 text-center rounded-xl cursor-pointer hover:bg-slate-50 focus:ring-4 focus:ring-blue-500 outline-none transition-all"
    >
      <input 
        id="file-upload"
        type="file" 
        accept="application/pdf"
        className="hidden"
        aria-hidden="true" 
        onChange={handleFileChange}
        disabled={isLoading}
      />
      <div aria-live="polite" className="flex flex-col items-center gap-3">
        {isLoading ? (
          <>
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-600 font-medium">Analyzing Document via Groq AI... Processing...</p>
          </>
        ) : (
          <>
            <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-slate-600 font-medium">Drag & drop your legal PDF</p>
            <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">
              Browse Files
            </button>
          </>
        )}
      </div>
    </div>
  );
}