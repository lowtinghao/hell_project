import React, { useState } from 'react';
import { Box, Button, Fab, IconButton, MenuItem, Select, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import PreviewIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

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
      <Select
        value={question.type}
        onChange={(e) => handleChange('type', e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      >
        <MenuItem value="text">Text Input</MenuItem>
        <MenuItem value="radio">Radio Buttons</MenuItem>
        <MenuItem value="selector">Selector</MenuItem>
      </Select>
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

const Formtest = () => {
  const presetQuestions = [
    { title: 'Your Name', type: 'text', options: [] },
    { title: 'Your Favorite Color', type: 'radio', options: ['Red', 'Green', 'Blue'] },
    { title: 'Your Country', type: 'selector', options: ['USA', 'Canada', 'UK'] },
  ];

  const [questions, setQuestions] = useState(presetQuestions);
  const [editMode, setEditMode] = useState(false);

  const handleAddQuestion = () => {
    setQuestions([...questions, { title: '', type: 'text', options: [] }]);
  };

  const handleQuestionChange = (index, newQuestion) => {
    const updatedQuestions = questions.map((q, i) => (i === index ? newQuestion : q));
    setQuestions(updatedQuestions);
  };

  const handleAddOption = (index) => {
    const updatedQuestions = questions.map((q, i) => (
      i === index ? { ...q, options: [...q.options, ''] } : q
    ));
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = questions.map((q, i) => (
      i === questionIndex ? {
        ...q,
        options: q.options.map((opt, oi) => (oi === optionIndex ? value : opt))
      } : q
    ));
    setQuestions(updatedQuestions);
  };

  const handleRemoveQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleMoveQuestion = (index, direction) => {
    if (index + direction < 0 || index + direction >= questions.length) return;
    const newQuestions = [...questions];
    const temp = newQuestions[index];
    newQuestions[index] = newQuestions[index + direction];
    newQuestions[index + direction] = temp;
    setQuestions(newQuestions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Questions:', questions);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">Form Builder</Typography>
        {editMode && (
          <Fab color="primary" aria-label="add" onClick={handleAddQuestion}>
            <AddIcon />
          </Fab>
        )}
        <Fab color="secondary" aria-label={editMode ? 'preview' : 'edit'} onClick={() => setEditMode(!editMode)}>
          {editMode ? <PreviewIcon /> : <EditIcon />}
        </Fab>
      </Box>
      {editMode ? (
        <Box>
          {questions.map((question, index) => (
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
          {questions.map((question, index) => (
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
      <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
    </Box>
  );
};

export default Formtest;
