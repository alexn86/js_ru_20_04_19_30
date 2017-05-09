import React, { Component } from 'react';
import Comment from './Comment';

export default class CommentList extends Component {

    state = {
        isOpen: false
    };

    getBody(elements) {
        return this.state.isOpen && <ul>{elements}</ul>;
    }

    toggleOpen = ev => {
        ev.preventDefault();
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        const elements = !this.props.comments ? [] : this.props.comments.map(comment =>
            <li key={comment.id}>
                <Comment comment={comment}/>
            </li>
        );

        return (
            <div>
                <br/>
                <div>
                    Комментариев: <b>{elements.length} </b>
                    <a href="#" onClick={this.toggleOpen}>
                        {elements.length ? this.state.isOpen ? 'Скрыть' : 'Показать' : ''}
                    </a>
                </div>
                <br/>
                {this.getBody(elements)}
            </div>
        );
    }
}