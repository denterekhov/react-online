//Core
import React, { Component } from 'react';
import moment from 'moment';
import { func, string, number, array } from 'prop-types';

//Components
import { withProfile } from 'components/HOC/withProfile';
import Like from 'components/Like';

//Instruments
import Styles from './styles.m.css';

@withProfile
export default class Post extends Component {
    static propTypes = {
        _likePost:  func.isRequired,
        id:         string.isRequired,
        comment:    string.isRequired,
        created:    number.isRequired,
        likes:      array.isRequired,
    }

    _deletePost = () => {
        const { id, _deletePost } = this.props;
        _deletePost(id);
    }

    render() {
        const { avatar, currentUserFirstName, currentUserLastName, _likePost, id, comment, created, likes } = this.props;
    
        return (
            <section className = { Styles.post }>
                <span className = { Styles.cross } onClick = { this._deletePost } />
                <img src = { avatar } />
                <a>{ currentUserFirstName } { currentUserLastName }</a>
                <time>{ moment(created).format('MMMM D h:mm:ss a') }</time>
                <p>{ comment }</p>
                <Like 
                    _likePost = { _likePost } 
                    id = { id } 
                    likes = { likes } 
                />
            </section>
        )
    }
}