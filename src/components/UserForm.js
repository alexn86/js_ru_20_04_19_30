import React, { Component } from 'react'

class UserForm extends Component {
    static propTypes = {

    };

    state = {
        name: ''
    }

    render() {
        return (
            <div>
                Username: <input type="text" value = {this.state.name} onChange = {this.handleChange}/>
            </div>
        )
    }

    handleChange = ev => {
        if (ev.target.value.length > 10) return
        this.setState({
            name: ev.target.value
        })
    }
}

export default UserForm