import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import { connect } from 'react-redux'
import { filterSelect } from '../../AC'

class SelectFilter extends Component {
    static propTypes = {
        articles: PropTypes.array
    };

    // state = {
    //     selection: null
    // }

    render() {
        const options = this.props.articles.map(article => ({
            label: article.title,
            value: article.id
        }))

        return (
            <Select options = {options} value = {this.props.filters.selection}
                    onChange = {this.handleSelectionChange}
                    multi = {true}
            />
        )
    }

    handleSelectionChange = selection => {
        const { filterSelect, articles, filters } = this.props;

        filterSelect(selection, articles, filters);
    }
}

function mapStateToProps(state) {
    return {
        filters: state.filters
    }
}

export default connect(mapStateToProps, { filterSelect })(SelectFilter)