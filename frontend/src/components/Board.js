import React, { useState, useEffect, useRef, useReducer } from "react";
import {Answers} from "./Answers"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
  } from "react-router-dom";

const API = process.env.REACT_APP_API;

export function Board() {
    
    const [pollName, setPollName] = useState("");
    const [targetPublic, setTargetPublic] = useState("");
    const [questions, setQuestions] = useState("");
    const [finishDate, setFinishDate] = useState("");
    const [currentPoll, setCurrentPoll] = useState("");
    const [editing, setEditing] = useState(false);
    const [answering, setAnswering] = useState(false);

    const [id, setId] = useState("");
    

    const nameInput = useRef(null);

    let [polls, setPolls] = useState([]);


    const getPolls = async () => {
        const res = await fetch(`${API}/board`);
        const data = await res.json();
        setPolls(data);
    };
    

    useEffect(() => {
        getPolls();
    }, []);

    const answerPoll = async (id) => {
        setCurrentPoll(id);
        setAnswering(true);

    };

    return (
        <div className="row">           
            <div className="col-md-12">
            <h3>Encuestas abiertas: </h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Público</th>
                            <th>Preguntas</th>
                            <th>Fecha de Fin</th>
                            <th>Operaciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {polls.map((poll) => (
                            <tr key={poll._id}>
                                <td>{poll.pollName}</td>
                                <td>{poll.targetPublic}</td>
                                <td>{poll.questions}</td>
                                <td>{poll.finishDate}</td>
                                <td>                                  
                                    <a href={'/Answers/'+poll._id}>Answer</a> 
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    
                </table>
            </div>
        </div>
    );
}

  