import React from "react";
import classes from "./AnswersList.css";
import AnswerItem from './AnswerItem/AnswerIten';

const AnswersList = props => { 
        

    return (
        <ul className={classes.AnswersList}>
            {props.answers.map((answer, index) => {
                return (
                    <AnswerItem
                        key={index}
                        answer={answer}
                        onAnswerClick={props.onAnswerClick}
                        stateClass={props.state ? props.state[answer.id] : null}
                    />
                );
            })}
        </ul>
    )
};

export default AnswersList;