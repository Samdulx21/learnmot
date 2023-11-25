import { useState } from 'react'
import HeaderHome from "../navbar/HeaderHome"
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Contact(){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        num_id: 0,
        phone: 0,
        description: '',
    });
    
    const handleSubmit = async () => {
        try {
        const response = await axios.post('http://127.0.0.1:8000/insert/pqr', formData, {
            headers: {
            'Content-Type': 'application/json',
            },
        });
    
        if (response.status === 200) {
    
            setFormData({
                num_id: 0,
                phone: 0,
                description: '',
            });
            navigate("/")
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
        <div>
            <div>
                <HeaderHome />
            </div>
            <section className="text-gray-600 body-font relative">
                <div className="absolute inset-0 bg-gray-300">
                    <iframe
                    title="map"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    marginHeight="0"
                    marginWidth="0"
                    scrolling="no"
                    src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=Colombia&amp;ie=UTF8&amp;t=&amp;z=6&amp;iwloc=B&amp;output=embed"
                    style={{ filter: 'grayscale(1) contrast(1.2) opacity(0.4)' }}
                    ></iframe>
                </div>
                <form onSubmit={handleSubmit} action="" className="container px-5 py-24 mx-auto flex" >
                    <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
                    <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Contactenos</h2>
                    <p className="leading-relaxed mb-5 text-gray-600">
                        ¡Hola! Para nosotros es un gusto poder atender cualquier inquietud que tengas, por favor escribanos...
                    </p>
                    <div className="relative mb-4">
                        <label htmlFor="num_id" className="leading-7 text-sm text-gray-600">
                        Numero de identificacion
                        </label>
                        <input
                        type="text"
                        id="num_id"
                        name="num_id"
                        value={formData.num_id}
                        onChange={handleInputChange}
                        className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                     </div>   
                    <div className="relative mb-4">
                        <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
                        Numero de telefono
                        </label>
                        <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="description" className="leading-7 text-sm text-gray-600">
                        Message
                        </label>
                        <textarea
                        id="message"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                        ></textarea>
                    </div>
                    <button 
                    type='submit'
                    className="text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg">
                        Submit
                    </button>
                    <p className="text-xs text-gray-500 mt-3">
                        Gracias.
                    </p>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default Contact


