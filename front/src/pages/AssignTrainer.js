import { Link } from 'react-router-dom';
import { ThemeProvider } from '../components/ThemeProvider';

function App() {
	return (
		<div>
			<h2>Assign Trainer</h2>
			<button><Link to="/">Back</Link></button>
		</div>
	);
}
export default App;