const express = require("express");
const db = require("./db");
const app = express();
const cors = require('cors');


// Use JSON parsing middleware 
app.use(express.json());

// Enable CORS for all routes
app.use(cors());



// To listen a port of 8080 
app.listen(8080, () => {
    console.log("app listening port on 8080")

});



// POST to create - New User
app.post("/addUser", (req, res) => {
    const { fullName, email, password } = req.body
    const q = `INSERT INTO users VALUES(?,?,?)`;
    try {
        db.query(q, [fullName, email, password], (err, results) => {
            if (err) {
                // Handle Duplicate values
                if (err.code === 'ER_DUP_ENTRY') {
                    res.status(200).json({ message: "User Email Already registered." });
                } else {
                    // sets the HTTP status code of the response to 500 (Internal Server Error)
                    res.status(500).json({ error: "Internal Server Error" });
                }
            } else {
                // Handle successful insertion
                res.status(200).json({ message: "User Added Successfully." });
            }
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }

});

// POST to get User Login Details
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    const q = `SELECT * FROM users WHERE password= ? AND email= ?`;
    try {
        db.query(q, [password, email], (err, results) => {
            // Handle None
            if (results.length === 0) {
                res.status(200).json({ loginStatus: false, loginDetails: results });
            } else {
                // Handle successful insertion
                res.status(200).json({ loginStatus: true, loginDetails: results });
            }
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }

});

// GET to Get Courses Details
app.get("/courses", (req, res) => {
    const q = `SELECT * FROM COURSES`;
    try {
        db.query(q, (err, results) => {
            // Handle None
            if (results.length === 0) {
                res.status(200).json({ message: "Currently courses is not available." });
            } else {
                // Handle successful insertion
                res.status(200).json({ CoursesDetails: results });
            }
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }

});

// POST for Payment
app.post("/enroll/course", (req, res) => {
    const { userEmail, courseId } = req.body;
    const q = `INSERT INTO enrolled_courses VALUES(?,?)`;
    try {
        db.query(q, [userEmail, courseId], (err, results) => {

            if (err) {
                // Handle Duplicate values
                if (err.code === 'ER_DUP_ENTRY') {
                    res.status(200).json({ message: "Course Already enrolled." });
                } else {
                    // sets the HTTP status code of the response to 500 (Internal Server Error)
                    res.status(500).json({ error: "Internal Server Error", });
                }
            } else {
                // Handle successful insertion
                res.status(200).json({ message: "Payment successful" });
            }
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }

});

// POST to get Enrolled courses details
app.post("/enrolled/courses", (req, res) => {
    const { userEmail } = req.body;
    const q = `SELECT courses.title, courses.author, courses.categories, courses.price, courses.description, courses.video_url
    FROM enrolled_courses
    JOIN courses ON enrolled_courses.courseID = courses.id
    WHERE enrolled_courses.userEmail =?`;
    try {
        db.query(q, userEmail, (err, results) => {
            // Handle None
            if (results.length === 0) {
                res.status(200).json({ message: "Currently courses is not available." });
            } else {
                // Handle successful insertion
                res.status(200).json({ EnrolledCourses: results });
            }
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }

});


// POST to Add New Course 
app.post("/add/course", (req, res) => {
    const { title, author, categories, price, description, video_url, img_url } = req.body
    const q = `INSERT INTO courses (title, author, categories, price, description, video_url, img_url) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    try {
        db.query(q, [title, author, categories, price, description, video_url, img_url], (err, results) => {
            
            if (err) {
                // sets the HTTP status code of the response to 500 (Internal Server Error)
                res.status(500).json({ error: "Internal Server Error", });
            } else {
                // Handle successful insertion
                res.status(200).json({ message: "Course added successful" });
            }
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

// POST to delete course 
app.post('/delete/course', (req, res)=>{
    const {courseID} = req.body;
    const q1 = `DELETE FROM enrolled_courses WHERE courseID=?`;
    const q2 = `DELETE FROM courses WHERE id=?`;
    try{
        db.query(q1, courseID, (err, results)=>{
            if (err) {
                // sets the HTTP status code of the response to 500 (Internal Server Error)
                res.status(500).json({ error: "Internal Server Error", });
            } else {
                // After successful delition from enrolled_courses
                db.query(q2, courseID, (err, results)=>{
                    if (err) {
                        res.status(500).json({ error: "Internal Server Error", });
                    } else {
                        // Handle successful delition from courses
                        res.status(200).json({ message: "Course deleted successfully" });

                    }
                })
            }
        })

    }catch(error){
        console.error("Unexpected error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

// PATCH to Edit Course Details 
app.patch("/edit/course/:id", (req, res) => {
    const id = req.params.id;
    const { title, author, categories, price, description, video_url, img_url } = req.body
    // const q = `INSERT INTO courses (title, author, categories, price, description, video_url, img_url) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const q = `UPDATE courses
    SET title = ?, author = ?, categories = ?, price = ?, description = ?, video_url = ?, img_url = ?
    WHERE id = ?;
    `;
    try {
        db.query(q, [title, author, categories, price, description, video_url, img_url, id], (err, results) => {
            
            if (err) {
                // sets the HTTP status code of the response to 500 (Internal Server Error)
                res.status(500).json({ error: "Internal Server Error", });
            } else {
                // Handle successful insertion
                res.status(200).json({ message: "Course details updated" });
            }
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})