import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import RiskAnalysisWidget from '../components/RiskAnalysisWidget';

describe('RiskAnalysisWidget Component', () => {
  it('returns null and does not render when the risks array is empty', () => {
    const { container } = render(<RiskAnalysisWidget risks={[]} />);
    
    // The component should render nothing if there are no risks
    expect(container.firstChild).toBeNull();
  });

  it('renders the risk clauses and explanations correctly', () => {
    const mockRisks = [
      { 
        clause: 'Auto-Renewal Clause', 
        explanation: 'Contract renews automatically for 1 year without notice.', 
        severity: 'HIGH' 
      }
    ];
    
    render(<RiskAnalysisWidget risks={mockRisks} />);
    
    expect(screen.getByText('Risk Assessment')).toBeDefined();
    expect(screen.getByText('Auto-Renewal Clause')).toBeDefined();
    expect(screen.getByText('Contract renews automatically for 1 year without notice.')).toBeDefined();
  });
});