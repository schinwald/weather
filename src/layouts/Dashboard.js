import { Current, Weekly, Hourly } from '../components';


function Dashboard(props) {
    
    return (
		<main className="dashboard">
            <section className="card">
                <Current />
            </section>
            <section className="card">
                <Weekly />
            </section>
            <section className="card">
                <Hourly />
            </section>
        </main>
    )
}


export { Dashboard };