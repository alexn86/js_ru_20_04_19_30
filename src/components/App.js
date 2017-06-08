import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ArticlesPage from '../route_handlers/ArticlesPage'
import UserForm from './UserForm'
import Filters from './Filters/index'
import Counter from './Counter'
import ErrorPage from './ErrorPage'
import CommentsPage from '../route_handlers/CommentsPage'
import NotFoundPage from '../route_handlers/NotFoundPage'
import LangProvider from './LangProvider'
import {Redirect, Route, NavLink, Switch} from 'react-router-dom'
import {ConnectedRouter as Router} from 'react-router-redux'
import history from '../history'
import Menu from './Menu'
import MenuItem from './Menu/MenuItem'

class App extends Component {
    static propTypes = {
    };

    state = {
        username: '',
        language: 'en'
    }

    static childContextTypes = {
        user: PropTypes.string
    }

    getChildContext() {
        return {
            user: this.state.username
        }
    }

    handleUserChange = (username) => this.setState({ username })

    changeLanguage = language => ev => this.setState({ language })

    render() {
        return (
            <Router history = {history}>
                <LangProvider language = {this.state.language}>
                    <div>
                        <ul>
                            <li onClick = {this.changeLanguage('en')}>English</li>
                            <li onClick = {this.changeLanguage('ru')}>Russian</li>
                        </ul>
                        <UserForm value = {this.state.username} onChange = {this.handleUserChange} />
                        <Menu>
                            <MenuItem path = '/counter'/>
                            <MenuItem path = '/articles'/>
                            <MenuItem path = '/filters'/>
                        </Menu>
                        <Switch>
                            <Route path = '/counter' component = {Counter} exact />
                            <Route path = '/filters' component = {Filters} />
                            <Route path = '/articles/new' render = {this.getSomeArticleText} />
                            <Route path = '/articles' component = {ArticlesPage} />
                            <Route path = '/comments' component = {CommentsPage} />
                            <Route path = '/error' component = {ErrorPage} />
                            <Route path = '*' component = {NotFoundPage}/>
                        </Switch>
                    </div>
                </LangProvider>
            </Router>
        )
    }

    getSomeArticleText = () => {
        return <h1>New Article Place</h1>
    }
}

export default App