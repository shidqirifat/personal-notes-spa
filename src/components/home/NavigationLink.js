import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Text from '../global/Text';
import PropTypes from 'prop-types';
import ConfigContext from '../../context/ConfigContext';

export default function NavigationLink({ value, link, children, navigationActive, style }) {
  const { theme } = useContext(ConfigContext);

  const renderTextColor = () => {
    if (navigationActive === value && theme === 'light') return '#fff';
    if (navigationActive !== value && theme === 'light') return '#2d2d2d';
    if (navigationActive === value && theme === 'dark') return '#fff';
    if (navigationActive !== value && theme === 'dark') return '#ccc';
  };

  return (
    <Link
      to={link}
      className={`navigation-button ${navigationActive === value ? 'active' : ''}`}
      style={style}>
      <Text
        type="text-navigation"
        style={{
          color: renderTextColor()
        }}>
        {children}
      </Text>
    </Link>
  );
}

NavigationLink.propTypes = {
  value: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  style: PropTypes.object,
  navigationActive: PropTypes.string,
  children: PropTypes.node.isRequired
};
