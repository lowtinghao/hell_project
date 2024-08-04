import './Login.css';
import { Link } from 'react-router-dom';
import SignIn from '../components/SignIn';

function App() {

  return (
    <div className="App">
      <div className="buttonContainer">
        <SignIn></SignIn>
      </div>
    </div>
  );
} 


export default App;
