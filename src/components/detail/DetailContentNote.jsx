import React from 'react'
import { showFormattedDate } from '../../utils'
import Text from '../Text'

export default function DetailContentNote({ title, body, createdAt, onInputTitle, onInputBody }) {
  return (
    <div className="content-detail-wrapper">
      <Text style={{ marginBottom: 0 }} type="title-detail-note" onBlur={onInputTitle}>
        {title}
      </Text>
      <Text
        type="text-detail-date"
      >
        {showFormattedDate(createdAt)}
      </Text>
      <Text type="text-detail-note" onBlur={onInputBody}>{body}</Text>
    </div>
  )
}
