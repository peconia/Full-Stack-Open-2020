import React from 'react';
import ReactDOM from 'react-dom';


const Header = ({course}) => {
    return (
        <h1>{course}</h1>
    );
};

const Part = ({part, exercise}) => {
    return (
        <p>
            {part} {exercise}
        </p>
    );
};

const Content = ({parts}) => parts.map(item => <Part part={item.name} exercise={item.exercises} key={item.name}/>);

const Total = ({parts}) => {
    const total = parts.reduce((sum, item) => sum + item.exercises , 0);
    return (
        <p>Number of exercises {total}</p>
    );
};


const App = () => {
    const course = {
    name: 'Half Stack application development',
    parts: [
        {
            name: 'Fundamentals of React',
            exercises: 10
        },
        {
            name: 'Using props to pass data',
            exercises: 7
        },
        {
            name: 'State of a component',
            exercises: 14
        }
    ]
};

    return (
        <div>
            <Header course={course.name}/>
            <Content parts={course.parts} />
            <Total parts={course.parts}/>
        </div>
    )
};

ReactDOM.render(<App/>, document.getElementById('root'));