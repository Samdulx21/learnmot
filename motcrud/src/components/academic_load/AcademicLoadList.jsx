import { useEffect, useState } from "react";

function AcademicLoadList(){

    const [formData, setFormData] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/list/academicload')  // La URL de la API
            .then(response => response.json())
            .then(data => setFormData(data.result));
    }, []);

    return (
        <div>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="ltr:text-left rtl:text-right">
                    <tr>
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
                    </tr>
                </thead>

                <tbody className='divide-y divide-gray-200'>
                    {formData.map(res => (
                        <tr key={res.id}>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900" >{res.topic}</td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900" >{res.description}</td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900" >{res.since_date}</td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900" >{res.until_date}</td>
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
        </div>
    )
}

export default AcademicLoadList