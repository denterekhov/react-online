// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route, Redirect } from 'react-router-dom';

//Components
import Catcher from 'components/Catcher';
import StatusBar from 'components/StatusBar';
import Feed from 'components/Feed';
import Profile from 'components/Profile';
import Login from 'components/Login';
import { myContext } from 'components/HOC/withProfile';

//Instruments
import avatar from 'theme/assets/Den';

@hot(module)
export default class App extends Component {
    state = {
        avatar,
        currentUserFirstName: 'Денис',
        currentUserLastName: 'Терехов',
        isLoggedIn: false,
        isInitialized: false,
    }

    componentDidMount = () => {
        const isLoggedIn = JSON.parse(localStorage.getItem('facebook-auth'));
        this.setState({
            isLoggedIn: !!isLoggedIn,
            isInitialized: true,
        });
    }

    _logIn = () => {
        localStorage.setItem('facebook-auth', JSON.stringify(true));
        this.setState({
            isLoggedIn: true,
        })
    } 

    _logOut = () => {
        localStorage.removeItem('facebook-auth');
        this.setState({
            isLoggedIn: false,
        })
    } 
    
    render() {
        const { isLoggedIn, isInitialized } = this.state;
        const { Provider } = myContext;
        return (
            <Catcher>
                <Provider value = { this.state }>
                    {!isInitialized
                        ? null
                        : (isLoggedIn 
                            ? (
                                <>
                                    <StatusBar _logOut = { this._logOut } />
                                    <Switch>
                                        <Route 
                                            component = { Feed } 
                                            path = '/feed' 
                                        />
                                        <Route 
                                            component = { Profile } 
                                            path = '/profile' 
                                        />
                                        <Redirect to = '/feed' />
                                    </Switch>
                                </>
                            ) 
                            : (
                                <Switch>
                                    <Route render = {(props) => (
                                        <Login _logIn = { this._logIn } {...props} />
                                    )} path = '/login' />
                                    <Redirect to = '/login' />
                                </Switch>
                            )
                        )
                    }
                </Provider>
            </Catcher>
        );
    }
}
