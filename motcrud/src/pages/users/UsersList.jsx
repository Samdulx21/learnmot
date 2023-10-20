import { useEffect, useState } from "react";
import axios from "axios";

// function UsersList() {

//     const [ data, setData ] = useState([]);
//     // const [ loading, setLoading ] = useState(true);

//     useEffect(() => {
//         const apiUrl = "http://127.0.0.1:8000/list/users"

//         axios.get(apiUrl).then(response => {
//             setData(response.data);
//             // setLoading(false)
//         }).catch(error => {
//             console.error('Error al obtener los datos: ', error);
//             // setLoading(false);
//         })
//     }, [])

//     return (
//         <div>
//             <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
//                 <div className="overflow-x-auto">
//                     <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
//                         <thead className="ltr:text-left rtl:text-right">
//                             <tr>
//                                 <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
//                                 Name
//                                 </th>
//                                 <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
//                                 Last_name
//                                 </th>
//                                 <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
//                                 Sex
//                                 </th>
//                                 <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
//                                 Role
//                                 </th>
//                                 <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
//                                 email
//                                 </th>
//                             </tr>
//                         </thead>

//                         <tbody className="divide-y divide-gray-200">
//                             {data.length > 0 ? (
//                                 data.map(item => (
//                                     <tr key={item.id}>
//                                         <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900" >
//                                         {item.name}
//                                         </td>
//                                         <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.last_name}</td>
//                                         <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.sex}</td>
//                                         <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.role}</td>
//                                         <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.email}</td>
//                                     </tr>
//                             ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan="5">Cargando...</td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     )
// }

const UsersList = () => {
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
                            ID
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            NOMBRE
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            APELLIDO
                        </th>
                    </tr>
                </thead>

                <tbody className='divide-y divide-gray-200'>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td style={{ minWidth: '100px', padding: '8px', textAlign: 'center' }}>{user.id}</td>
                            <td style={{ minWidth: '100px', padding: '8px', textAlign: 'center' }}>{user.name}</td>
                            <td style={{ minWidth: '100px', padding: '8px', textAlign: 'center' }}>{user.last_name}</td>
                            {/* Agrega más celdas según tus datos */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersList