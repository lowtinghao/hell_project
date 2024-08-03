// src/components/FormPreview.js
import React from 'react';
import { useForm } from './FormContext';
import { Box, Button, MenuItem, Select, TextField, Typography } from '@mui/material';
import CalendarDatePicker from './CalendarDatePicker';


const FormPreview = (props) => {
  const { formData, formResponses, handleResponseChange, submitForm } = useForm();
  const workshopSetter = props.workshopSetter;
  const workshop = props.workshop;

  const handleInputChange = (index, value) => {
    handleResponseChange(index, value);
    const newWorkshop = { ...workshop };
    newWorkshop[formData[index].title] = value;
    workshopSetter(newWorkshop);
    //console.log(formData[index].title);
    
  };

  return (
    <Box component="form">
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
          {question.type === 'date' && (
            // TODO : HELP IMPLEMENT THIS
            <CalendarDatePicker>
            </CalendarDatePicker>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default FormPreview;
