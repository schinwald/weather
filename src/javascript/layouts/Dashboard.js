import { Current, Weekly, Hourly } from '../components';


function Dashboard(props) {
    
    return (
		<main className="dashboard">
            <Current />
            <Weekly />
            <Hourly />
        </main>
    )
}


export { Dashboard };