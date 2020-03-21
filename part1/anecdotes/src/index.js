import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({text, handleClick}) => (
    <button onClick={handleClick}>
        {text}
    </button>
);

const Title = ({value}) => <h1>{value}</h1>;

const AnecdoteDisplay = ({anecdote, votes}) =>
    <>
        {anecdote}
        <p>Has {votes} votes.</p>
    </>;

const MostPopularAnecdote = ({points}) => {
    const hasVotes = points.some(p => p > 0);
    if (hasVotes) {
        const index = points.indexOf(Math.max(...points));
        return (<AnecdoteDisplay anecdote={anecdotes[index]} votes={points[index]}/>)
    }
    return <p>No votes yet.</p>
};

const App = (props) => {
    const [selected, setSelected] = useState(0);
    const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));

    const newAnecdote = () => {
        let newIndex = Math.floor(Math.random() * anecdotes.length);
        // check this is not already selected to make sure we get a new one each time
        while (newIndex === selected)
            newIndex = Math.floor(Math.random() * anecdotes.length);
        setSelected(newIndex);
    };

    const voteForAnecdote = (anecdoteIndex) => {
        const p = [...points];
        p[anecdoteIndex] += 1;
        setPoints(p);
    };

    return (
        <div>
            <Title value={"Anecdote of the day"}/>
            <AnecdoteDisplay anecdote={props.anecdotes[selected]} votes={points[selected]}/>
            <Button text={"vote"} handleClick={() => voteForAnecdote(selected)}/>
            <Button text={"next anecdote"} handleClick={() => newAnecdote()}/>
            <Title value={"Anecdote with most votes"}/>
            <MostPopularAnecdote points={points}/>
        </div>
    )
};

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(
    <App anecdotes={anecdotes}/>,
    document.getElementById('root')
);