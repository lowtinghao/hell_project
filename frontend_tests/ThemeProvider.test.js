import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ThemeProvider } from '../components/ThemeProvider';
import ToggleButton from '../components/ToggleButton';

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
        const theme = screen.getByRole('button').theme;
        // Verify custom colors in light mode
        expect(theme.palette.custom.accept).toBe('#388E3C');
        expect(theme.palette.custom.reject).toBe('#D32F2F');
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
        const theme = toggleButton.theme;
        // Verify custom colors in dark mode
        expect(theme.palette.custom.accept).toBe('#4CAF50');
        expect(theme.palette.custom.reject).toBe('#FF4C4C');
    });
});
