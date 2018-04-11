// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.json());
// Require Mongoose
var mongoose = require('mongoose');
// This is how we connect to the mongodb database using mongoose -- "1955" is the name of
//   our db in mongodb -- this should match the name of the db you are going to use for your project.
mongoose.connect('mongodb://localhost/restful_task_api');
var TaskSchema = new mongoose.Schema({
    title: {type: String, required: [true, "Title is required!"]},
    description: {type: String, default: ""},
    completed: {type: Boolean, default: false},
    }, {timestamps: true});
mongoose.model('Task', TaskSchema);
var Task = mongoose.model('Task');
// Use native promises
mongoose.Promise = global.Promise;

app.get('/', function(req, res){
    Task.find({}, function(err, tasks){
        console.log(tasks);
        if(err){
            console.log("Returned error", err);
            // respond with JSON
            res.json({message: "Error", error: err});
        } else {
            // respond with JSON
            res.json({message: "Success", data: tasks});
        };
    });
});
app.get('/:id', function(req, res){
    Task.findOne({_id: req.params.id}, function(err, task){
        if(err){
            console.log("Returned error", err);
            // respond with JSON
            res.json({message: "Error", error: err});
        } else {
            // respond with JSON
            res.json({message: "Success", data: task});
        };
    });
});
app.post('/new', function(req, res){
    var task = new Task(req.body);
    console.log("new task", task);
    // Try to save that new eagle to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
    task.save(function(err) {
        // if there is an error console.log that something went wrong!
        if(err) {
            console.log('something went wrong with new person save');
            res.json({message: "Error", error: err});
        } else { // else console.log that we did well and then redirect to the root route
            console.log('successfully added a Task!');
            res.json({message: "Success", data: task});
        };
    });
});
app.put('/update/:id', function(req, res){
    var id = req.params.id;
    console.log(id);
    // Try to save that new eagle to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
    Task.update({_id: id}, { name: req.body.name, description: req.body.description }, function(err){
        // if there is an error console.log that something went wrong!
        if(err) {
            console.log('something went wrong with new person save');
            res.json({message: "Error", error: err});
        } else { // else console.log that we did well and then redirect to the root route
            console.log('successfully updated a Task!');
            res.json({message: "Success"});
        };
    });
});
app.delete('/remove/:id', function(req, res){
    console.log("id param:", req.params.id);
    Task.remove({ _id: req.params.id }, function(err) {
        if(err) {
            console.log('something went wrong with save');
            res.json({message: "Error", error: err});
        } else { // else console.log that we did well and then redirect to the root route
            console.log('successfully removed a Task!');
            res.json({message: "Success"});
        };
    });
});
// Setting our Server to Listen on Port: 8000
app.listen(8006, function() {
    console.log("listening on port 8006");
});