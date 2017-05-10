//HOC === Higher Order Component === decorator
import React, {Component as BasicComponent} from 'react'

export default (OriginalComponent) => class DecoratedComponent extends BasicComponent {
    state = {
        isOpen: false
    }

    render() {
        return <OriginalComponent {...this.props} {...this.state} toggleOpen={this.toggleOpen}/>
    }

    toggleOpen = ev => {
        ev && ev.preventDefault && ev.preventDefault()
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

}