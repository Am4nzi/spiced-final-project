import React from 'react';

export default function GreeteeChanger(props) {
    return (
        <input type="text" onChange={
            e => props.changeGreetee(e.target.value)
        } />
    )
}
