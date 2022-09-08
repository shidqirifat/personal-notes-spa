import React from 'react';
import { Link } from 'react-router-dom';
import Text from '../components/global/Text';

export default function PageNotFound() {
  return (
    <div className="page-not-found">
      <img src="/assets/404.svg" alt="Not Found" />
      <Link to="/" className="button-not-found">
        <Text type="text-not-found">Back to Home</Text>
      </Link>
    </div>
  )
}
