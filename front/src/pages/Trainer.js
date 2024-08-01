import { Link, useLocation} from 'react-router-dom';

function App() {
  const location = useLocation();
  const trainerId = location.state.id;
  console.log("Trainer ID: " + trainerId);
      return (
        <div>
          <h2>Trainer Page</h2>
          <button><Link to="/">Back</Link></button>
        </div>
      );
    }
    export default App;