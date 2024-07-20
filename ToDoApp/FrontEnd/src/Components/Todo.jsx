import "../Styles/Todo.scss";

export function Todo({ todos }) {
    return <div>
        {todos.map((todo) => {
            return <div key={todo._id} className="display_div">
                <h1>{todo.title}</h1>
                <button onClick={() => {
                    fetch(`http://localhost:3000/${todo._id}`, {
                        method: "PUT",
                        body: JSON.stringify({
                            "completed": todo.completed
                        }),
                        headers: { "Content-Type": "application/json" }
                    })
                        .then(async (res) => {
                            await res.json();
                        })
                }}>{(todo.completed == true) ? "✓" : "Mark as done"}</button>
                <button onClick={() => {
                    fetch(`http://localhost:3000/${todo._id}`, {
                        method: "DELETE",
                    })
                }}>delete</button>
            </div>
        })}
    </div>
}