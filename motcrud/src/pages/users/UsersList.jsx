import { useEffect, useState } from "react";
import axios from "axios";

function UsersList() {

    const [users, setUsers] = useState([]);
    useEffect(() => {
        const getUsers = async () => {
            const url = await axios.get("http://127.0.0.1:8000/list/users");
            const res = url;
            setUsers(res.data.res);
        };
        getUsers();
    }, []);

    console.log(users);

    return (
        <div>
            <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                        <thead className="ltr:text-left rtl:text-right">
                            <tr>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Name
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Last_name
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Sex
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                Role
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                email
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {users.map((item) => {
                                return (
                                    <tr key={item.id}>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                        {item.name}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.last_name}</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.sex}</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.role}</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.email}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default UsersList