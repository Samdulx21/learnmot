import { useState } from 'react'
import axios from 'axios'

function UsersCreate(){
    const [formData, setFormData] = useState({
        name: '',
        last_name: '',
        sex: '',
        email: '',
        user_pass: '',
    });
    const typeGeners = [
        {
            name: "male"
        },
        {
            name: "female"
        }
    ]
    
    const handleSubmit = async () => {
        try {
        const response = await axios.post('http://127.0.0.1:8000/insert/user', formData, {
            headers: {
            'Content-Type': 'application/json',
            },
        });
    
        if (response.status === 200) {
            alert('Usuario creado exitosamente: ' + response.data.info);
    
            setFormData({
            name: '',
            last_name: '',
            sex: '',
            email: '',
            user_pass: '',
            });
        } else {
            alert('Error: ' + response.data.error);
        }
        } catch (error) {
        console.error('Error:', error);
        alert('Ocurrió un error al enviar la solicitud.');
        }
    };
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    return (
        <section className="bg-gray-100">
            <div className="">
                <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                    <form onSubmit={handleSubmit} action="" className="space-y-4">                
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="sr-only" htmlFor="name">Nombre</label>
                                <input
                                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                    placeholder="Nombre"
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange} 
                                    required
                                />
                            </div>

                            <div>
                                <label className="sr-only" htmlFor="last_name">Apellido</label>
                                <input
                                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                    placeholder="Apellido"
                                    type="text"
                                    id="last_name"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleInputChange} 
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="sr-only" htmlFor="sex">Sexo</label>
                                <select
                                    className="w-full rounded-lg border-gray-200 p-3"
                                    id="sex"
                                    name="sex"
                                    options={formData.sex}
                                    onChange={handleInputChange} 
                                    required
                                >
                                     <option value="" className='text-sm text-slate-100'>
                                        Selecciona el Sexo
                                    </option>
                                    {typeGeners.map((typeGener, index) => (
                                        <option key={index} value={typeGener.name}>
                                            {typeGener.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="sr-only" htmlFor="email"></label>
                                <input
                                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                    placeholder="Email"
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange} 
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="sr-only" htmlFor="user_pass">Password</label>
                                <input
                                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                    placeholder="Contraseña"
                                    type="text"
                                    id="user_pass"
                                    name="user_pass"
                                    value={formData.user_pass}
                                    onChange={handleInputChange} 
                                    required
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <button
                                type="submit"
                                className="inline-block w-full rounded-lg bg-teal-600 px-5 py-3 font-medium text-white sm:w-auto"
                            >
                                Send Enquiry
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </section>
    );
};

export default UsersCreate