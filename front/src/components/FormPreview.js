// src/components/FormPreview.js
import React from 'react';
import { useForm } from './FormContext';
import { Box, Button, MenuItem, Select, TextField, Typography } from '@mui/material';

const FormPreview = () => {
  const { formData, formResponses, handleResponseChange, submitForm } = useForm();

  const handleInputChange = (index, value) => {
    handleResponseChange(index, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm();
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {formData.map((question, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          <Typography variant="h6">{question.title}</Typography>
          {question.type === 'text' && (
            <TextField
              fullWidth
              value={formResponses[index] || ''}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          )}
          {question.type === 'radio' && question.options.map((option, optionIndex) => (
            <Box key={optionIndex}>
              <input
                type="radio"
                name={`question-${index}`}
                value={option}
                checked={formResponses[index] === option}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
              <label>{option}</label>
            </Box>
          ))}
          {question.type === 'selector' && (
            <Select
              fullWidth
              value={formResponses[index] || ''}
              onChange={(e) => handleInputChange(index, e.target.value)}
            >
              {question.options.map((option, optionIndex) => (
                <MenuItem key={optionIndex} value={option}>{option}</MenuItem>
              ))}
            </Select>
          )}
        </Box>
      ))}
      <Button type="submit" variant="contained" color="primary">Submit</Button>
    </Box>
  );
};

export default FormPreview;
