import React, { Component } from 'react'
import ArticleList from './ArticleList'
import Chart from './Chart'
import UserForm from './UserForm'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

class App extends Component {
    static propTypes = {

    };

    state = {
        counter: 0,
        selection: null
    }

    updateCounter = (ev) => {
        ev.preventDefault()
        this.setState({
            counter: this.state.counter + 1
        })
    }

    render() {
        const options = this.props.articles.map(article => ({
            label: article.title,
            value: article.id
        }))

        return (
            <div>
                <UserForm />
                <a href = "#" onClick = {this.updateCounter}>update chart</a>
                <Select options = {options} value = {this.state.selection}
                        onChange = {this.handleSelectionChange}
                        multi = {true}
                />
                <ArticleList articles = {this.props.articles} />
                <Chart articles = {this.props.articles} key={this.state.counter}/>
            </div>
        )
    }

    handleSelectionChange = selection => this.setState({ selection })
}

export default App