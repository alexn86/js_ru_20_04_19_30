import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './style.css'

class CommentForm extends Component {
    static propTypes = {

    };

    state = {
        user: '',
        comment: ''
    }

    render() {
        return (
            <form onSubmit = {this.handleSubmit}>
                user: <input value = {this.state.user}
                             onChange = {this.handleChange('user')}
                             className = {this.getClassName('user')} />
                comment: <input value = {this.state.comment}
                                onChange = {this.handleChange('comment')}
                                className = {this.getClassName('comment')} />
                <input type = "submit" value = "submit"/>
            </form>
        )
    }

    handleSubmit = ev => {
        ev.preventDefault()
        console.log('---', this.state)
        this.setState({
            user: '',
            comment: ''
        })
    }

    getClassName = type => this.state[type].length && this.state[type].length < 10 ? 'form-input__error' : ''

    handleChange = type => ev => {
        const {value} = ev.target
        if (value.length > 20) return
        this.setState({
            [type]: value
        })
    }
}

export default CommentForm