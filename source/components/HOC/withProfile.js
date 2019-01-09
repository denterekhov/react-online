//Core
import React, { Component, createContext } from 'react';

const myContext = createContext();

const withProfile = (Enhanceable) => {
    return class WithProfile extends Component {
        static contextType = myContext;
        render() {
            return (
                <Enhanceable 
                    {...this.context} 
                    {...this.props} 
                />
            )
        }
    }
}

export { myContext, withProfile };