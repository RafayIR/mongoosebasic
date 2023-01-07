require("dotenv").config(); // environment variable
const express = require('express');
const app = express();
const mongoose = require("mongoose");

//  mondodb connect
mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err)
    )

const StudentSchema = new mongoose.Schema({
    roll_no: Number,
    name: String
})

const Student = mongoose.model('Student', StudentSchema);

const std = new Student({
    roll_no: 452,
    name: 'shahbaz'
});

std.save().then(() => ('One entry Addded', (err) => console.log(err)));


app.get('/', (req, res) => {
    Student.find({}, (err, found) => {
        if (!err) {
            res.send(found);
        } else {
            console.log(err);
            res.send("Some error occured!")
        }
    }).catch(err => console.log("Error occured, " + err));

    // res.send('connection made');
})



app.listen(8080)