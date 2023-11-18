import { useState } from "react"

function UseresEdit({ user, onUpdate }){

    // const [ userEdit, setUserEdit ] = useState({
    //     name: user.name,
    //     last_name: user.last_name,
    //     sex: user.sex,
    //     role: user.role,
    //     email: user.email,
    //     password: user.password,
    // })

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({ ...formData, [name]: value });
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
        
    //     const formDataObject = new FormData();
    //     formDataObject.append('name', formData.name);
    //     formDataObject.append('last_name', formData.last_name);
    //     formDataObject.append('sex', formData.sex);
    //     formDataObject.append('role', formData.role);
    //     formDataObject.append('email', formData.email);
    //     formDataObject.append('password', formData.password);

    //     fetch("http://127.0.0.1:8000/update/user/${user.id}", {
    //         method: 'PUT', // O el método HTTP adecuado para actualizar datos
    //         body: formDataObject,
    //       })
    //         .then((response) => {
    //           if (response.ok) {
    //             // Actualización exitosa, puedes realizar acciones adicionales aquí si es necesario.
    //             // Por ejemplo, cerrar el formulario de edición.
    //             onUpdate(formData);
    //           } else {
    //             // Manejo de errores si la actualización no fue exitosa.
    //             console.error('Error al actualizar el usuario.');
    //           }
    //         })
    //         .catch((error) => {
    //           console.error('Error en la solicitud de actualización:', error);
    //         });
    // };

    return (
        <div className="overflow-x-auto mx-auto">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  #
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Nombre
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Apellido
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  Sexo
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  role
                </th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
        
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td
                className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                  1
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">Joe</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">Webb</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">Male</td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">Admin Role</td>
                <td className="whitespace-nowrap px-4 py-2">
                  <a
                    href="#"
                    className="inline-block rounded bg-teal-500 hover:bg-teal-600 px-4 py-2 text-xs font-medium text-white"
                  >
                    Change
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
      </div>
    )
}

export default UseresEdit