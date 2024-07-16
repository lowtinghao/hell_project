import logo from './logo.svg';
import './App.css';
import { CssBaseline, useTheme } from '@mui/material/styles';
import Navbar from './components/tab';
import { ThemeProvider } from './components/ThemeProvider';

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
