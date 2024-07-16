import logo from './logo.svg';
import './App.css';
import Navbar from './components/NavBar';
import BasicTabs from './components/NavBar';
import { CssBaseline, useTheme } from '@mui/material/styles';
import Tabsssss from './components/tab';
import Navbarssss from './components/tab';
import { ThemeProvider } from './components/ThemeProvider';

function App() {

  const theme = useTheme();
  return (
    <div className="App">
      
      <ThemeProvider>
        <Navbarssss/>
      </ThemeProvider>
    </div>
  );
}

export default App;
