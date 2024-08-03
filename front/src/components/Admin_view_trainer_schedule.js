import { useEffect, useState } from 'react'

const back_url = "localhost:3001";
async function fetchWorkshops() {
    let response = await fetch(`http://${back_url}/admin/workshops`);
    let data = await response.json();
    return data
}

async function fetchTrainers() {
    let response = await fetch(`http://${back_url}/admin/trainers`);
    let data = await response.json();
    return data
}



const filterWorkshopsToAccepted = (workshops, filter) => {

	let filtered = [];
	let i;
	if (filter === -1) {
		for (i in Object.keys(workshops)){
			filtered.push(workshops[i]);
		}
	} else {
		for (i in Object.keys(workshops)){
			if (workshops[i].status === filter){
				filtered.push(workshops[i]);
			}
		}
	}
	return filtered;
  };

const filterWorkshopByTrainer = (workshops, trainerID) => {
    let filtered = [];
    let i;
    let j;
    for (i in Object.keys(workshops)){
        for (j in workshops[i].assignedTrainers){
            if (trainerID === j){
                filtered.push(workshops[i]);
            }
        }
    }
    return filtered;
}

const App = () => {
    const [allWorkshops, setAllWorkshops] = useState({})
    const [filteredWorkshops, setFilteredWorkshops] = useState({})
    const [allTrainers, setAllTrainers] = useState({})

    useEffect(() => {
        async function fetchData() {
            const workshops = await fetchWorkshops();
            const trainers = await fetchTrainers();
            setAllWorkshops(workshops);
            setAllTrainers(trainers);
            setFilteredWorkshops(filterWorkshopsToAccepted(workshops, 1));
        }
        fetchData();
        console.log(filterWorkshopByTrainer(filteredWorkshops, 1));
    }, [])

    
    return (
        <div>
            
        </div>
    )
}

export default App
