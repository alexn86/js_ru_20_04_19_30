import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default class CommentForm extends Component {
    static propTypes = {
        articleId: PropTypes.string
    };

    state = {
        user: '',
        text: ''
    };

    _userChange = (ev) => {
        const user = ev.target.value;

        if (user.length < 20) {
            if (user.length < 5) {
                ev.target.classList.add('error');
            } else {
                ev.target.classList.remove('error');
            }

            this.setState({ user });
        }
    };

    _textChange = (ev) => {
        if (ev.target.value.length == 0) {
            ev.target.classList.add('error');
        } else {
            ev.target.classList.remove('error');
        }

        this.setState({
            text: ev.target.value
        });
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
                        <input type="text" name="user" value={this.state.user} onChange={this._userChange}/>
                        User
                    </label>
                    <textarea name="text" onChange={this._textChange} value={this.state.text} />
                    <input type="submit" value="Send"/>
                </form>
            </div>
        );
    }
}