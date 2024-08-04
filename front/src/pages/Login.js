import './Login.css';
import { Link } from 'react-router-dom';
import SignIn from '../components/SignIn';

function App() {

  return (
    <div className="App">
      <div className="buttonContainer">
        <SignIn></SignIn>
        <button className="loginButton"><Link to='/admin'>Admin Login</Link></button>
        <button className="loginButton"><Link to='/trainer'>Trainer Login</Link></button>
        <button className="loginButton"><Link to='/client'>Client Login</Link></button>
      </div>
    </div>
  );
} 


export default App;
