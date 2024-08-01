import { Link } from 'react-router-dom';
import { TrainerNavbar } from '../components/Trainer_Navbar';
function App() {
      return (
        <div>
          <TrainerNavbar/>
          <h2>Trainer Page</h2>
          <button><Link to="/">Back</Link></button>
        </div>
      );
    }
    export default App;