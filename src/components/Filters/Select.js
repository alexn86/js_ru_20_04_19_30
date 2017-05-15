import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

class SelectFilter extends Component {
    static propTypes = {
        articles: PropTypes.array
    };

    state = {
        selection: null
    }

    render() {
        const options = this.props.articles.map(article => ({
            label: article.title,
            value: article.id
        }))

        return (
            <Select options = {options} value = {this.state.selection}
                    onChange = {this.handleSelectionChange}
                    multi = {true}
            />
        )
    }

    handleSelectionChange = selection => this.setState({ selection })
}

export default SelectFilter