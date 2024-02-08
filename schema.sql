-- Basic commands for setup the DATABASE and TABLE IF NOT EXISTS 
CREATE DATABASE IF NOT EXISTS elearning;


CREATE TABLE users (
    fullName VARCHAR(50), 
    email VARCHAR(50) , 
    password INT
);


CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50),
    author VARCHAR(50),
    categories VARCHAR(50),
    price INT,
    description VARCHAR(255),
    video_url VARCHAR(255)
);

INSERT INTO courses (title, author, categories, price, description, video_url) VALUES( "Advanced JavaScript", "Harshit Sharma", "Programming Language", 1999, "This course is for beginner to advanced level", "https://youtu.be/chx9Rs41W6g?si=1w4M1UlmShTNsywp");

CREATE TABLE enrolled_courses (
    userEmail VARCHAR(50),
    courseID INT,
    PRIMARY KEY (userEmail, courseID),
    FOREIGN KEY (userEmail) REFERENCES users(email),
    FOREIGN KEY (courseID) REFERENCES courses(id)
);
