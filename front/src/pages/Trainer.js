import { Link } from 'react-router-dom';
import { TrainerNavbar } from '../components/Trainer_Navbar';
import ViewWorkshopsTable from '../components/Trainer_ViewWorkshopsTable';
function App() {
      return (
        <div>
          <TrainerNavbar/>
          <h2>Trainer Page</h2>
          <br/>
          <ViewWorkshopsTable/>
          <button><Link to="/">Back</Link></button>
        </div>
      );
    }
    export default App;