import { useEffect, useState } from "react";
import axios from "axios";

function TableTeachers() {

        const [formData, setFormData] = useState([]);
        const dataUser = JSON.parse(localStorage.getItem("user"));
        const userStatus = [
        {
            status: 1
        },
        {
            status: 0
        }
        ];
        const [isChecked, setIsChecked] = useState(false);
        const handleToggle = async () => {
            try {
            // Actualiza el estado en la base de datos
            await axios.put(`http://127.0.0.1:8000/update/status/${dataUser.id}?status=${isChecked ? 0 : 1}`);
        
            // Actualiza el estado local
            setIsChecked(!isChecked);
            } catch (error) {
            console.error("Error updating status:", error);
            }
        };

        useEffect(() => {
        const fetchData = async () => {
            try {
            // /table/teachers/{id}/{status}
            const response = await axios.get(
                `http://127.0.0.1:8000/table/teachers/${dataUser.id}/${userStatus[0].status}`
            );
            const data = response.data;
            setFormData(data.result);

            setIsChecked(data.result[0]?.status === 1);
            } catch (error) {
            console.error("Error fetching data:", error);
            }
        };
        fetchData();
        }, []);
    
        return (
            <div>
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                    <tr>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Nombre del profesor
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Materia
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Descripcion
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Fecha de inicio
                        </th>
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Expira
                        </th>
                        <th
                        className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 "
                        colSpan={2}
                        >
                        Tutoria
                        </th>
                    </tr>
                    </thead>
        
                    <tbody className="divide-y divide-gray-200">
                    {formData.map((res, index) => (
                        <tr key={index}>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                {res.name}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                {res.toppic}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                {res.description}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                {res.since_date}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                {res.until_date}
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            <label
                                htmlFor="status"
                                className="relative h-8 w-14 cursor-pointer flex items-center"
                                >
                                <input
                                    type="checkbox"
                                    id="status"
                                    checked={isChecked}
                                    onChange={handleToggle}
                                    className="peer sr-only [&:checked_+_span_svg[data-checked-icon]]:block [&:checked_+_span_svg[data-unchecked-icon]]:hidden"
                                />

                                <span
                                    className="absolute inset-y-0 start-0 z-10 m-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-gray-400 transition-all peer-checked:start-6 peer-checked:text-green-600"
                                >
                                    <svg
                                    data-unchecked-icon
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-4 w-4 ${isChecked ? 'hidden' : ''}`}
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                    </svg>

                                    <svg
                                    data-checked-icon
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-4 w-4 ${isChecked ? '' : 'hidden'}`}
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                    </svg>
                                </span>

                                <span
                                    className="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-green-500"
                                ></span>
                            </label>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
                
            </div>
        );
    }

export default TableTeachers

