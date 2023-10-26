import React from 'react';
import {
  render, screen,
} from '@testing-library/react';
import WebPage from '@/app/web/page';
import AuthProvider from "@/common/utils/authProvider";

describe.skip('WebPage', () => {
  it('should render header from redux store', () => {
    render(<AuthProvider><WebPage /></AuthProvider>);
    const headerElement = screen.getByText('FnL Platform Template');
    expect(headerElement).toBeInTheDocument();
  });
});
