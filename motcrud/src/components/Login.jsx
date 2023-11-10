import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import {setToken, fetchToken} from './Auth'

function Login() {

    const navigate = useNavigate();
    const [ email, setEmail ] = useState('');
    const [ user_pass, setUser_Pass ] = useState('');

    const handleLogin = () => {
        if (email.length === 0 || user_pass.length === 0){
            alert('Email or password cannot be blank!');
        }else{
            console.log('axios')
            axios.post('http://127.0.0.1:8000/login/signup', {
                email: email,
                user_pass: user_pass
            })
            .then(function (response) {
                console.log(response);
                console.log(response.data);

                if (response.data.token) {
                    setToken(response.data.token);
                    navigate("/home/users");
                } else {
                    alert("Login failed");
                    
                }   
            })
            .catch(function (error) {
                console.log(error, 'error');
                alert("Error during login");
            });
        }
    }
    

    return (
        <div>
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg text-center">
                    <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>
                    {
                    fetchToken() 
                    ? (
                        <p className="mt-4 text-gray-500">
                            You are logged in!
                        </p>
                    )
                    : (
                        <p className="mt-4 text-gray-500">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla
                            eaque error neque ipsa culpa autem, at itaque nostrum!
                        </p>
                    )
                }
                </div>

                <form action="" className="mx-auto mb-0 mt-8 max-w-md space-y-4">
                    <div>
                    <label htmlFor="email" className="sr-only">Email</label>

                    <div className="relative">
                        <input
                        type="email"
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />

                        <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                            />
                        </svg>
                        </span>
                    </div>
                    </div>

                    <div>
                    <label htmlFor="password" className="sr-only">Password</label>

                    <div className="relative">
                        <input
                        type="password"
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                        placeholder="Enter password"
                        value={user_pass}
                        onChange={(e) => setUser_Pass(e.target.value)}
                        />

                        <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                        </svg>
                        </span>
                    </div>
                    </div>

                    <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                        No account?
                        <a className="underline" href="">Sign up</a>
                    </p>

                    <button
                        type="button"
                        onClick={handleLogin}
                        className="inline-block rounded-lg bg-teal-600 px-5 py-3 text-sm font-medium text-white"
                    >
                        Sign in
                    </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login

// const [userLogin, setUserLogin] = useState({ email: '', user_pass: '' });
//     const [token, setToken] = useState(null);

//     const handleLogin = async () => {
//         if (userLogin.email.length === 0){
//             alert("Email has left blank!");
//         }else if (userLogin.user_pass.length === 0){
//             alert("Password has left blank!");
//         }else{
//             console.log('Success')
//             try {
//                 const response = await axios.post('http://127.0.0.1:8000/login/signup', userLogin);
//                 const { token } = response.data;
//                 setToken(token)
//                 localStorage.setItem('token', token);
//                 // Almacenar el token en el estado o en una cookie/local storage para su uso posterior
//             } catch (error) {
//                 console.error('Error de inicio de sesión:', error);
//                 // Manejar errores de inicio de sesión, por ejemplo, mostrar un mensaje de error al usuario
//             }
//         }
        
//     };
  
//     const handleInputChange = (e) => {
//       setUserLogin({
//         ...userLogin,
//         [e.target.name]: e.target.value,
//       });
//     };