import React, { useState } from "react";
import AndresImage from "../../img/Andres.jpeg";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router";

export const Card = ({ contacto }) => {
  //Manejo del contexto de la app
  const { store, actions } = useContext(Context);

  //Para navegar entre páginas
  const navigate = useNavigate();

  //Estado para manejar la visibilidad del modal de bootstrap
  const [show, setShow] = useState(false);

  //Cierra el modal
  const handleClose = () => setShow(false);

  //Abrir el modal
  const handleShow = () => setShow(true);

  //Manejo para eliminar un contacto de la lista
  const handleDelete = async () => {
    let response = await actions.deleteContact(contacto.id);

    if (response) {
      console.log("Contacto eliminado con éxito");
    } else {
      console.log("Error al eliminar el contacto");
    }

    //Cierra el modal cuando hace la accion del contacto
    setShow(false);
  };

  return (
    <div className="card">
      <div className="card-img">
        <img src={AndresImage} alt="contacto" />
      </div>
      {/* Empieza el cuerpo de la carta */}
      <div className="card-body">
        <h3 style={{ color: "black" }}>{contacto.name}</h3>
        <i className="fa-solid fa-location-dot">
          <span> {contacto.address} </span>
        </i>
        <i className="fa-solid fa-phone">
          <span> {contacto.phone} </span>
        </i>
        <i className="fa-solid fa-envelope">
          <span> {contacto.email} </span>
        </i>
      </div>
      {/* Termina el cuerpo de la carta */}
      <div className="card-action-buttons">
        <button
          className="boton-carta"
          onClick={() => navigate(`/editContact/${contacto.id}`)}
        >
          <i className="fa-solid fa-pen"></i>
        </button>
        <button className="boton-carta" onClick={handleShow}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>{" "}
      {/* Div de card Body */}
      {/* Modal de Bootstrap */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar el contacto {contacto.name}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div> // Div de card
  );
};

export default Card;
