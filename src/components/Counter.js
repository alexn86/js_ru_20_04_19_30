import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {increment} from '../AC/index'
import {connect} from 'react-redux'

class Counter extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <h1>
                    {this.props.count}
                    <a href = "#" onClick = {this.handleIncrement}>increment me</a>
                </h1>
            </div>
        )
    }

    handleIncrement = ev => {
        ev.preventDefault()
        const {increment} = this.props
        increment()
//        console.log('---', this.props)
//        console.log('---', 'implement me', increment())
    }
}

function mapStateToProps(storeState) {
    return {
        count: storeState.counter
    }
}

export default connect(mapStateToProps, { increment })(Counter)