import { useState } from "react"

function UseresEdit({ user, onUpdate }){

    const [ userEdit, setUserEdit ] = useState({
        name: user.name,
        last_name: user.last_name,
        sex: user.sex,
        role: user.role,
        email: user.email,
        password: user.password,
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formDataObject = new FormData();
        formDataObject.append('name', formData.name);
        formDataObject.append('last_name', formData.last_name);
        formDataObject.append('sex', formData.sex);
        formDataObject.append('role', formData.role);
        formDataObject.append('email', formData.email);
        formDataObject.append('password', formData.password);

        fetch("http://127.0.0.1:8000/update/user/${user.id}", {
            method: 'PUT', // O el método HTTP adecuado para actualizar datos
            body: formDataObject,
          })
            .then((response) => {
              if (response.ok) {
                // Actualización exitosa, puedes realizar acciones adicionales aquí si es necesario.
                // Por ejemplo, cerrar el formulario de edición.
                onUpdate(formData);
              } else {
                // Manejo de errores si la actualización no fue exitosa.
                console.error('Error al actualizar el usuario.');
              }
            })
            .catch((error) => {
              console.error('Error en la solicitud de actualización:', error);
            });
    };

    return (
        <div>
            
        </div>
    )
}

export default UseresEdit