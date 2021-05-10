import React, { useState, useEffect, useRef } from "react";

const API = process.env.REACT_APP_API;

export function Polls() {
    
    const [pollName, setPollName] = useState("");
    const [targetPublic, setTargetPublic] = useState("");
    const [questions, setQuestions] = useState([]);
    const [numberQuestions, setNumberQuestions] = useState("");
    const [finishDate, setFinishDate] = useState("");
    

    const [editing, setEditing] = useState(false);
    const [id, setId] = useState("");

    const nameInput = useRef(null);

    let [polls, setPolls] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!editing) {
            const res = await fetch(`${API}/board`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    pollName,
                    targetPublic,
                    questions,
                    finishDate,
                    
                }),
            });
            await res.json();
        } else {
            const res = await fetch(`${API}/board/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    pollName,
                    targetPublic,
                    questions,
                    finishDate,
                    
                }),
            });
            const data = await res.json();
            console.log(data);
            setEditing(false);
            setId("");
        }
        await getPolls();

        setPollName("");
        setTargetPublic("");
        setQuestions("");
        setFinishDate("");

        nameInput.current.focus();
    };

    const getPolls = async () => {
        const res = await fetch(`${API}/board`);
        const data = await res.json();
        setPolls(data);
    };

    const deletePoll = async (id) => {
        const userResponse = window.confirm("Are you sure you want to delete it?");
        if (userResponse) {
            const res = await fetch(`${API}/board/${id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            console.log(data);
            await getPolls();
        }
    };

    const editPoll = async (id) => {
        const res = await fetch(`${API}/board/${id}`);
        const data = await res.json();

        setEditing(true);
        setId(id);

        // Reset
        setPollName(data.pollName);
        setTargetPublic(data.targetPublic);
        setQuestions(data.questions);
        setFinishDate(data.finishDate);

        nameInput.current.focus();
    };


    useEffect(() => {
        getPolls();
    }, []);

    return (
        <div className="row">
            <div className="col-md-5">
                <form onSubmit={handleSubmit} className="card card-body">
                <h8>Pon el título de tu Encuesta</h8>
                    <div className="form-group">
                        <input
                            type="text"
                            onChange={(e) => setPollName(e.target.value)}
                            value={pollName}
                            className="form-control"
                            placeholder="Poll's Name"
                            ref={nameInput}
                            autoFocus />
                    </div>
                <h8>Especifica el público al que va dirigido</h8>
                    <div className="form-group">
                        <input
                            type="text"
                            onChange={(e) => setTargetPublic(e.target.value)}
                            value={targetPublic}
                            className="form-control"
                            placeholder="Intended Public" />
                    </div>
                <h8>Número de preguntas</h8>
                    <div className="form-group">
                        <select 
                            onChange={(e) => setNumberQuestions(e.target.value)}
                            className="form-control">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                        </select>
                    </div>
                <h8>Pon las preguntas aquí</h8>
                    <div className="form-group">
                        <input
                            type="textArea" 
                            value= {questions}
                            rows= {5}
                            style= {{ minHeight:100, resize: "none" }}
                            onChange={(e) => setQuestions(e.target.value)}
                            className="form-control"
                            placeholder="Questions" />
                    </div>
                    <h8>Pon la fecha límite del cuestionario</h8>
                    <div className="form-group">
                        <input
                            label ="Finish Date"
                            text = "Finish Date of Poll"
                            type="Date"
                            onChange={(e) => setFinishDate(e.target.value)}
                            value={finishDate}
                            className="form-control"
                            placeholder="finish Date" />
                    </div>

                    <button className="btn btn-primary btn-block">
                        {editing ? "Update" : "Create"}
                    </button>
                </form>
            </div>
            
            <div className="col-md-6">
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
                                    <button
                                        className="btn btn-secondary btn-sm btn-block"
                                        onClick={(e) => editPoll(poll._id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm btn-block"
                                        onClick={(e) => deletePoll(poll._id)}
                                    >
                                        Delete
                                    </button>  
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
