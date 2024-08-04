import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider } from '../src/components/ThemeProvider';
import ToggleButton from '../src/components/ToggleButton';

describe('ThemeProvider', () => {
    test('default theme mode', () => {
        render(
            <ThemeProvider>
                <ToggleButton />
            </ThemeProvider>
        );
        // Verify default theme mode is "light"
        expect(screen.getByText(/light mode/i)).toBeInTheDocument();
    });

    test('toggle theme mode', () => {
        render(
            <ThemeProvider>
                <ToggleButton />
            </ThemeProvider>
        );
        const toggleButton = screen.getByRole('button');
        // Click toggle button to switch to dark mode
        fireEvent.click(toggleButton);
        // Verify theme mode is "dark"
        expect(screen.getByText(/dark mode/i)).toBeInTheDocument();
    });

    test('custom colors in light mode', () => {
        render(
          <ThemeProvider>
            <ToggleButton />
          </ThemeProvider>
        );
        // Ensure the default mode is 'light'
        const toggleButton = screen.getByRole('button');
        
        // Get computed styles
        const buttonStyle = window.getComputedStyle(toggleButton);
        
        // Verify custom colors in light mode
        expect(buttonStyle.backgroundColor).toBe('rgba(0, 0, 0, 0.04)'); // #388E3C
        expect(buttonStyle.color).toBe('ButtonText'); // #D32F2F
      });
      

      test('custom colors in dark mode', () => {
        render(
          <ThemeProvider>
            <ToggleButton />
          </ThemeProvider>
        );
        const toggleButton = screen.getByRole('button');
        
        // Click toggle button to switch to dark mode
        fireEvent.click(toggleButton);
        
        // Get computed styles
        const buttonStyle = window.getComputedStyle(toggleButton);
        
        // Verify custom colors in dark mode
        expect(buttonStyle.backgroundColor).toBe('rgba(255, 255, 255, 0.08)'); // #4CAF50
        expect(buttonStyle.color).toBe('ButtonText'); // #FF4C4C
      });
      
});