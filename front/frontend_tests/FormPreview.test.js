// src/components/FormPreview.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FormPreview from '../src/components/FormPreview';
import { FormProvider } from '../src/components/FormContext'; // Adjust the path if necessary


// Mock data
const mockFormData = [
  { title: 'Company Name', type: 'text', options: [] },
  { title: 'Client Type', type: 'radio', options: ['Technical', 'Business'] },
  { title: 'Workshop Name', type: 'text', options: [] },
  { title: 'Workshop Type', type: 'selector', options: ['Business Value Discovery', 'AI Platform', 'Infrastructure and Demo'] },
  { title: 'Workshop Dates', type: 'selector', options: ['2024-07-25T00:00:00.000+00:00', '2024-07-26T00:00:00.000+00:00'] },
  { title: 'Deal Size Potential', type: 'text', options: [] },
  { title: 'Location', type: 'radio', options: ['Local', 'Overseas'] },
  { title: 'Venue', type: 'text', options: [] },
  { title: 'Number of Attendees', type: 'selector', options: ['1-5', '10', '10-50'] },
  { title: 'Comments', type: 'text', options: [] }
];

const mockFormResponses = [];
const mockHandleResponseChange = jest.fn();
const mockSubmitForm = jest.fn();

describe('FormPreview', () => {
  const renderComponent = (props = {}) =>
    render(
      <FormProvider value={{ formData: mockFormData, formResponses: mockFormResponses, handleResponseChange: mockHandleResponseChange, submitForm: mockSubmitForm }}>
        <FormPreview {...props} />
      </FormProvider>
    );

  test('renders form fields based on formData', () => {
    renderComponent();

    // Check for text inputs
    expect(screen.getByText(/Company Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Workshop Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Deal Size Potential/i)).toBeInTheDocument();
    expect(screen.getByText(/Venue/i)).toBeInTheDocument();
    expect(screen.getByText(/Comments/i)).toBeInTheDocument();

    // Check for radio buttons
    expect(screen.getByText(/Technical/i)).toBeInTheDocument();
    expect(screen.getByText(/Business/i)).toBeInTheDocument();
    expect(screen.getByText(/Local/i)).toBeInTheDocument();
    expect(screen.getByText(/Overseas/i)).toBeInTheDocument();

    // Check for text inputs by data-testid
    expect(screen.getByTestId('text-input-0')).toBeInTheDocument();
    expect(screen.getByTestId('text-input-2')).toBeInTheDocument();
    expect(screen.getByTestId('text-input-5')).toBeInTheDocument();
    expect(screen.getByTestId('text-input-7')).toBeInTheDocument();
    expect(screen.getByTestId('text-input-9')).toBeInTheDocument();

    // Check for radio buttons
    expect(screen.getByTestId('radio-1-0')).toBeInTheDocument();
    expect(screen.getByTestId('radio-1-1')).toBeInTheDocument();
    expect(screen.getByTestId('radio-6-0')).toBeInTheDocument();
    expect(screen.getByTestId('radio-6-1')).toBeInTheDocument();

    // Check for selector (dropdowns)
    expect(screen.getByTestId('select-3')).toBeInTheDocument();
    expect(screen.getByTestId('select-4')).toBeInTheDocument();
    expect(screen.getByTestId('select-8')).toBeInTheDocument();
  });

  // test('updates text input value on change', () => {
  //   renderComponent();

  //   const textInput = screen.getByTestId('text-input-0');
  //   fireEvent.change(textInput, { target: { value: 'Acme Corp' } });

  //   expect(mockHandleResponseChange).toHaveBeenCalledWith(0, 'Acme Corp');
  // });
  // test('selects radio button and updates form response', () => {
  //   renderComponent();

  //   const radioButton = screen.getByTestId('radio-1-0');
  //   fireEvent.click(radioButton);

  //   expect(radioButton).toBeChecked('true');
  // });

  // test('selects option from dropdown and updates form response', () => {
  //   renderComponent();

  //   const workshopTypeSelector = screen.getByRole('combobox', { name: /Workshop Type/i });
  //   fireEvent.change(workshopTypeSelector, { target: { value: 'AI Platform' } });

  //   expect(mockHandleResponseChange).toHaveBeenCalledWith(3, 'AI Platform');
  // });

  // test('interacts with date picker', () => {
  //   renderComponent();

  //   // Simulate interaction with the date picker
  //   // You may need to adjust this based on the actual implementation of CalendarDatePicker
  //   const datePicker = screen.getByLabelText(/Workshop Dates/i);
  //   fireEvent.change(datePicker, { target: { value: '2024-07-25T00:00:00.000+00:00' } });

  //   expect(mockHandleResponseChange).toHaveBeenCalledWith(4, '2024-07-25T00:00:00.000+00:00');
  // });

  // test('calls submitForm function on form submission', () => {
  //   renderComponent();

  //   // Assuming there's a submit button to trigger form submission
  //   const submitButton = screen.getByRole('button', { name: /Submit/i });
  //   fireEvent.click(submitButton);

  //   expect(mockSubmitForm).toHaveBeenCalled();
  // });
});