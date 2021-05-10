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

  const [id, setId] = useState("");
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
          await res.json();
          const data = await res.json();
          console.log(data);
          setId("");
        setName("");
        setEmail("");
        setRating("");
        setOpinion("");
  
          nameInput.current.focus();
      };


    return (
        <div className="row">
            <div className="col-md-5">
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
                            <option value={rating}>1</option>
                            <option value={rating}>2</option>
                            <option value={rating}>3</option>
                            <option value={rating}>4</option>
                            <option value={rating}>5</option>
                            <option value={rating}>6</option>
                        </select>
                    </div>
                <h8>Pon tus opiniones</h8>
                    <div className="form-group">
                        <input
                            type="textArea" 
                            value= {opinions}
                            rows= {5}
                            style= {{ minHeight:100, resize: "none" }}
                            onChange={(e) => setOpinions(e.target.value)}
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