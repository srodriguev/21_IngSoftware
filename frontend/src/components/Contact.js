import React, { useState, useEffect, useRef } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
  } from "react-router-dom";

const API = process.env.REACT_APP_API;

export function Contact() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState("");
  const [opinion, setOpinion] = useState("");

  const nameInput = useRef(null);
  let [opinions, setOpinions] = useState([]);

    const handleSubmit = async (e) => {
      e.preventDefault();
          const res = await fetch(`${API}/Contact`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  name,
                  email,
                  rating,
                  opinion,
              }),
            });
          const data = await res.json();
          console.log(data);
        
        setName("");
        setEmail("");
        setRating("");
        setOpinion("");
  
          nameInput.current.focus();
      };


    return (
        <div className="row">
            <div className="col-md-12">
                <h2>Contáctanos llenando esta forma:</h2>
                <form onSubmit={handleSubmit} className="card card-body">
                <h8>Nombre de quien opina</h8>
                    <div className="form-group">
                        <input
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            className="form-control"
                            placeholder="Name"
                            ref={nameInput}
                            autoFocus />
                    </div>
                <h8>Email de quien opina</h8>
                    <div className="form-group">
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className="form-control"
                            placeholder="email" />
                    </div>
                <h8>Rating de quien opina</h8>
                    <div className="form-group">
                        <select 
                            onChange={(e) => setRating(e.target.value)}
                            className="form-control">
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                    </div>
                <h8>Pon tus opiniones</h8>
                    <div className="form-group">
                        <input
                            type="text" 
                            style= {{ minHeight:100, resize: "none" }}
                            onChange={(e) => setOpinion(e.target.value)}
                            value= {opinion}
                            className="form-control"
                            placeholder="Opinions" />
                    </div> 

                    <button className="btn btn-primary btn-block">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
  
};