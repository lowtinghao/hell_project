import React, { useState } from 'react';
import { Box, Button, TextField, MenuItem, Select, Typography } from '@mui/material';

const FormPreview = ({ formData }) => {
  const [formValues, setFormValues] = useState(
    formData.reduce((acc, question) => {
      acc[question.title] = '';
      return acc;
    }, {})
  );

  const handleInputChange = (title, value) => {
    setFormValues({
      ...formValues,
      [title]: value
    });
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Form submitted with values:', formValues);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>Form Preview</Typography>
      {formData.map((question, index) => (
        <Box key={index} sx={{ mb: 3 }}>
          <Typography variant="h6">{question.title}</Typography>
          {question.type === 'text' && (
            <TextField
              fullWidth
              variant="outlined"
              value={formValues[question.title] || ''}
              onChange={(e) => handleInputChange(question.title, e.target.value)}
            />
          )}
          {question.type === 'radio' && question.options.map((option, optionIndex) => (
            <Box key={optionIndex} sx={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="radio"
                name={question.title}
                value={option}
                checked={formValues[question.title] === option}
                onChange={() => handleInputChange(question.title, option)}
              />
              <label>{option}</label>
            </Box>
          ))}
          {question.type === 'selector' && (
            <Select
              fullWidth
              variant="outlined"
              value={formValues[question.title] || ''}
              onChange={(e) => handleInputChange(question.title, e.target.value)}
            >
              {question.options.map((option, optionIndex) => (
                <MenuItem key={optionIndex} value={option}>{option}</MenuItem>
              ))}
            </Select>
          )}
        </Box>
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
  );
};

export default FormPreview;
