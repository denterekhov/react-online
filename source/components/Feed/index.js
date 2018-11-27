//Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Components
import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';
import Spinner from 'components/Spinner';

//Instruments
import Styles from './styles.m.css';

export default class Feed extends Component {
    state = {
      posts: [
          {id: '12', comment: 'Hi there!', created: 1543238949979}, 
          {id: '45', comment: 'Приветик!', created: 1543238970084},
      ],
      isSpinning: false,
    }

    render() {
        const { posts, isSpinning } = this.state;
        const postJSX = posts.map((post) => {
            return <Post key = { post.id } { ...post } />
        });

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isSpinning } />
                <StatusBar />
                <Composer />
                {postJSX}
            </section>
        ) 
    }
}
