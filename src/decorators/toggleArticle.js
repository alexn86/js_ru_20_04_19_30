import React, { Component as BasicComponent } from 'react';

export default (OriginalComponent) => class DecoratedComponent extends BasicComponent {
    state = {
        openArticleId: null
    };

    render() {
        return <OriginalComponent {...this.props} {...this.state} toggleArticle={this.toggleArticle}/>
    }

    toggleArticle = id => ev => {
        ev && ev.preventDefault && ev.preventDefault();
        this.setState({
            openArticleId: id != this.state.openArticleId ? id : null
        })
    }
}