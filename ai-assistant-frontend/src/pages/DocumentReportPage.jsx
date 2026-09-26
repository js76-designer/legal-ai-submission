import React, { useState, useRef, useEffect } from 'react';
import DocumentDropzone from '../components/DocumentDropZone';
import SummaryView from '../components/SummaryView';
import { analyzeDocument, askQuestion } from '../api/groqClient';
import { Send, MessageSquare, AlertCircle, Scale } from 'lucide-react';

export default function DocumentReportPage() {
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Chat State
  const [chatHistory, setChatHistory] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isAsking]);

  const handleFileUpload = async (file) => {
    setIsLoading(true);
    setError('');
    
    try {
      const data = await analyzeDocument(file);
      
      // If the backend returns empty text, trigger an error
      if (!data || data.trim() === '') {
        throw new Error("The backend returned an empty response. Check IntelliJ to see if the PDF parser failed.");
      }
      
      setAnalysis(data);
      setChatHistory([{ role: 'assistant', text: 'Document analyzed successfully. What specific clauses or risks would you like me to clarify?' }]);
      
    } catch (err) {
      alert("UPLOAD ERROR: " + err.message);
      setError('Failed to analyze document: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAskQuestion = async (e) => {
    e.preventDefault();
    if (!currentQuestion.trim() || !analysis) return;

    const userQuestion = currentQuestion.trim();
    setCurrentQuestion('');
    setChatHistory(prev => [...prev, { role: 'user', text: userQuestion }]);
    setIsAsking(true);

    try {
      const answer = await askQuestion(analysis, userQuestion);
      setChatHistory(prev => [...prev, { role: 'assistant', text: answer }]);
    } catch (err) {
      setChatHistory(prev => [...prev, { role: 'assistant', text: 'Sorry, I encountered an error retrieving the answer.' }]);
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Sleek App Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-gray-200">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
              <Scale className="w-8 h-8 text-blue-600" />
              Legal AI Assistant
            </h1>
            <p className="text-sm text-gray-500 mt-2 font-medium">
              Enterprise Risk Extraction & Contextual Q&A
            </p>
          </div>
          {analysis && (
            <div className="mt-4 md:mt-0">
              <button 
                onClick={() => window.location.reload()} 
                className="text-sm bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors shadow-sm"
              >
                Upload New Document
              </button>
            </div>
          )}
        </header>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Upload State */}
        {!analysis && (
          <div className="max-w-3xl mx-auto mt-12">
            <DocumentDropzone onUploadSuccess={handleFileUpload} isLoading={isLoading} />
          </div>
        )}

        {/* Results State (Two Column Layout) */}
        {analysis && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[75vh]">
            
            {/* Left Column: Summary */}
            <div className="h-full overflow-hidden">
              <SummaryView summary={analysis} />
            </div>

            {/* Right Column: Q&A Chat */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50 flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-gray-800">Ask the AI</h3>
              </div>

              {/* Chat History */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
                {chatHistory.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl px-5 py-3 text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-br-none' 
                        : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isAsking && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 text-gray-500 rounded-2xl rounded-bl-none px-5 py-3 shadow-sm flex gap-1">
                      <span className="animate-bounce text-lg leading-none">.</span>
                      <span className="animate-bounce delay-100 text-lg leading-none">.</span>
                      <span className="animate-bounce delay-200 text-lg leading-none">.</span>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input */}
              <div className="p-4 bg-white border-t border-gray-100">
                <form onSubmit={handleAskQuestion} className="flex gap-2">
                  <input
                    type="text"
                    value={currentQuestion}
                    onChange={(e) => setCurrentQuestion(e.target.value)}
                    placeholder="e.g., Are there any hidden fees?"
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={isAsking || !currentQuestion.trim()}
                    className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}