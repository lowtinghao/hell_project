// __tests__/FormBuilder.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormProvider } from '../src/components/FormContext';
import FormBuilder from '../src/components/FormBuilder';

describe('FormBuilder', () => {
  test('renders FormBuilder component', () => {
    render(
      <FormProvider>
        <FormBuilder />
      </FormProvider>
    );
    expect(screen.getByText('Form Builder')).toBeInTheDocument();
    expect(screen.getByLabelText('edit')).toBeInTheDocument(); // Check for edit mode button
  });
  test('adds a new question', () => {
    render(
      <FormProvider>
        <FormBuilder />
      </FormProvider>
    );
  
    fireEvent.click(screen.getByLabelText('edit')); // Toggle to edit mode
    fireEvent.click(screen.getByLabelText('add')); // Open add menu
    fireEvent.click(screen.getByText('Text Input')); // Select text input
  
    expect(screen.getByText('Question 4')).toBeInTheDocument(); // Check if new question is added
  });
  test('changes existing question title', () => {
    render(
      <FormProvider>
        <FormBuilder />
      </FormProvider>
    );

    fireEvent.click(screen.getByLabelText('edit')); // Toggle to edit mode
    // Assuming the form already has a third question with the title "Number of Attendees"
    const titleInput = screen.getByDisplayValue('Number of Attendees'); // Find the input with the current value
    fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
    expect(titleInput.value).toBe('Updated Title');
  })

  test('changes existing question option', () => {
    render(
      <FormProvider>
        <FormBuilder />
      </FormProvider>
    );

    fireEvent.click(screen.getByLabelText('edit')); // Toggle to edit mode
    // Assuming the form already has a option called Business
    const optionInput = screen.getByDisplayValue('Business'); // Find the input with the current value
    fireEvent.change(optionInput, { target: { value: 'Technical' } });
    expect(optionInput.value).toBe('Technical');
  })

  test('toggles preview mode', () => {
    render(
      <FormProvider>
        <FormBuilder />
      </FormProvider>
    );
  
    fireEvent.click(screen.getByLabelText('edit')); // Toggle to edit mode
    expect(screen.queryByLabelText('add')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('preview')); // Toggle to preview mode
  
    expect(screen.queryByLabelText('add')).toBeNull(); // Add button should not be present in preview mode
  });
  test('view 3 types of question options when click on add button in edit mode', async () => {
    render(
      <FormProvider>
        <FormBuilder />
      </FormProvider>
    );
  
    fireEvent.click(screen.getByLabelText('edit')); // Toggle to edit mode
    fireEvent.click(screen.getByLabelText('add')); // Open add menu
    // Check if the question options are displayed
    const option1 = await screen.findByText('Text Input');
    const option2 = await screen.findByText('Radio Buttons');
    const option3 = await screen.findByText('Selector');
    expect(option1).toBeInTheDocument();
    expect(option2).toBeInTheDocument();
    expect(option3).toBeInTheDocument();
  });
});
