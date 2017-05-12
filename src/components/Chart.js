import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Chart extends Component {
    static propTypes = {
        articles: PropTypes.array.isRequired
    };

    render() {
        return <div ref = {this.setContainerRef}/>
    }

    componentWillReceiveProps(nextProps) {
        console.log('---', 'updating chart')
        //manage chart state manually
    }

    setContainerRef = ref => {
        this.container = ref
        if (!ref) {
            //do some cleanup
            return
        }
        console.log('---', 'init chart')
        //do some charting using d3 or else
    }
}

export default Chart