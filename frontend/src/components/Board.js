import React, { useState, useEffect, useRef } from "react";

const API = process.env.REACT_APP_API;

export function Board() {
    
    const [pollName, setPollName] = useState("");
    const [targetPublic, setTargetPublic] = useState("");
    const [questions, setQuestions] = useState("");
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

    const answerPoll = async (id) => {
        
    };

    useEffect(() => {
        getPolls();
    }, []);

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
                                    <button
                                        className="btn btn-primary btn-sm btn-block"
                                        onClick={(e) => answerPoll(poll._id)}
                                    >
                                        Answer
                                    </button>
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
