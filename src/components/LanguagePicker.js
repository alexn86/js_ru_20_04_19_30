import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { changeLanguage } from '../AC/index'

class LanguagePicker extends Component {
    render() {
        const languageList = ['en', 'ru'];

        return (
            <ul>
                {languageList.map(lang => (
                    <li key={lang}>
                        <a href="#" data-lang={lang} onClick={this.handleClick}>{lang}</a>
                    </li>
                ))}
            </ul>
        );
    }

    handleClick = ev => {
        ev.preventDefault();
        const { changeLanguage } = this.props;
        changeLanguage(ev.target.dataset.lang);
    }
}

// export default connect(state => ({
//     language: state.language
// }), changeLanguage)(LanguagePicker);
export default connect(null, { changeLanguage })(LanguagePicker);

