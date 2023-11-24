import { useEffect, useState } from "react";
import axios from "axios";


function AcademicLoadList(){

    const [formData, setFormData] = useState([]);
    const dataUser = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
      const fetchData = async () => {
          try {
            const response = await axios.get(`http://127.0.0.1:8000/topic/academicload/${dataUser.id}`);
            const data = response.data;
            setFormData(data.result);

          } catch (error) {
              console.error('Error fetching data:', error);
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
                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            Accion
                        </th>
                    </tr>
                </thead>

                <tbody className='divide-y divide-gray-200'>
                    {formData.map((res, index) => (
                        <tr key={index}>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900" >{res.name}</td>
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