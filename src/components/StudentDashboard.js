import React, { useEffect, useState } from 'react';
import CalendarComponent from './CalendarComponent';
import TasksSidebar from './TasksSidebar';
import TasksProgressSection from './TasksProgressSection';
import { useLocation, useNavigate } from 'react-router-dom';
import request from '../api/axios';

const StudentDashboard = () => {

	const navigate = useNavigate()
	const location = useLocation()
	const [tasks, setTasks] = useState([])

	useEffect(() => {
        const sessionToken = localStorage.getItem('session_token');
        const role = localStorage.getItem('role');

        if (sessionToken && role) {
            if (role === 'Student') {

				const getData = async() => {

					try{
						const res = await request.post('/api/student/tasks',{"token" : sessionToken })
						console.log(res)
					}
					catch(e){
						console.log(e)
					}
				}
				getData()
		   }
		   else if(role === 'Professor'){
			   navigate('/professor')
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



	// useEffect(() => {

	// 	try{

	// 		const res = request.post('/api/student/tasks',{"token" : `bearer ${localStorage.getItem("session_token")}`})
	// 		console.log(res)
	// 	}
	// 	catch(e){
	// 		console.log(e)
	// 	}


	// }, [])



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
		<div className="container mx-auto p-2">
			<div className="flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0 lg:space-x-4">
				<div className="lg:flex-1 lg:max-w-xs">
					<CalendarComponent events={events} />
				</div>
				<div className="lg:flex-1 lg:max-w-sm">
					<TasksSidebar todaysTasks={todaysTasks} weeksTasks={weeksTasks} />
				</div>
				<div className="lg:flex-1 lg:flex-grow">
					<TasksProgressSection />
				</div>
			</div>
		</div>
	);
};

export default StudentDashboard;


