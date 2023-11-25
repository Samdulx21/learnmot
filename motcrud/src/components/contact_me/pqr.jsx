import { useState, useEffect } from 'react'
import axios from 'axios'

function TablePqr() {

    const [formData, setFormData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/list/pqr`);
                const data = response.data;
                setFormData(data.result);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return(
        <div>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Numero de Identificacion
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Telefono
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 col-span-3">
                            Descripcion
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            </th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            </th>
                        </tr>
                    </thead>

                    <tbody className='divide-y divide-gray-200'>
                        {formData.map((res, index) => (
                            <tr key={index}>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900" >{res.num_id}</td>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900" >{res.phone}</td>
                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900" >{res.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TablePqr