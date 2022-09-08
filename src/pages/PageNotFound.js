import React from 'react';
import { Link } from 'react-router-dom';
import Text from '../components/global/Text';
import { Helmet } from 'react-helmet';

export default function PageNotFound() {
  return (
    <>
      <Helmet>
        <title>Error Not Found</title>
      </Helmet>

      <div className="page-not-found">
        <img src="/assets/404.svg" alt="Not Found" />
        <Link to="/" className="button-not-found">
          <Text type="text-not-found">Back to Home</Text>
        </Link>
      </div>
    </>
  )
}
