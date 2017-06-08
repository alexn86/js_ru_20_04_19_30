import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

function ErrorPage(props) {
    return (
        <h1>{props.errorText}</h1>
    )
}

ErrorPage.propTypes = {
}

export default connect(state => ({
    errorText: state.error && state.error.statusText
}))(ErrorPage)