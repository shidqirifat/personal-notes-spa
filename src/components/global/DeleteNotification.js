import React, { useContext } from 'react';
import Text from '../global/Text';
import PropTypes from 'prop-types';
import ConfigContext from '../../context/ConfigContext';

export default function DeleteNotification({ deleteNotif }) {
  const { locale } = useContext(ConfigContext);
  return (
    <div className={`delete-notif-wrapper ${deleteNotif && 'active'}`}>
      <Text type="text-delete-notif">
        {locale === 'en' ? 'Note has been deleted' : 'Catatan telah dihapus'}
      </Text>
    </div>
  );
}

DeleteNotification.propTypes = {
  deleteNotif: PropTypes.bool.isRequired
};
