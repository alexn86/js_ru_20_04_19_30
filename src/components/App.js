import React, { Component } from 'react'
import ArticleList from './ArticleList'
import Chart from './Chart'
import UserForm from './UserForm'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import moment from 'moment'
import DayPicker, { DateUtils } from 'react-day-picker'
import 'react-day-picker/lib/style.css'


class App extends Component {
    static propTypes = {

    };

    state = {
        counter: 0,
        selection: null,
        dayFrom: null,
        dayTo: null
    }

    updateCounter = (ev) => {
        ev.preventDefault()
        this.setState({
            counter: this.state.counter + 1
        })
    }

    handleDayClick = day => {
        const range = DateUtils.addDayToRange(day, {from: this.state.dayFrom, to: this.state.dayTo});
        this.setState({
            dayFrom: range.from,
            dayTo: range.to
        });
    }

    handleResetClick = e => {
        e.preventDefault();
        this.setState({
            dayFrom: null,
            dayTo: null,
        });
    }

    getDayPicker() {
        const { dayFrom, dayTo } = this.state;

        return (
            <div className="RangeExample">
                {!dayFrom && !dayTo && <p>Please select the <strong>first day</strong>.</p>}
                {dayFrom && !dayTo && <p>Please select the <strong>last day</strong>.</p>}
                {dayFrom && dayTo &&
                <p>
                    You chose from
                    {' '}
                    {moment(dayFrom).format('LL')}
                    {' '}
                    to
                    {' '}
                    {moment(dayTo).format('LL')}
                    .
                    {' '}<a href="." onClick={this.handleResetClick}>Reset</a>
                </p>}
                <DayPicker
                    numberOfMonths={2}
                    selectedDays={[dayFrom, { from: dayFrom, to: dayTo }]}
                    onDayClick={this.handleDayClick}
                />
            </div>
        );
    }

    render() {
        const options = this.props.articles.map(article => ({
            label: article.title,
            value: article.id
        }));

        return (
            <div>
                {this.getDayPicker()}
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