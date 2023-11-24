import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate  } from "react-router-dom";


function UsersList({ roleFilter  }){
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/list/user/role');
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

    const filteredUsers = users.filter((user) => {
        if (roleFilter === "") {
        return user.role === null;
        } else {
        return user.role === roleFilter && user.role !== null;
        }
    });

    const capitaLetter = (str) => {
        return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
    };

    return (
        
        <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="ltr:text-left rtl:text-right">
                    <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Nombre
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Apellido
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            {roleFilter !== "" ? "Role" : "Estado"}
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Sexo
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Email
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900" colSpan="2">
                            Acciones
                        </th>
                    </tr>
                </thead>

                <tbody className='divide-y divide-gray-200'>
                    {filteredUsers.map((user, index)=> (
                        <tr key={index}>
                            <td className="whitespace-nowrap px-4 py-2 font-normal text-gray-900" >{capitaLetter(user.name)}</td>
                            <td className="whitespace-nowrap px-4 py-2 font-normal text-gray-900" >{capitaLetter(user.last_name)}</td>
                            <td className="whitespace-nowrap px-4 py-2 font-normal text-gray-900" >
                                {user.role !== null ? user.role : "Pendiente"}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 font-normal text-gray-900" >{capitaLetter(user.sex)}</td>
                            <td className="whitespace-nowrap px-4 py-2 font-normal text-gray-900" >{user.email}</td>
                            <td className="whitespace-nowrap px-4 py-2 font-normal text-gray-900" >
                                <button
                                onClick={() => handleEdit(user)}                    
                                className='bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4'
                                >
                                    Editar
                                </button>
                                
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 font-normal text-gray-900" >
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