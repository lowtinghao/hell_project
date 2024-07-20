import logo from './logo.svg';
import './App.css';
import { CssBaseline, useTheme } from '@mui/material/styles';
import Navbar from './components/tab';
import { ThemeProvider } from './components/ThemeProvider';
import { CalendarView } from './components/CalendarView';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import AssignTrainers from './pages/AssignTrainers';
import AssignTrainers from './pages/AssignTrainers';

function App() {

  const theme = useTheme();
  return (
    <div className="App">
      <ThemeProvider>
        <Navbar/>
      </ThemeProvider>
    </div>
  );
}

export default App;
