import { Link, useLocation} from 'react-router-dom';
import { ThemeProvider } from '../components/ThemeProvider';
import WorkshopRequestTable from '../components/WorkshopRequestTable';
import { AdminNavbar } from '../components/Admin_Navbar';


function App() {
  const location = useLocation();
  const adminId = location.state.id;
  console.log("Admin ID: " + adminId);
      return (
        <div>
          <AdminNavbar/>
          <h2>Admin Page</h2>
          <ThemeProvider>
            <WorkshopRequestTable />
          </ThemeProvider>
          <button><Link to="/">Back</Link></button>
        </div>
      );
    }
    export default App;