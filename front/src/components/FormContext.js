// src/context/FormContext.js
import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext();

const presetQuestions = [
  { title: 'Company Name', type: 'text', options: [] },
  { title: 'Company Type', type: 'radio', options: ['Corporate', 'Client', 'Business'] },
  { title: 'Number of Attendees', type: 'selector', options: ['1-5', '10', '10-50'] },
];

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState(presetQuestions);
  const [formResponses, setFormResponses] = useState({});

  const addQuestion = (question) => {
    setFormData([...formData, question]);
  };

  const updateQuestion = (index, newQuestion) => {
    const updatedFormData = formData.map((q, i) => (i === index ? newQuestion : q));
    setFormData(updatedFormData);
  };

  const removeQuestion = (index) => {
    setFormData(formData.filter((_, i) => i !== index));
  };

  const moveQuestion = (index, direction) => {
    if (index + direction < 0 || index + direction >= formData.length) return;
    const newFormData = [...formData];
    const temp = newFormData[index];
    newFormData[index] = newFormData[index + direction];
    newFormData[index + direction] = temp;
    setFormData(newFormData);
  };

  const handleResponseChange = (index, value) => {
    setFormResponses({ ...formResponses, [index]: value });
  };

  const submitForm = () => {
    console.log('Submitted Responses:', formResponses);
    // Add any additional form submission logic here
  };

  return (
    <FormContext.Provider
      value={{
        formData, 
        addQuestion,
        updateQuestion,
        removeQuestion,
        moveQuestion,
        formResponses,
        handleResponseChange,
        submitForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);
