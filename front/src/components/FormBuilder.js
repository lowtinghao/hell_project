import React, { useState } from 'react';
import { Box, Button, IconButton, MenuItem, Select, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

// Preset questions
const presetQuestions = [
  { title: 'Company Name', type: 'text', options: [] },
  { title: 'Client Type', type: 'radio', options: ['Technical', 'Business'] },
  { title: 'Workshop Name', type: 'text', options: [] },
  { title: 'Workshop Type', type: 'selector', options: ['Business Value Discovery', 'AI Platform', 'Infrastructure and Demo'] },
  { title: 'Workshop Dates', type: 'selector', options: ['2024-07-25T00:00:00.000+00:00','2024-07-26T00:00:00.000+00:00'] },
  { title: 'Deal Size Potential', type: 'text', options: []},
  { title: 'Location', type: 'radio', options: ['Local', 'Overseas'] },
  { title: 'Venue', type: 'text', options: []},
  { title: 'Number of Attendees', type: 'selector', options: ['1-5', '10', '10-50'] },
  { title: 'Comments', type: 'text', options: []}
];

const Question = ({ question, index, handleOptionChange, handleRemoveOption }) => {
  const handleOptionInputChange = (optionIndex, value) => {
    handleOptionChange(index, optionIndex, value);
  };

  return (
    <Box
      sx={{
        border: '1px solid #ddd',
        borderRadius: 2,
        p: 2,
        mb: 2,
        backgroundColor: '#f9f9f9',
        boxShadow: 1,
      }}
    >
      <Typography variant="h6" sx={{ mb: 1 }}>
        {question.title}
      </Typography>
      {question.type !== 'text' && question.options.map((option, optionIndex) => (
        <Box key={optionIndex} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <TextField
            label={`Option ${optionIndex + 1}`}
            value={option}
            onChange={(e) => handleOptionInputChange(optionIndex, e.target.value)}
            fullWidth
            variant="outlined"
            sx={{ mr: 1 }}
          />
          <IconButton
            color="error"
            onClick={() => handleRemoveOption(index, optionIndex)}
            sx={{ ml: 1 }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
    </Box>
  );
};

const FormBuilder = () => {
  const [formData, setFormData] = useState(presetQuestions);
  const [editMode, setEditMode] = useState(true);

  const handleAddOption = (questionIndex) => {
    const questionType = formData[questionIndex].type;
    // Add options only for specific question types
    if (questionType === 'radio' || questionType === 'selector') {
      const updatedQuestion = {
        ...formData[questionIndex],
        options: [...formData[questionIndex].options, '']
      };
      const newFormData = [...formData];
      newFormData[questionIndex] = updatedQuestion;
      setFormData(newFormData);
    }
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestion = {
      ...formData[questionIndex],
      options: formData[questionIndex].options.map((opt, oi) => (oi === optionIndex ? value : opt))
    };
    const newFormData = [...formData];
    newFormData[questionIndex] = updatedQuestion;
    setFormData(newFormData);
  };

  const handleRemoveOption = (questionIndex, optionIndex) => {
    const updatedQuestion = {
      ...formData[questionIndex],
      options: formData[questionIndex].options.filter((_, oi) => oi !== optionIndex)
    };
    const newFormData = [...formData];
    newFormData[questionIndex] = updatedQuestion;
    setFormData(newFormData);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Form Builder</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? 'Preview' : 'Edit'}
        </Button>
      </Box>
      {editMode ? (
        <Box>
          {formData.map((question, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Question
                index={index}
                question={question}
                handleOptionChange={handleOptionChange}
                handleRemoveOption={handleRemoveOption}
              />
              {(question.title === 'Client Type' || 
                question.title === 'Number of Attendees' || 
                question.title === 'Workshop Type') && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleAddOption(index)}
                >
                  Add Option
                </Button>
              )}
            </Box>
          ))}
        </Box>
      ) : (
        <Box>
          {formData.map((question, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Typography variant="h6">{question.title}</Typography>
              {question.type === 'text' && <TextField fullWidth variant="outlined" />}
              {question.type === 'radio' && question.options.map((option, optionIndex) => (
                <Box key={optionIndex} sx={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                  />
                  <label>{option}</label>
                </Box>
              ))}
              {question.type === 'selector' && (
                <Select fullWidth variant="outlined">
                  {question.options.map((option, optionIndex) => (
                    <MenuItem key={optionIndex} value={option}>{option}</MenuItem>
                  ))}
                </Select>
              )}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default FormBuilder;
