import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DocumentReportPage from './pages/DocumentReportPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DocumentReportPage />} />
      </Routes>
    </Router>
  );
}