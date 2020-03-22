import React from 'react';


const Header = ({course}) => <h1>{course}</h1>;

const Part = ({part, exercise}) => <p>{part} {exercise}</p>;

const Content = ({parts}) => parts.map(item => <Part part={item.name} exercise={item.exercises} key={item.id}/>);

const Total = ({parts}) => {
    const total = parts.reduce((sum, item) => sum + item.exercises, 0);
    return (
        <p><b>Total of {total} exercises</b></p>
    );
};

const Course = ({course}) =>
    <>
        <Header course={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
    </>;

export default Course;