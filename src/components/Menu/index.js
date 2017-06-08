import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Menu extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <h1>Main menu:</h1>
                {this.props.children}
            </div>
        )
    }
}

export default Menu