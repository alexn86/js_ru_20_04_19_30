import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default class CommentForm extends Component {
    static propTypes = {
        articleId: PropTypes.string
    };

    state = {
        user: '',
        text: '',
        errorUser: false,
        errorText: false
    };

    _userChange = (ev) => {
        const user = ev.target.value;
        let errorUser = false;

        if (user.length < 20) {
            if (user.length < 5) {
                errorUser = true;
            }

            this.setState({ user, errorUser });
        }
    };

    _textChange = (ev) => {
        const text = ev.target.value;
        let errorText = false;

        if (text.length == 0) {
            errorText = true;
        }

        this.setState({ text, errorText });
    };

    _validate = () => {
        if (this.state.user.length < 5 || this.state.user.length > 20 || this.state.text.length === 0) {
            return false;
        }

        return true;
    };

    _formSubmit = (ev) => {
        ev.preventDefault();

        if (this._validate()) {
            console.log(this.state.user, this.state.text, this.props.articleId);
        } else {
            alert('Error!');
        }
    };

    render() {
        return (
            <div className="comment-form">
                <form onSubmit={this._formSubmit}>
                    <label>
                        <input
                            type="text"
                            name="user"
                            value={this.state.user}
                            onChange={this._userChange}
                            className={this.state.errorUser ? 'error' : ''}
                        />
                        User
                    </label>
                    <textarea
                        name="text"
                        onChange={this._textChange}
                        value={this.state.text}
                        className={this.state.errorText ? 'error' : ''}
                    />
                    <input type="submit" value="Send"/>
                </form>
            </div>
        );
    }
}