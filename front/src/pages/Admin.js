import { Link, useLocation} from 'react-router-dom';
import { ThemeProvider } from '../components/ThemeProvider';
import WorkshopRequestTable from '../components/WorkshopRequestTable';
import { AdminNavbar } from '../components/Admin_Navbar';
import { useState } from 'react';



function App() {
  const location = useLocation();
  //const [ id, setId ] = useState(location.state.id);
  const [page, setPage] = useState("Page")
  //console.log(location)
  //console.log("Admin ID: " + id);

      return (
        <div>
          <AdminNavbar setPage = {setPage}/>
          <h2>Admin Page</h2>
          <ThemeProvider>
            <WorkshopRequestTable />
          </ThemeProvider>
          <button><Link to="/">Back</Link></button>
        </div>
      );
    }
    export default App;