import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { Button, Row, Col } from 'react-bootstrap';
import FA from 'react-fontawesome';

import LockedSettings from './Locked-Settings.jsx';
import SocialSettings from './Social-Settings.jsx';
import EmailSettings from './Email-Setting.jsx';
import LanguageSettings from './Language-Settings.jsx';
import SKWave from '../../../components/SK-Wave.jsx';


import { toggleUserFlag } from '../redux/actions.js';
import { userSelector } from '../../../redux/selectors.js';
import { toggleNightMode, updateTitle } from '../../../redux/actions.js';

const mapDispatchToProps = {
  updateTitle,
  toggleNightMode,
  toggleIsLocked: () => toggleUserFlag('isLocked'),
  toggleQuincyEmail: () => toggleUserFlag('sendQuincyEmail'),
  toggleNotificationEmail: () => toggleUserFlag('sendNotificationEmail'),
  toggleMonthlyEmail: () => toggleUserFlag('sendMonthlyEmail')
};

const mapStateToProps = createSelector(
  userSelector,
  state => state.app.isSignInAttempted,
  (
    {
      user: {
        username,
        email,
        isLocked,
        isGithubCool,
        isTwitter,
        isLinkedIn,
        sendMonthlyEmail,
        sendNotificationEmail,
        sendQuincyEmail
      }
    },
    isSignInAttempted
  ) => ({
    showLoading: isSignInAttempted,
    username,
    email,
    isLocked,
    isGithubCool,
    isTwitter,
    isLinkedIn,
    sendMonthlyEmail,
    sendNotificationEmail,
    sendQuincyEmail
  })
);
const propTypes = {
  children: PropTypes.element,
  email: PropTypes.string,
  initialLang: PropTypes.string,
  isGithubCool: PropTypes.bool,
  isLinkedIn: PropTypes.bool,
  isLocked: PropTypes.bool,
  isTwitter: PropTypes.bool,
  lang: PropTypes.string,
  sendMonthlyEmail: PropTypes.bool,
  sendNotificationEmail: PropTypes.bool,
  sendQuincyEmail: PropTypes.bool,
  showLoading: PropTypes.bool,
  toggleIsLocked: PropTypes.func.isRequired,
  toggleMonthlyEmail: PropTypes.func.isRequired,
  toggleNightMode: PropTypes.func.isRequired,
  toggleNotificationEmail: PropTypes.func.isRequired,
  toggleQuincyEmail: PropTypes.func.isRequired,
  updateMyLang: PropTypes.func,
  updateTitle: PropTypes.func.isRequired,
  username: PropTypes.string
};

export class Settings extends React.Component {
  constructor(...props) {
    super(...props);
    this.updateMyLang = this.updateMyLang.bind(this);
  }

  updateMyLang(e) {
    e.preventDefault();
    const lang = e.target.value;
    this.props.updateMyLang(lang);
  }

  componentWillMount() {
    this.props.updateTitle('Settings');
  }

  render() {
    const {
      children,
      username,
      isLocked,
      isGithubCool,
      isTwitter,
      isLinkedIn,
      showLoading,
      email,
      sendMonthlyEmail,
      sendNotificationEmail,
      sendQuincyEmail,
      toggleNightMode,
      toggleIsLocked,
      toggleQuincyEmail,
      toggleMonthlyEmail,
      toggleNotificationEmail
    } = this.props;
    if (!username && !showLoading) {
      return <SKWave />;
    }
    if (children) {
      return (
        <Row>
          <Col
            sm={ 4 }
            smOffset={ 4 }
            >
            { children }
          </Col>
        </Row>
      );
    }
    return (
      <div>
        <Row>
          <Col xs={ 12 }>
            <Button
              block={ true }
              bsSize='lg'
              bsStyle='primary'
              className='btn-link-social'
              href={ `/${username}` }
              >
              <FA name='user' />
              Show me my profile
            </Button>
            <Button
              block={ true }
              bsSize='lg'
              bsStyle='primary'
              className='btn-link-social'
              href={ '/signout' }
              >
              Sign me out
            </Button>

          </Col>
        </Row>
        <div className='spacer' />
      </div>
    );
  }
}

Settings.displayName = 'Settings';
Settings.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
