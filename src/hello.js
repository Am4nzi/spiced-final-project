import React from 'react';
import Greetee from './greetee';
import GreeteeChanger from './greeteechanger';

export default class Hello extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            greetee: this.props.greetee
        };
    }
    changeGreetee(greetee) {
        this.setState({
            greetee: greetee
        });
    }
    render() {
        const isGoodDay = false;
        return (
            <div style={{
                color: this.props.color,
                fontSize: '26px'
            }}>
                Hello, <Greetee greetee={this.state.greetee} />!
                <ul>
                    <li>Batman</li>
                    <li>Hello Kitty</li>
                    <li>{
                        Math.random() >= .5 ?
                        <span>Leonardo DiCaprio</span> :
                        <span>Jennifer Lawrence</span>
                    }</li>
                </ul>
                {isGoodDay && <div>Today is good</div>}
                <GreeteeChanger changeGreetee={greetee => this.changeGreetee(greetee)} />
            </div>
        );
    }
}
