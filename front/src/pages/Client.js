import { Link, useLocation, useNavigate} from 'react-router-dom';
import FormPreview from '../components/FormPreview';
import { FormProvider } from '../components/FormContext';
import { useEffect, useState, useReducer } from 'react';
import { Box, Button } from '@mui/material';
import { ClientNavbar } from '../components/Client_Navbar';
import ViewClientWorkshopsTable from '../components/Client_ViewWorkshopsTable';
function App() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(location.state);
    if (location.state == null){
      navigate('/');
    }
    if (location.state.id == null) {
      navigate('/');
    }
  }, [location, navigate]);

  const [workshop, setWorkshop] = useState({});
  const back_url = "localhost:3001";


  const handleSubmit = () => {
    const sendRequest = async () => {
      const workshopToRequest = {
        client_id : 1, 
        companyName : workshop["Company Name"],
        clientType : workshop["Client Type"],
        workshopName : workshop["Workshop Name"],
        dates : [workshop["Workshop Dates"]],
        type : workshop["Workshop Type"],
        numberOfAttendees : workshop["Number of Attendees"],
        dealSizePotential : workshop["Deal Size Potential"],
        location : workshop["Location"],
        venue : workshop["Venue"],
        comments: workshop["Comments"]};
  
        console.log(workshopToRequest);
        const response = await fetch(`http://${back_url}/client/workshops`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(workshopToRequest)
        });
        console.log(response.status);
      if (response.status === 201) {
        console.log('Workshop Requested');
        return true;
      } else {
        console.log('Failed to request workshop');
        return false;
      }
    }
    if (sendRequest()) {
      window.location.reload(true);
    } else {
      // HANDLE HERE
    }
    
  };
  
      return (
        <div>
          <h2>Client Page</h2>
          <FormProvider>
           <FormPreview workshopSetter={setWorkshop} workshop={workshop}/>
          </FormProvider>
          <Box>
            <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
          </Box>

          <br/>
          <ViewClientWorkshopsTable/>

          <button><Link to="/">Back</Link></button>
        </div>
      );
    }
    export default App;