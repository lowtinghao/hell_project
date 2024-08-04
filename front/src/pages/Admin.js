import { Form, Link, useLocation, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '../components/ThemeProvider';
import WorkshopRequestTable from '../components/WorkshopRequestTable';
import TrainersTab from '../components/Admin_TrainersTab';
import { AdminNavbar } from '../components/Admin_Navbar';
import { useEffect, useState } from 'react';
import AdminForm from '../pages/AdminForm';
import AssignTrainer from '../pages/AssignTrainer';
import FormBuilder from '../components/FormBuilder';
import TrainerAvailability from '../components/TrainerAvailability';
import Admin_view_trainer_schedule from '../components/Admin_view_trainer_schedule';
import CalendarView from '../components/CalendarView';
import { io } from "socket.io-client";
// import TrainersTab from '../components/Admin_TrainersTab';

function checkIfIdIsValid(location_state) {
  if (location_state == null) {
    return false;
  }
  if (location_state.id == null) {
    return false;
  }
  if (!Number.isInteger(parseFloat(location_state.id))) {
    return false;
  }
  return true;
}



function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = "admin" + location.state.id;
  const [id, setId] = useState();

  useEffect(() => {
    console.log(location.state);
    if (!checkIfIdIsValid(location.state)) {
      navigate('/');
    } else {
      setId(location.state.id);
    }
    console.log(typeof (location.state.id));
  }, [location, navigate]);

  // for socket to listen
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:5000"));
  }, []);

  useEffect(() => {
    socket?.emit("newUser", user);
  }, [socket, user]);



  const [page, setPage] = useState("home-button")
  console.log("Page: " + page);



  if (page === "home-button") {
    console.log("Going to home page")
    console.log(socket)
    return (
      <div>
        <AdminNavbar setPage={setPage} socket={socket} user={user} />
        <h2>Admin Page</h2>
        <h3>{"ID : " + id}</h3>
        <ThemeProvider>
          {/* <CalendarView /> */}
          <WorkshopRequestTable />
        </ThemeProvider>
      </div>
    );
  } else if (page === "trainers-button") {
    console.log("Going to trainer page")
    return (
      <div>
        <AdminNavbar setPage={setPage} socket={socket} user={user} />
        <h2>Trainer Page : I need help with this</h2>

        <ThemeProvider>
          <CalendarView />
				  <TrainersTab/>
			  </ThemeProvider>
        <button><Link to="/">Back</Link></button>
      </div>
    );
  } else if (page === "form-button") {
    console.log("Going to trainer page")
    return (
      <div>
        <AdminNavbar setPage={setPage} socket={socket} user={user} />
        <h1>Form Page : I need help with this</h1>
        <button><Link to="/">Back</Link></button>
      </div>





      // <div>
      //   
      //   <h2>Assign Trainer</h2>
      //   <ThemeProvider>
      //     <AssignTrainer />
      //   </ThemeProvider>
      // </div>
    );
  };
}
export default App;