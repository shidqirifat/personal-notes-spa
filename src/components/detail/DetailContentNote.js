import React from 'react';
import { showFormattedDate } from '../../utils';
import Text from '../global/Text';
import PropTypes from 'prop-types';

export default function DetailContentNote({ title, body, createdAt }) {
  return (
    <div className="content-detail-wrapper">
      <Text style={{ marginBottom: 0 }} type="title-detail-note">
        {title}
      </Text>
      <Text type="text-detail-date">{showFormattedDate(createdAt)}</Text>
      <Text type="text-detail-note">{body}</Text>
    </div>
  );
}

DetailContentNote.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired
};
