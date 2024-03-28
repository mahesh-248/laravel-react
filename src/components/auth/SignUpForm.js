import React, { useState ,useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import request from '../../api/axios';

const SignUpForm = () => {
	const navigate = useNavigate()


	useEffect(() => {

        const sessionToken = localStorage.getItem('session_token');
        const role = localStorage.getItem('role');

        if (sessionToken && role) {
            if (role === 'Student') {
         		navigate('/student'); // Redirect to '/professor' route
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

	const [name,setName] = useState("");
	const [email,setEmail] = useState("")
	const [password,setPass] = useState("")
	const [graduation_date,setDate] = useState("")

	const handleSubmit = async(e) => {
		e.preventDefault()
		try{
			const res = await request.post('/api/signup/student',{name,email,password,graduation_date})
			if(res.statusText === "OK"){
				localStorage.setItem('session_token',res.data.token)
				localStorage.setItem("role",res.data.role)
				navigate('/student')
			}
		}
		catch(e){
			alert(e)
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-800">
			<div className="w-full max-w-xs">
				<form onSubmit={handleSubmit} className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4">
					<div className="mb-4 text-white text-3xl text-center">Sign Up as Student</div>
					<div className="mb-4">
						<input
							name="name"
							className="appearance-none block w-full bg-gray-700 text-white border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-600"
							type="text"
							placeholder="Name"
							required
							onChange={(e) => {setName(e.target.value)}}
						/>
					</div>
					<div className="mb-4">
						<input
							name="email"
							className="appearance-none block w-full bg-gray-700 text-white border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-600"
							type="email"
							placeholder="Email"
							required
							onChange={(e) => {setEmail(e.target.value)}}
						/>
					</div>

					<div className="mb-4">
						<input
							name="graduationDate"
							className="appearance-none block w-full bg-gray-700 text-white border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-600"
							type="date"
							placeholder="Graduation Date"
							onChange={(e) => {setDate(e.target.value)}}
						/>
					</div>
					<div className="mb-6">
						<input
							name="password"
							className="appearance-none block w-full bg-gray-700 text-white border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-600"
							type="password"
							placeholder="Password"
							required
							onChange={(e) => {setPass(e.target.value)}}
						/>
					</div>
					<div className="flex items-center justify-between">
						<button
							className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
							type="submit"
						>
							Sign Up
						</button>
					</div>
				</form>

			</div>
		</div>
	);
};

export default SignUpForm;
