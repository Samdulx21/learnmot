import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";


function UsersList(){
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/list/users')  // La URL de la API
            .then(response => response.json())
            .then(data => setUsers(data.result));
    }, []);


    return (
        
        <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="ltr:text-left rtl:text-right">
                    <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        #
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Nombre
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Apellido
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Sexo
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        email
                        </th>
                    </tr>
                </thead>

                <tbody className='divide-y divide-gray-200'>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900" >{user.id}</td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900" >{user.name}</td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900" >{user.last_name}</td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900" >{user.sex}</td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900" >{user.email}</td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900" >
                                <a
                                    className='bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4'
                                >
                                    Editar
                                </a>
                                
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900" >
                                <button className="bg-gray-700 hover:bg-red-400 text-white font-bold py-2 px-4">
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    
    );
};


export default UsersList