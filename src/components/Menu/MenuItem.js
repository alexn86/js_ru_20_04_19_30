import React from 'react'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'

function MenuItem(props) {
    return (
        <div>
            <NavLink to = {props.path} activeStyle = {{color: 'red'}}>{props.path}</NavLink>
        </div>
    )
}

MenuItem.propTypes = {
}

export default MenuItem