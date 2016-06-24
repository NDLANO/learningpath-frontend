import React from 'react';
import { connect } from 'react-redux';

import polyglot from '../i18n';
import { getLocale } from '../locale/localeSelectors';
import nb from '../locale/phrases/phrases-nb';
import en from '../locale/phrases/phrases-en';
import Alerts from './Alerts';

export class App extends React.Component {
  getChildContext() {
    return {
      lang: 'nb'
    };
  }

  render() {
    const { locale } = this.props;

    if (locale === 'en') {
      polyglot.locale(locale);
      polyglot.replace(en);
    } else if (locale === 'nb') {
      polyglot.locale(nb);
      polyglot.replace(nb);
    }

    return (
      <div>
        {this.props.children}
        <Alerts />
      </div>
    );
  }
}

App.propTypes = {
  locale: React.PropTypes.string.isRequired,
};

App.childContextTypes = {
  lang: React.PropTypes.string
};

const mapStateToProps = (state) => Object.assign({}, state, { locale: getLocale(state) });

export default connect(mapStateToProps)(App);
