import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate  } from "react-router-dom";


function UsersList(){
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/list/users');
            const data = response.data;
            setUsers(data.result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };
    
        fetchData();
    }, []);

    const deleteUser = (id) => {
        axios.delete(`http://127.0.0.1:8000/delete/user/${id}`)
        .then(() => {
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        })
        .catch((error) => {
            console.error('Error deleting user:', error);
        });
    };

    const handleEdit = (user) => {
        localStorage.setItem("useredit", JSON.stringify(user));
        console.log(JSON.stringify(user));
    
        navigate("/edit/users");
    };


    return (
        
        <div className="overflow-x-auto rounded-lg border border-gray-200 h-96">
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
                        Email
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
                                <button
                                onClick={() => handleEdit(user)}                    
                                className='bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4'
                                >
                                    Editar
                                </button>
                                
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900" >
                                <button
                                onClick={() => deleteUser(user.id)} 
                                className="bg-gray-700 hover:bg-red-400 text-white font-bold py-2 px-4">
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