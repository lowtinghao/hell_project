
import './Login.css';
import { Link } from 'react-router-dom';


function App() {

  return (
    <div className="App">
      <div className="buttonContainer">
        <button className="loginButton"><Link to='/admin'>Admin Login</Link></button>
        <button className="loginButton"><Link to='/trainer'>Trainer Login</Link></button>
        <button className="loginButton"><Link to='/client'>Client Login</Link></button>
      </div>
    </div>
  );
} 


export default App;
