// first import the exercise-data.json file to mongodb:
// mongoimport --db mongo-exercises --collection courses --drop --file exercise-data.json --jsonArray

// note: remove the _id field as it won't be imported correctly. or update it to use ObjectId (untested)
// google search: mongoimport _id is not an ObjectId
// https://stackoverflow.com/questions/51439955/mongoimport-id-is-not-an-objectid

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
.then( () => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB', err));

// to connect to mongoDB, make sure mongodb is running on localhost. run:
// mongod
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
});

// takes the singular name
const Course = mongoose.model( 'Course', courseSchema );

async function getCourses() {

    const courses = await Course

    .find({ isPublished: true })
    .or([ { price: { $gte: 15 } }, { name: /.*by.*/i } ])

    // .sort({ price: -1 })
    // .select({ name: 1, author: 1, price: 1 });
 
    console.log(courses);

};

// getCourses();


async function updateCourse(id) {

    // approach: query first
    // modify object properties
    // save object
    const course = await Course.findById(id);

    if (!course) return; 
    console.log('test2');

    course.isPublished = true;
    course.author = 'Another Author';

    // course.set({
    //     isPublished: true,
    //     author: 'Another Author'
    // });

    const result = await course.save();
    console.log(result);

    // approach: update first
    // update directly
    // optionally: get the updated document

}

updateCourse("5d988453960366b7c20c5abb");