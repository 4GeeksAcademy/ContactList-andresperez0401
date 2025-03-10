import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/ContactForm.css";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

const ContactForm = () => {
  //Estado de los valores del formulario
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  //Capturamos el id del contacto a editar
  const { idContacto } = useParams();

  //Manejo del contexto de la app
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (idContacto) {
      //Buscamos el contacto a editar
      let contacto = store.contacts.find(
        //Transformamos el idContacto ya que es un string y se almacena como int
        (contacto) => contacto.id === Number(idContacto)
      );

      if (contacto) {
        setFormData({
          name: contacto.name,
          phone: contacto.phone,
          email: contacto.email,
          address: contacto.address,
        });
      }
    }
  }, [idContacto]);

  //-----------------------------------------------------------------------------------------------------------------------
  //Funcion para manejar cuando le da al boton save

  const handleSubmit = async (e) => {
    //Evita que el formulario recargue la pagina
    e.preventDefault();

    if (!idContacto) {
      let contactoCreado = crearContacto();

      if (!contactoCreado) {
        alert("Error al crear el contacto");
      } else {
        alert("Contacto creado con éxito");
      }
    } else {
      let contactoEditado = editarContacto();

      if (!contactoEditado) {
        alert("Error al editar el contacto");
      } else {
        alert("Contacto editado con éxito");
      }
    }
    // Redirecciona a la pagina principal
    window.location.href = "/";
  };

  //Culmina la función para manejar el botón save
  //-----------------------------------------------------------------------------------------------------------------------

  //-----------------------------------------------------------------------------------------------------------------------
  //Funcion para crear un contacto

  const crearContacto = async () => {
    // Lógica para guardar el contacto
    let usuarioCreado = await actions.addContact(formData);

    if (!usuarioCreado) {
      return false;
    } else {
      return true;
    }
  };

  //Culmina la función para crear un contacto
  //-----------------------------------------------------------------------------------------------------------------------

  //-----------------------------------------------------------------------------------------------------------------------
  //Funcion para editar un contacto

  const editarContacto = async () => {
    // Lógica para editar el contacto
    let contactoEditado = await actions.editContact(idContacto, formData);

    if (!contactoEditado) {
      return false;
    } else {
      return true;
    }
  };

  //Culmina la función para editar un contacto
  //----------------------------------------------------------------------------------------------------------------

  //-----------------------------------------------------------------------------------------------------------------------
  //Funcion que actualizar cuando se edita algun input

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //Culmina la función
  //-----------------------------------------------------------------------------------------------------------------------

  return (
    <div className="form-container">
      <h1> {idContacto ? "Editar Contacto" : "Agregar Contacto "}</h1>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Full Name"
            className="form-input"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter email"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter phone"
            className="form-input"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Enter address"
            className="form-input"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-save">
            Save
          </button>
          <Link to="/" className="btn-cancel">
            Back
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
