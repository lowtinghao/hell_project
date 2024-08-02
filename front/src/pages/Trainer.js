import { Link, useLocation} from 'react-router-dom';

import ViewWorkshopsTable from '../components/Trainer_ViewWorkshopsTable';

function App() {
  const location = useLocation();
  const trainerId = location.state.id;
  console.log("Trainer ID: " + trainerId);
      return (
        <div>
          <h2>Trainer Page</h2>
          <br/>
          <ViewWorkshopsTable/>
          <button><Link to="/">Back</Link></button>
        </div>
      );
    }
    export default App;