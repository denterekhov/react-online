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

    _getCross = () => {
        const { firstName, lastName, currentUserFirstName, currentUserLastName } = this.props;
        return `${firstName} ${lastName}` === `${currentUserFirstName} ${currentUserLastName}`
            ? <span className = { Styles.cross } onClick = { this._deletePost } />
            : null;
    }

    render() {
        const { avatar, firstName, lastName, _likePost, id, comment, created, likes } = this.props;
        const cross = this._getCross();
        return (
            <section className = { Styles.post }>
                {cross}
                <img src = { avatar } />
                <a>{ firstName } { lastName }</a>
                <time>{ moment.unix(created).format('MMMM D h:mm:ss a') }</time>
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