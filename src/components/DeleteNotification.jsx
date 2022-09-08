import React from 'react'
import Text from './Text'
import PropTypes from 'prop-types';

export default function DeleteNotification({ deleteNotif }) {
  return (
    <div className={`delete-notif-wrapper ${deleteNotif && 'active'}`}>
      <Text type="text-delete-notif">Note is deleted</Text>
    </div>
  )
}

DeleteNotification.propTypes = {
  deleteNotif: PropTypes.bool.isRequired,
}
