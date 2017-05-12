import React from 'react'

export default (CustomComponent) => class AccordionDecorator extends React.Component {
    state = {
        openItemId: null
    }

    toggleOpenItem = openItemId => ev => {
        if (ev && ev.preventDefault) ev.preventDefault()

        this.setState({
            openItemId: this.isItemOpened(openItemId) ? null : openItemId
        })
    }

    isItemOpened = id => id === this.state.openItemId

    render() {
        return <CustomComponent {...this.props} toggleOpenItem={this.toggleOpenItem} isItemOpened={this.isItemOpened}/>
    }
}