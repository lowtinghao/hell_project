// __tests__/FormContext.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormProvider, useForm } from '../src/components/FormContext';

// Helper component to test the FormContext
const TestComponent = () => {
  const {
    formData,
    addQuestion,
    updateQuestion,
    removeQuestion,
    moveQuestion,
    formResponses,
    handleResponseChange,
    submitForm
  } = useForm();

  return (
    <div>
      <button onClick={() => addQuestion({ title: 'New Question', type: 'text', options: [] })}>
        Add Question
      </button>
      <button onClick={() => updateQuestion(0, { title: 'Updated Question', type: 'text', options: [] })}>
        Update Question
      </button>
      <button onClick={() => removeQuestion(0)}>
        Remove Question
      </button>
      <button onClick={() => moveQuestion(0, 1)}>
        Move Question Down
      </button>
      <button onClick={() => handleResponseChange(0, 'New Response')}>
        Update Response
      </button>
      <button onClick={submitForm}>
        Submit Form
      </button>

      <div data-testid="form-data">{JSON.stringify(formData)}</div>
      <div data-testid="form-responses">{JSON.stringify(formResponses)}</div>
    </div>
  );
};

describe('FormContext', () => {
  test('should initialize with preset questions', () => {
    render(
      <FormProvider>
        <TestComponent />
      </FormProvider>
    );

    expect(screen.getByTestId('form-data').textContent).toBe(
      JSON.stringify([
        { title: 'Company Name', type: 'text', options: [] },
        { title: 'Client Type', type: 'radio', options: ['Technical', 'Business'] },
        { title: 'Workshop Name', type: 'text', options: [] },
        { title: 'Workshop Type', type: 'selector', options: ['Business Value Discovery', 'AI Platform', 'Infrastructure and Demo'] },
        { title: 'Workshop Dates', type: 'selector', options: ['2024-07-25T00:00:00.000+00:00','2024-07-26T00:00:00.000+00:00'] },
        { title: 'Deal Size Potential', type: "text", options: []},
        { title: 'Location', type: 'radio', options: ['Local', 'Overseas'] },
        { title: 'Venue', type: 'text', options: []},
        { title: 'Number of Attendees', type: 'selector', options: ['1-5', '10', '10-50'] },
        {title: "Comments", type: "text", options: []}
      ])
    );
  });

  test('should add a new question', () => {
    render(
      <FormProvider>
        <TestComponent />
      </FormProvider>
    );

    fireEvent.click(screen.getByText('Add Question'));
    expect(screen.getByTestId('form-data').textContent).toContain('New Question');
  });

  test('should update a question', () => {
    render(
      <FormProvider>
        <TestComponent />
      </FormProvider>
    );

    fireEvent.click(screen.getByText('Update Question'));
    expect(screen.getByTestId('form-data').textContent).toContain('Updated Question');
  });

  test('should remove a question', () => {
    render(
      <FormProvider>
        <TestComponent />
      </FormProvider>
    );

    fireEvent.click(screen.getByText('Remove Question'));
    expect(screen.getByTestId('form-data').textContent).not.toContain('Company Name');
  });

  test('should move a question', () => {
    render(
      <FormProvider>
        <TestComponent />
      </FormProvider>
    );

    fireEvent.click(screen.getByText('Move Question Down'));
    const updatedFormData = JSON.parse(screen.getByTestId('form-data').textContent);
    expect(updatedFormData[1].title).toBe('Company Name');
  });

  test('should handle response change', () => {
    render(
      <FormProvider>
        <TestComponent />
      </FormProvider>
    );

    fireEvent.click(screen.getByText('Update Response'));
    expect(screen.getByTestId('form-responses').textContent).toContain('New Response');
  });

  test('should submit form', () => {
    console.log = jest.fn(); // Mock console.log to test its calls

    render(
      <FormProvider>
        <TestComponent />
      </FormProvider>
    );

    fireEvent.click(screen.getByText('Update Response')); 
    fireEvent.click(screen.getByText('Submit Form'));
    expect(console.log).toHaveBeenCalledWith('Submitted Responses:', { 0: 'New Response' });
  });
});
