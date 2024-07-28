import { Link } from 'react-router-dom';
import FormPreview from '../components/FormPreview';
import { FormProvider } from '../components/FormContext';
function App() {
      return (
        <div>
          <h2>Client Page</h2>
          <FormProvider>
           <FormPreview/>
          </FormProvider>
          <button><Link to="/">Back</Link></button>
        </div>
      );
    }
    export default App;