import './Login.css';
import { Link } from 'react-router-dom';
import SignIn from '../components/SignIn';

function App() {

  return (
    <div className="App">
      <div className="buttonContainer">
        <SignIn></SignIn>
        <button className="loginButton" data-testid="admin-login-button"><Link to='/admin'>Admin Login</Link></button>
        <button className="loginButton" data-testid="trainer-login-button"><Link to='/trainer'>Trainer Login</Link></button>
        <button className="loginButton" data-testid="client-login-button"><Link to='/client'>Client Login</Link></button>
      </div>
    </div>
  );
} 


export default App;
