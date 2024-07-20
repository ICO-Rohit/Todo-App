//import express
const express = require("express");
//importing and simultanously config the dotenv 
const dotenv = require("dotenv").config();
const cors = require("cors");
//config express
const app = express();
const zod = require("zod");
const Todos = require('./Models/schema');
const mongoose = require("mongoose");

app.use(cors());
//connect mongoose to mongodb
mongoose.connect(process.env.MONGO_URL);
//express.json() middleware to use json in body
app.use(express.json());

const titleValidation = zod.string();

//Routes
app.get('/', async (req, res) => {
    try {
        const AllTodos = await Todos.find();
        res.header({ "Access-Control-Allow-Origin": "*" }).json(AllTodos);
        // console.log(JSON.parse(AllTodos));
    }
    catch (err) {
        res.header({ "Access-Control-Allow-Origin": "*" }).json({ message: "We are unable to get your data" });
    }
    // console.log("in end");
})

app.post('/', (req, res) => {
    // console.log('in post');
    if (req.body.title == "") res.json({ message: "fill todo" });
    const titleCheck = titleValidation.safeParse(req.body.title);
    if (titleCheck.success == false)
        res.header({ "Access-Control-Allow-Origin": "*" }).json({ message: "Put right credentials" });
    const title = titleCheck.data;

    const newPostTodo = new Todos({ title, completed: false });
    newPostTodo.save();
    res.header({ "Access-Control-Allow-Origin": "*" }).json({ message: "Todo added" });
})

app.put('/:id', async (req, res) => {
    // console.log("in put");
    let id_ = req.params.id;
    let completed = req.body.completed;

    try {
        let Todo = await Todos.updateOne({ _id: id_ }, { completed: !completed });
        res.json({ message: "todo is updated" });
    }
    catch (err) {
        res.json({ message: err });
    }
})

app.delete('/:id', async (req, res) => {
    // console.log("in delete");
    let id_ = req.params.id;
    try {
        await Todos.deleteOne({ _id: id_ });
        res.json({ message: "Todo deleted successfully" });
    }
    catch (err) {
        res.json({ message: "We are unable to delete todo" })
    }
})

app.listen(process.env.PORT, () => { console.log("server is working fine") });