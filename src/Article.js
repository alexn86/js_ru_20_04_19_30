import React, {Component} from 'react';
import CommentList from './CommentList';

export default class Article extends Component {
/*
    constructor() {
        super()
        this.state = {
            isOpen: false
        }
    }
*/
    state = {
        isOpen: false
    };

    render() {
        const {article} = this.props;
        return (
            <section>
                <h2 onClick={this.toggleOpen}>
                    {article.title}
                </h2>
                {this.getBody()}
            </section>
        )
    }

    getBody() {
        return this.state.isOpen &&
            <div>
                <div>{this.props.article.text}</div>
        {/*Я б эту проверку спрятал в CommentList*/}
                <CommentList comments={this.props.article.comments ? this.props.article.comments : []}/>
            </div>;
    }

    toggleOpen = ev => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}

/*
export default function Article(props) {
    const {article} = props
    return (
        <section>
            <h2>
                {article.title}
            </h2>
            <div>
                {article.text}
            </div>
        </section>
    )
}*/
