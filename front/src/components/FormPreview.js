// src/components/FormPreview.js
import React, { useState } from 'react';
import { useForm } from './FormContext';
import { Box, Button, MenuItem, Select, TextField, Typography } from '@mui/material';
import CalendarDatePicker from './CalendarDatePicker';


const FormPreview = (props) => {
  const { formData, formResponses, handleResponseChange, submitForm } = useForm();
  const workshopSetter = props.workshopSetter;
  const workshop = props.workshop;
  const [selectedDatesText, setSelectedDatesText] = useState('');

  const handleInputChange = (index, value) => {
    handleResponseChange(index, value);
    const newWorkshop = { ...workshop };
    newWorkshop[formData[index].title] = value;
    workshopSetter(newWorkshop);
    //console.log(formData[index].title);
    
  };

  const handleFormSubmit = async () => {
    const success = await submitForm();
    if (success) {
      console.log('Workshop Requested');
      window.location.reload(true);
    } else {
      console.error('Failed to request workshop');
    }
  };

  const handleDateSubmit = (selectedDates) => {
    const dateFieldIndex = formData.findIndex(field => field.title === 'Workshop Dates');
    if (dateFieldIndex !== -1) {
      handleInputChange(dateFieldIndex, selectedDates);
      const formattedDate = Array.isArray(selectedDates)
        ? `${selectedDates[0].toLocaleDateString()} - ${selectedDates[1].toLocaleDateString()}`
        : selectedDates.toLocaleDateString();
      setSelectedDatesText(formattedDate);
    }
  };

  return (
    <Box component="form" onSubmit={(e) => { e.preventDefault(); handleFormSubmit(); }}>
      {formData.map((question, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          <Typography variant="h6" data-testid={`question-title-${index}`}>{question.title}</Typography>
          {question.type === 'text' && (
            <TextField
              fullWidth
              value={formResponses[index] || ''}
              onChange={(e) => handleInputChange(index, e.target.value)}
              data-testid={`text-input-${index}`}
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
                data-testid={`radio-${index}-${optionIndex}`}
              />
              <label>{option}</label>
            </Box>
          ))}
          {question.type === 'selector' && (
            <Select
              fullWidth
              value={formResponses[index] || ''}
              onChange={(e) => handleInputChange(index, e.target.value)}
              data-testid={`select-${index}`}
            >
              {question.options.map((option, optionIndex) => (
                <MenuItem key={optionIndex} value={option}>{option}</MenuItem>
              ))}
            </Select>
          )}
          {question.type === 'date' && (
            <CalendarDatePicker
              value={formResponses[index] || new Date()}
              onChange={(date) => handleInputChange(index, date)}
              onDateSubmit={handleFormSubmit}
            />
          )}
        </Box>
      ))}
      {selectedDatesText && (
        <Typography variant="h6" sx={{ mt: 2 }}>
          Selected Dates: {selectedDatesText}
        </Typography>
      )}
    </Box>
  );
};

export default FormPreview;
