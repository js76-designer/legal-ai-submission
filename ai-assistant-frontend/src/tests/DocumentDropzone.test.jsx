import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DocumentDropzone from '../components/DocumentDropzone';

describe('DocumentDropzone Component', () => {
  it('renders the default upload state correctly', () => {
    render(<DocumentDropzone onUploadSuccess={() => {}} isLoading={false} />);
    
    expect(screen.getByText(/Drag & drop your legal PDF/i)).toBeDefined();
    expect(screen.getByText(/Browse Files/i)).toBeDefined();
  });

  it('renders the loading state when isLoading is true', () => {
    render(<DocumentDropzone onUploadSuccess={() => {}} isLoading={true} />);
    
    expect(screen.getByText(/Analyzing Document via Groq AI.../i)).toBeDefined();
    expect(screen.getByText(/Processing.../i)).toBeDefined();
  });
});