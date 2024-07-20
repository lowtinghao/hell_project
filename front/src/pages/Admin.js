import { Link } from 'react-router-dom';
import { ThemeProvider } from '../components/ThemeProvider';
import WorkshopRequestTable from '../components/WorkshopRequestTable';
import Navbar from '../components/Navbar';

function App() {
      return (
        <div>
          <h2>Admin Page</h2>
          <ThemeProvider>
            <WorkshopRequestTable />
          </ThemeProvider>
          <button><Link to="/">Back</Link></button>
        </div>
      );
    }
    export default App;