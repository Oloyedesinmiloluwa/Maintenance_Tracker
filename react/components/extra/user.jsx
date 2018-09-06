// import React from 'react';
// import { Link } from 'react-router-dom';

// export default (props) => {
//     return (
//         <div>
//         <h2>I am the new route</h2> <Link to='/'> Home </Link>
//         <input type='text' placeholder='Enter your name' />
//         <input type='submit' value='submit' />
//         </div>
//     )
// }
import React from 'react';
import { Link } from 'react-router-dom';
export default class User extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = { counter: 0,
    //         userInput: ''}
    // }
    state = { counter: 0,
        userInput: ''};
    store = { userInput: '' };
    handleClick = (event) => {
        event.preventDefault();
        this.store.userInput += `Welcome ${this.state.userInput} \n`
        // this.store.userInput += '\n welcome' + this.state.userInput;
        this.setState((prevState) => ({ counter: prevState.counter + 1 }));
        // this.setState((prevState) => ({ userInput: prevState.userInput + '\n' + this.store.userInput }));
    };
    handleChange = (event) => {
        event.preventDefault();
        this.setState({ userInput: event.target.value });
        
        // this.setState((prevState) => ({ counter: prevState.counter + 1 }))
        // console.log('i changed');
    }
    render() {
        return (
            <div>
                <h2>I am the new route</h2> <Link to='/'> Home </Link>
                <input type='text' value={this.state.userInput} onChange={this.handleChange} placeholder='Enter your name' />
                <input type='submit' value='submit' onClick={this.handleClick} />
                {this.store.userInput}
                counter {this.state.counter}
            </div>
        )
    }
}
