import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UsersEdit(){
    
    const navigate =  useNavigate();
    const storedUserData = localStorage.getItem("useredit");
    
    // Intenta analizar la cadena JSON, o establece un objeto vacío si no es válido
    const dataUser = (() => {
        try {
            return JSON.parse(storedUserData) || {};
        } catch (error) {
            console.error("Error al analizar el valor almacenado localmente:", error);
            return {};
        }
    })();
    
    // Asegúrate de que dataUser.id sea un valor numérico o establecerlo en un valor predeterminado
    const userId = Number.isInteger(dataUser.id) ? dataUser.id : parseInt(dataUser.id);
    const [formData, setFormData] = useState({
        name: dataUser.name || "",
        last_name: dataUser.last_name || "",
        role: dataUser.role || 0,
        sex: dataUser.sex || "",
        email: dataUser.email || "",
    });
    const typeGeners = [
        {
            name: "male"
        },
        {
            name: "female"
        }
    ]

    const typeRole = [
        {
            role_id: 1,
            role: "Admin Role"
        },
        {
            role_id: 2, 
            role: "Teacher Role"
        },
        {
            role_id: 3,
            role: "Student Role"
        }
    ]
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'role') {
            const selectedRole = typeRole.find(role => role.role === value);
    
            // Si se encuentra un valor correspondiente, establece formData.role con el role_id
            // De lo contrario, mantén el valor original del campo
            setFormData((prevData) => ({
                ...prevData,
                [name]: selectedRole ? selectedRole.role_id : value
            }), () => {
                // Después de actualizar el estado, actualiza el localStorage
                localStorage.setItem("useredit", JSON.stringify({
                    ...dataUser,
                    [name]: selectedRole ? selectedRole.role_id : value
                }));
            });
        } else {
            // Para otros campos, simplemente actualiza el valor
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }), () => {
                // Después de actualizar el estado, actualiza el localStorage
                localStorage.setItem("useredit", JSON.stringify({
                    ...dataUser,
                    [name]: value
                }));
            });
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Comprueba si dataUser.id es un valor numérico antes de realizar la solicitud
        if (!Number.isInteger(userId)) {
            console.error("Error: dataUser.id no es un valor numérico válido");
            return;
        }

        try {
            const response = await axios.put(`http://127.0.0.1:8000/update/user/${userId}/${formData.role}`, formData);

            console.log("Actualización exitosa", response.data);
            navigate("/check/users");
        } catch (error) {
            console.error("Error al actualizar", error);
        }
    };

    return (
        <div>
        <section className="">
            <div className="items-center px-5 py-12 lg:px-20">
            <div className="flex flex-col w-full max-w-md p-10 mx-auto my-6 transition duration-500 ease-in-out transform bg-white rounded-lg md:mt-0">
                <div className="mt-2">
                <div className="mt-6">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-neutral-600">
                            Name
                            </label>
                            <div className="mt-1">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                placeholder="Your name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-300"
                            />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="last_name" className="block text-sm font-medium text-neutral-600">
                            Last name
                            </label>
                            <div className="mt-1">
                            <input
                                id="last_name"
                                name="last_name"
                                type="text"
                                autoComplete="Last_name"
                                required
                                value={formData.last_name}
                                onChange={handleInputChange}
                                placeholder="Your last name"
                                className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-300"
                            />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-neutral-600">
                                Role
                            </label>

                            <select
                                name="role"
                                id="role"
                                value={formData.role}
                                onChange={handleInputChange}
                                className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-300"
                            >   
                                <option value="">
                                    Selecciona el role
                                </option>
                                {typeRole.map((role, index) => (
                                    <option key={index} value={role.role_id}>
                                        {role.role}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="sex" className="block text-sm font-medium text-neutral-600">
                                Sex
                            </label>

                            <select
                                name="sex"
                                id="sex"
                                value={formData.sex}
                                onChange={handleInputChange}
                                className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-300"
                            >   
                                <option value="">
                                    Selecciona el sexo
                                </option>
                                {typeGeners.map((typeGener, index) => (
                                    <option key={index} value={typeGener.name}>
                                        {typeGener.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-neutral-600">
                            Email address
                            </label>
                            <div className="mt-1">
                            <input
                                id="email"
                                name="email"
                                type="text"
                                autoComplete="email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Your Email"
                                className="block w-full px-5 py-3 text-base text-neutral-600 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-50 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-300"
                            />
                            </div>
                        </div>

                        <div>
                            <button
                            type="submit"
                            className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-teal-600 rounded-xl hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                            actualizar
                            </button>
                        </div>
                    </form>
                </div>
                </div>
            </div>
            </div>
        </section>
    </div>
    );
    
}

export default UsersEdit
