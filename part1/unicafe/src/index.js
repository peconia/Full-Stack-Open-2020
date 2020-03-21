import React, {useState} from 'react';
import ReactDOM from 'react-dom';


const Title = ({value}) => <h1>{value}</h1>;

const Button = ({text, handleClick}) => (
    <button onClick={handleClick}>
        {text}
    </button>
);

const Statistic = ({text, value}) => {
    return (
        <tr>
            <td>{text}:</td>
            <td>{value}</td>
        </tr>
    );
};

const Statistics = ({stats}) => {
    const hasValues = stats.some(s => s.value > 0);
    if (hasValues) {
        const evaluations = stats.map(item => <Statistic text={item.name} value={item.value} key={item.name}/>);
        return (
            <table>
                <tbody>{evaluations}</tbody>
            </table>);
    }
    return (
        <p>No feedback given</p>
    )
};


const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);
    const [scores, setScores] = useState([]);

    const addRating = (name) => {
        if (name === "good") {
            setGood(good + 1);
            setScores(scores.concat(1));
        } else if (name === "neutral") {
            setNeutral(neutral + 1);
            setScores(scores.concat(0));
        } else {  // bad
            setBad(bad + 1);
            setScores(scores.concat(-1));
        }
    };

    const average = (list) =>
        list.length > 0 ? (list.reduce((sum, value) => sum + value, 0) / list.length).toFixed(2) : 0;

    const positivePercentage = (list) => {
        if (list.length < 1) return 0;
        const positives = list.filter(a => a === 1);
        return (positives.length / list.length * 100).toFixed(2) + " %"
    };

    const stats = [
        {name: "good", value: good},
        {name: "neutral", value: neutral},
        {name: "bad", value: bad},
        {name: "all", value: scores.length},
        {name: "average", value: average(scores)},
        {name: "positive", value: positivePercentage(scores)}
    ];

    return (
        <div>
            <Title value={"give feedback"}/>
            <Button handleClick={() => addRating("good")} text="good"/>
            <Button handleClick={() => addRating("neutral")} text="neutral"/>
            <Button handleClick={() => addRating("bad")} text="bad"/>
            <Title value={"statistics"}/>
            <Statistics stats={stats}/>
        </div>
    )
};

ReactDOM.render(<App/>,
    document.getElementById('root')
);