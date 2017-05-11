import React, { Component as BasicComponent } from 'react';

//DecoratedComponent я называл чтоб легче понять было. Лучше выбирай более значущее название
export default (OriginalComponent) => class DecoratedComponent extends BasicComponent {
    state = {
        //Не привязывайся к названиям сущностей, вся суть декораторов в универсальности. Сделай openItemId
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
