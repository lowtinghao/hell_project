import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ToggleButton from '../src/components/ToggleButton';
import { ThemeProvider } from '../src/components/ThemeProvider';


describe('ToggleButton', () => {
    test('initial render', () => {
        render(
            <ThemeProvider>
                <ToggleButton />
            </ThemeProvider>
        );
        // Verify button displays current theme mode
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
        // Verify theme mode changes
        expect(screen.getByText(/dark mode/i)).toBeInTheDocument();
    });
});
