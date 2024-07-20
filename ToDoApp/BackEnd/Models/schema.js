const mongoose = require("mongoose");
const { date } = require("zod");

let todo = new mongoose.Schema({
    title: {type: String, required: true},
    completed: {type: Boolean, required: true},
    date: {type: Date, default: Date.now()}
});

const Todos = mongoose.model('todos', todo);
module.exports = Todos;