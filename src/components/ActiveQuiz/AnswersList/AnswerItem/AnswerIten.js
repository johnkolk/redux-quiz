import React from "react";
import classes from "./AnswerItem.css";

const AnswersItem = (props) => {

    const clc = [classes.AnswersItem]
    if (props.stateClass) {
        clc.push(classes[props.stateClass]);
    }

    return (
        <li 
            className={clc.join(' ')}
            onClick={() => props.onAnswerClick(props.answer.id)}
        >
            {props.answer.text}
        </li>
    )
};

export default AnswersItem;
