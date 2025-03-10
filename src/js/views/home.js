import React, { useContext } from "react";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { Card } from "../component/Card.jsx";
import { Context } from "../store/appContext";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="home">
      <div className="head-container">
        <Link to="/addContact">
          <button className="btn btn-success">Add new contact</button>
        </Link>
      </div>
      <div className="card-container">
        {store.contacts.map((contacto, index) => (
          <Card key={index} contacto={contacto} />
        ))}
      </div>
    </div>
  );
};
