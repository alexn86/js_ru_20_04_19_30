import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DateRange from './DateRange'
import SelectFilter from './Select'
import { connect } from 'react-redux'

class Filters extends Component {
    static propTypes = {
        articles: PropTypes.array
    };

    constructor(props) {
        super();

        this._preFilterData = props.articles;
    }

    render() {
        return (
            <div>
                <SelectFilter articles = {this._preFilterData} />
                <DateRange articles = {this._preFilterData} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        articles: state.articles
    }
}

export default connect(mapStateToProps)(Filters)