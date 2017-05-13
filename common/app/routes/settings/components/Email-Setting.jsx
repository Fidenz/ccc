import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Button, Row, Col } from 'react-bootstrap';
import FA from 'react-fontawesome';
import classnames from 'classnames';

const propTypes = {
  email: PropTypes.string,
  sendMonthlyEmail: PropTypes.bool,
  sendNotificationEmail: PropTypes.bool,
  sendQuincyEmail: PropTypes.bool,
  toggleMonthlyEmail: PropTypes.func.isRequired,
  toggleNotificationEmail: PropTypes.func.isRequired,
  toggleQuincyEmail: PropTypes.func.isRequired
};

export function UpdateEmailButton() {
  return (
    <Link
      style={{ textDecoration: 'none' }}
      to='/settings/update-email'
      >
      <Button
        block={ true }
        bsSize='lg'
        bsStyle='primary'
        className='btn-link-social'
        >
        <FA name='envelope' />
        Update my Email
      </Button>
    </Link>
  );
}

export default function EmailSettings({
  email,
  sendMonthlyEmail,
  sendNotificationEmail,
  sendQuincyEmail,
  toggleMonthlyEmail,
  toggleNotificationEmail,
  toggleQuincyEmail
}) {
  if (!email) {
    return (
      <div>
        <Row>
          <p className='large-p text-center'>
            You don't have an email id associated to this account.
          </p>
        </Row>
        <Row>
          <UpdateEmailButton />
        </Row>
      </div>
    );
  }
  return (
    <div>
      <Row>
        <p className='large-p text-center'>
          <em>{ email }</em>
        </p>
      </Row>
      
    </div>
  );
}

EmailSettings.displayName = 'EmailSettings';
EmailSettings.propTypes = propTypes;
