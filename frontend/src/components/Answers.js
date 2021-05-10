import React, { useState, useEffect, useRef } from "react";

const API = process.env.REACT_APP_API;

export function Answers(props) {

    const [pollID, setPollID] = useState("");
    const [contestantName, setContestantName] = useState("");
    const [pollAnswers, setPollAnswers] = useState("");
    const [answerDate, setAnswerDate] = useState("");
    const [notes, setNotes] = useState("");
    
    const [editing, setEditing] = useState(false);
    const [id, setId] = useState("");

    const [poll,setPoll]=useState({});

    const nameInput = useRef(null);

    let [answer, setAnswer] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setPollID(poll._id);

        if (!editing) {
            const res = await fetch(`${API}/answers`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    pollID,
                    contestantName,
                    pollAnswers,
                    answerDate,
                    notes,
                }),
            });
            await res.json();
        } else {
            const res = await fetch(`${API}/answers/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    pollID,
                    contestantName,
                    pollAnswers,
                    answerDate,
                    notes,
                }),
            });
            const data = await res.json();
            console.log(data);
            setEditing(false);
            setId("");
        }
        // await getPolls();

        setContestantName("");
        setPollAnswers("");
        setAnswerDate("");
        setNotes("");

        nameInput.current.focus();
    };


    useEffect(() => {
        // fetch("http://localhost:3000/board"+props.match.params._id)
        fetch(`${API}/board/${props.match.params._id}`, {
            method: "GET" , 
            headers: { 
                "Content-Type": "application/json"}})   
        .then(res => res.json())
        .then(
            (result) => {
                setPoll(result);
            }
        );
    });

    const getAnswers = async () => {
        const res = await fetch(`${API}/answers`);
        const data = await res.json();
        setAnswer(data);
    };

    const deleteAnswer = async (id) => {
        const userResponse = window.confirm("Are you sure you want to delete it?");
        if (userResponse) {
            const res = await fetch(`${API}/answers/${id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            console.log(data);
            await getAnswers();
        }
    };

    const editAnswer = async (id) => {
        const res = await fetch(`${API}/answers/${id}`);
        const data = await res.json();

        setEditing(true);
        setId(id);

        // Reset
        setContestantName(data.contestantName);
        setPollAnswers(data.targetPublic);
        setAnswerDate(data.answerDate);
        setNotes(data.Notes);

        nameInput.current.focus();
    };


    return (
        
        <div className="row">           
            <div className="col-md-12">
            <h3>Encuesta a contestar: </h3>
            <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID Encuesta</th>
                            <th>Título</th>
                            <th>Público Objetivo</th>
                            <th>Preguntas </th>
                            <th>Fecha Final</th>
                        </tr>
                    </thead>
                    <tbody>
                            <tr>
                                <th>{poll._id}</th>
                                <td>{poll.pollName}</td>
                                <td>{poll.targetPublic}</td>
                                <td>{poll.questions}</td>
                                <td>{poll.finishDate}</td>
                            </tr>
                    </tbody>
                </table>

                <h3>Respuestas a inscribir: </h3>
                <form onSubmit={handleSubmit} className="card card-body">
                    <h8>Nombre de quien contesta</h8>
                    <div className="form-group">
                        <input
                        type="text"
                        onChange={(e) => setContestantName(e.target.value)}
                        value={contestantName}
                        className="form-control"
                        placeholder="Contestant's Name"
                        ref={nameInput}
                        autoFocus
                        />
                    </div>
                    <h8>Respuestas a guardar:</h8>
                    <div className="form-group">
                        <input
                        type="textArea"
                        onChange={(e) => setPollAnswers(e.target.value)}
                        style= {{ minHeight:100, resize: "none" }}
                        value={pollAnswers}
                        className="form-control"
                        placeholder="Answers to record"
                        />
                    </div>
                    <h8>Notas:</h8>
                    <div className="form-group">
                        <input
                        type="text"
                        onChange={(e) => setNotes(e.target.value)}
                        value={notes}
                        className="form-control"
                        placeholder="Any additional notes"
                        />
                    </div>
                    <button className="btn btn-primary btn-block" onClick={(e) => handleSubmit(e)}>
                        {editing ? "Update" : "Create"}
                    </button>
                </form>
            </div>
        </div>
    );
}
