//Core
import React, { Component } from 'react';
import moment from 'moment';
import { func, string, number, array } from 'prop-types';


//Components
import { Consumer } from 'components/HOC/withProfile';
import Like from 'components/Like';

//Instruments
import Styles from './styles.m.css';

export default class Post extends Component {
    constructor(props) {
      super(props)
      this._deletePost = this._deletePost.bind(this);
    }

    static propTypes = {
        _likePost:  func.isRequired,
        id:         string.isRequired,
        comment:    string.isRequired,
        created:    number.isRequired,
        likes:      array.isRequired,
    }

    _deletePost() {
        const { id, _deletePost } = this.props;
        _deletePost(id);
    }

    render() {
        const { _likePost, id, comment, created, likes } = this.props;
    
        return (
            <Consumer>   
                {(context) => (
                    <section className = { Styles.post }>
                        <span className = { Styles.cross } onClick = { this._deletePost } />
                        <img src = { context.avatar } />
                        <a>{ context.currentUserFirstName } { context.currentUserLastName }</a>
                        <time>{ moment(created).format('MMMM D h:mm:ss a') }</time>
                        <p>{ comment }</p>
                        <Like 
                            _likePost = { _likePost } 
                            id = { id } 
                            likes = { likes } 
                            { ...context }
                        />
                    </section>
                )}
            </Consumer>  
        )
    }
}