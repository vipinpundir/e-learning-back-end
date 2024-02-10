# E-Learning Platform

## Overview

Welcome to the E-Learning Platform project! This platform provides functionalities for user registration, course management, enrollment, and more.

## Table of Contents

1. [Setup](#setup)
2. [Endpoints](#endpoints)
3. [Database](#database)
4. [Run the Project](#run-the-project)

## Setup

Make sure you have Node.js and MySQL installed on your machine.

1. **Clone the repository:**

   ```bash
   git clone https://github.com/vipinpundir/e-learning-platform.git

2. **Install Dependencies:**
   - npm install

3. **Create a MySQL database named `elearning`:**
   - CREATE DATABASE IF NOT EXISTS elearning;
   - Run the SQL commands in `schema.sql` to create the necessary tables.

4. **Endpoints:**
   - `POST /addUser:` Create a new user.
   - `POST /login:` Authenticate a user.
   - `GET /courses:` Get details of available courses.
   - `POST /enroll/course:` Enroll in a course.
   - `POST /enrolled/courses:` Get details of enrolled courses for a user.
   - `POST /add/course:` Add a new course.
   - `POST /delete/course:` Delete a course.
   - `PATCH /edit/course/:id:` Edit details of a course.

3. **Run the Project:**
   - npm start

    The server will be running at `http://localhost:8080`.

