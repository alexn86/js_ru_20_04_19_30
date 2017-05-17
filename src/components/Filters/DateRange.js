import React, { Component } from 'react'
import DayPicker, { DateUtils } from 'react-day-picker'
import 'react-day-picker/lib/style.css';
import { connect } from 'react-redux'
import { filterDate } from '../../AC'

class DateRange extends Component {

    // state = {
    //     from: null,
    //     to: null
    // }

    handleDayClick = (day) => {
        const date = DateUtils.addDayToRange(day, this.props.filters.date);
        const {filterDate, articles, filters } = this.props;

        filterDate(date, articles, filters);
    }

    render() {
        const { from, to } = this.props.filters.date;
        const selectedRange = from && to && `${from.toDateString()} - ${to.toDateString()}`
        return (
            <div className="date-range">
                <DayPicker
                    ref="daypicker"
                    selectedDays={ day => DateUtils.isDayInRange(day, { from, to }) }
                    onDayClick={ this.handleDayClick }
                />
                {selectedRange}
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        filters: state.filters
    }
}

export default connect(mapStateToProps, { filterDate })(DateRange)