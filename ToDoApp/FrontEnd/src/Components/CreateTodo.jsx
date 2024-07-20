import { useState } from "react"
import "../Styles/CreateTodo.scss"

export function CreateTodo() {
    const [title, setTitle] = useState("");
    return <div className="input_fields">
        <input type="text" placeholder="Enter title..." onChange={(e) => { setTitle(e.target.value) }} />
        <button onClick={function () {
            fetch("http://localhost:3000/", {
                method: "POST",
                body: JSON.stringify({
                    title: title,
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(async (res) => {
                    if (!res.ok) {
                        throw new Error("Failed to create todo");
                    }
                    await res.json();
                    // alert("Todo added");
                })
                .catch((error) => {
                    setError("Error adding todo. Please try again.");
                });
        }}>Create App</button>
    </div>
}