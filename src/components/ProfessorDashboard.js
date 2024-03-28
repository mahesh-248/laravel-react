import React,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import CalendarComponent from './CalendarComponent';
import TasksSectionProf from './TasksSectionProf';
import request from '../api/axios';


const ProfessorDashboard = () => {
	const navigate = useNavigate()

	useEffect(() => {
        const sessionToken = localStorage.getItem('session_token');
        const role = localStorage.getItem('role');

        if (sessionToken && role) {
            if (role === 'Student') {
				navigate('/student')
		   }
		   else if(role === 'Professor'){
				const getData = async() => {

					try{
						const res = await request.post('/api/professor/tasks',{"token" : sessionToken })
						console.log(res)
					}
					catch(e){
						console.log(e)
					}
				}
				getData()
		   } 
		   else{
			   localStorage.clear();
			   navigate('/'); 
		   }
        } else {
            localStorage.clear();
            navigate('/'); // Redirect to '/' route
        }
    }, []);


	const events = [
		{ title: 'Math Assignment', date: '2024-03-14' },
	];

	const todaysTasks = [
		{ title: 'Complete Math Assignment' },
	];

	const weeksTasks = [
		{ title: 'Start History Project' },
	];

	return (
		<div className="container mx-auto p-4">
			<div className="flex flex-col lg:flex-row gap-4">
				<div className="flex-grow" style={{ flexBasis: '30%' }}>
					<CalendarComponent events={events} />
				</div>
				<div className="flex-grow" style={{ flexBasis: '70%' }}>
					<TasksSectionProf />
				</div>
			</div>
		</div>
	);
};

export default ProfessorDashboard;


