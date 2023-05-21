import React, { useState, useEffect, Fragment } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { toastSuccess } from "../../services/toasts";

import { createCourse, getCourses, deleteCourse, editCourse } from "../../services/api";

import CourseForm from "./Courses/CourseForm";
import CourseTable from "./Courses/CourseTable";

function Courses() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        let courses = await getCourses();
        setCourses(courses);
    };

    const addCourses = async (course) => {
        createCourse(course.title, course.leadTeacher, course.otherTeachers).then(() => {
            toastSuccess("Course successfully created");
            redirectToTable();
        });
    };

    const removeCourse = async (courseId) => {
        deleteCourse(courseId).then(() => {
            toastSuccess("Course successfully deleted");
            fetchCourses();
        });
    };

    const modifyCourses = async (course, courseId) => {
        editCourse(courseId, course.title, course.leadTeacher, course.otherTeachers).then(() => {
            toastSuccess("Successfully edited");
            redirectToTable();
        });
    };

    const redirectToTable = () => {
        fetchCourses();
        navigate("/courses");
    };

    return (
        <Fragment>
            <Routes>
                <Route
                    path=""
                    element={
                        <Fragment>
                            <h1>Courses</h1>
                            <div className="mb-3">
                                <Link to="/courses/create">
                                    <Button variant="success">Create course</Button>
                                </Link>
                            </div>
                            <CourseTable courses={courses} removeCourse={removeCourse} />
                        </Fragment>
                    }
                />

                <Route
                    path="/:id"
                    element={<CourseForm title="Edit course" handleSubmitCourse={modifyCourses} />}
                />
                <Route
                    path="/create"
                    element={<CourseForm title="Create course" handleSubmitCourse={addCourses} />}
                />
            </Routes>
        </Fragment>
    );
}

export default Courses;
