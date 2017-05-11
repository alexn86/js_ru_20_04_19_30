import React, { Component as BasicComponent } from 'react';

//DecoratedComponent я называл чтоб легче понять было. Лучше выбирай более значущее название
export default (Component) => class AccordeonDecorator extends BasicComponent {
    state = {
        //Не привязывайся к названиям сущностей, вся суть декораторов в универсальности. Сделай openItemId
        openItemId: null
    };

    render() {
        return <Component {...this.props} {...this.state} toggleItem={this.toggleItem}/>
    }

    toggleItem = id => ev => {
        ev && ev.preventDefault && ev.preventDefault();
        this.setState({
            openItemId: id != this.state.openItemId ? id : null
        })
    }
}
