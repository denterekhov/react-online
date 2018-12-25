//Core
import React, { Component } from 'react';

//Components
import { withProfile } from 'components/HOC/withProfile';

//Instruments
import Styles from './styles.m.css';

@withProfile
export default class Login extends Component {
    render() {
        const { avatar, _logIn } = this.props;
        return (
            <section className = { Styles.login }>
                <button onClick = { _logIn }>Log in <img src = { avatar } /></button>
            </section>
        ) 
    }
}
