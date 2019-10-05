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

    // solution 1
    // .find({ isPublished: true, tags: {$in: ['frontend', 'backend'] } })

    // solution 2
    .find({ isPublished: true, }) // isPublished can be used here or in the .and method
    .or([ { tags: 'backend'}, { tags: 'frontend'} ])
    // .and({ isPublished: true, }) // isPublished can be used here or in the .find method

    .sort({ price: -1 })
    .select({ name: 1, author: 1, price: 1 });
 
    console.log(courses);

};

getCourses();