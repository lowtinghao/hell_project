// src/pages/formtest.js
import React, { useState } from 'react';
import { Box, Button, Fab, IconButton, MenuItem, Select, TextField, Typography, Menu } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useForm } from './FormContext';  // Adjust the import path according to your project structure

const Question = ({ question, index, handleQuestionChange, handleAddOption, handleOptionChange, handleRemoveQuestion, handleMoveQuestion }) => {
  const handleChange = (field, value) => {
    handleQuestionChange(index, { ...question, [field]: value });
  };

  return (
    <Box sx={{ mb: 2, border: '1px solid #ccc', p: 2, borderRadius: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6">Question {index + 1}</Typography>
        <Box>
          <IconButton onClick={() => handleMoveQuestion(index, -1)}><ArrowUpwardIcon /></IconButton>
          <IconButton onClick={() => handleMoveQuestion(index, 1)}><ArrowDownwardIcon /></IconButton>
          <IconButton onClick={() => handleRemoveQuestion(index)}><DeleteIcon /></IconButton>
        </Box>
      </Box>
      <TextField
        label="Question Title"
        value={question.title}
        onChange={(e) => handleChange('title', e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      {question.type !== 'text' && question.options.map((option, optionIndex) => (
        <Box key={optionIndex} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <TextField
            label={`Option ${optionIndex + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
            fullWidth
          />
        </Box>
      ))}
      {question.type !== 'text' && (
        <Button variant="contained" onClick={() => handleAddOption(index)}>Add Option</Button>
      )}
    </Box>
  );
};

const FormBuilder = () => {
  const { formData, addQuestion, updateQuestion, removeQuestion, moveQuestion } = useForm();
  const [editMode, setEditMode] = useState(true);  // Set default mode to edit mode
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAddQuestion = (type) => {
    addQuestion({ title: `New Question ${formData.length + 1}`, type, options: [] });
    handleCloseMenu();
  };

  const handleQuestionChange = (index, newQuestion) => {
    updateQuestion(index, newQuestion);
  };

  const handleAddOption = (index) => {
    const updatedQuestion = {
      ...formData[index],
      options: [...formData[index].options, '']
    };
    updateQuestion(index, updatedQuestion);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestion = {
      ...formData[questionIndex],
      options: formData[questionIndex].options.map((opt, oi) => (oi === optionIndex ? value : opt))
    };
    updateQuestion(questionIndex, updatedQuestion);
  };

  const handleRemoveQuestion = (index) => {
    removeQuestion(index);
  };

  const handleMoveQuestion = (index, direction) => {
    moveQuestion(index, direction);
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">Form Builder</Typography>
        {editMode && (
          <>
            <Fab color="primary" aria-label="add" onClick={handleOpenMenu}>
              <AddIcon />
            </Fab>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              <MenuItem onClick={() => handleAddQuestion('text')}>Text Input</MenuItem>
              <MenuItem onClick={() => handleAddQuestion('radio')}>Radio Buttons</MenuItem>
              <MenuItem onClick={() => handleAddQuestion('selector')}>Selector</MenuItem>
            </Menu>
          </>
        )}
        <Fab color="secondary" aria-label={editMode ? 'preview' : 'edit'} onClick={() => setEditMode(!editMode)}>
          {editMode ? <PreviewIcon /> : <EditIcon />}
        </Fab>
      </Box>
      {editMode ? (
        <Box>
          {formData.map((question, index) => (
            <Question
              key={index}
              index={index}
              question={question}
              handleQuestionChange={handleQuestionChange}
              handleAddOption={handleAddOption}
              handleOptionChange={handleOptionChange}
              handleRemoveQuestion={handleRemoveQuestion}
              handleMoveQuestion={handleMoveQuestion}
            />
          ))}
        </Box>
      ) : (
        <Box>
          {formData.map((question, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography variant="h6">{question.title}</Typography>
              {question.type === 'text' && <TextField fullWidth />}
              {question.type === 'radio' && question.options.map((option, optionIndex) => (
                <Box key={optionIndex}>
                  <input type="radio" name={`question-${index}`} value={option} />
                  <label>{option}</label>
                </Box>
              ))}
              {question.type === 'selector' && (
                <Select fullWidth>
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
