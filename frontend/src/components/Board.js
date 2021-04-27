import React, { useState, useEffect, useRef } from "react";

const API = process.env.REACT_APP_API;

export function Board() {
    const [name, setName] = useState("");
    const [timeLeft, setTimeLeft] = useState("");
    const [questions, setQuestions] = useState("");

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
                    name,
                    timeLeft,
                    questions,
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
                    name,
                    timeLeft,
                    questions,
                }),
            });
            const data = await res.json();
            console.log(data);
            setEditing(false);
            setId("");
        }
        await getPolls();

        setName("");
        setTimeLeft("");
        setQuestions("");
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
        setName(data.name);
        setTimeLeft(data.timeLeft);
        setQuestions(data.questions);
        nameInput.current.focus();
    };

    useEffect(() => {
        getPolls();
    }, []);

    return (
        <div className="row">
            <div className="col-md-4">
                <form onSubmit={handleSubmit} className="card card-body">
                    <div className="form-group">
                        <input
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            className="form-control"
                            placeholder="Poll's Name"
                            ref={nameInput}
                            autoFocus />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            onChange={(e) => setTimeLeft(e.target.value)}
                            value={timeLeft}
                            className="form-control"
                            placeholder="Weeks Until Closed" />
                    </div>
                    <div className="form-group">
                        <input
                            type="textarea"
                            rows={3}
                            onChange={(e) => setQuestions(e.target.value)}
                            value={questions}
                            className="form-control"
                            placeholder="Questions" />
                    </div>
                    <button className="btn btn-primary btn-block">
                        {editing ? "Update" : "Create"}
                    </button>
                </form>
            </div>
            <div className="col-md-6">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>timeLeft</th>
                            <th>questions</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {polls.map((poll) => (
                            <tr key={poll._id}>
                                <td>{poll.name}</td>
                                <td>{poll.timeLeft}</td>
                                <td>{poll.questions}</td>
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
