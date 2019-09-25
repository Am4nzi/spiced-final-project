import React from 'react';

export default function Greetee(props) {
    return (
        <span>{props.greetee || 'World'}</span>
    )
}
