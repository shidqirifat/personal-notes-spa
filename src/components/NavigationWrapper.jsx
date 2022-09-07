import React from "react";
import NavigationLink from "./NavigationLink";
import PropTypes from 'prop-types';

export default function NavigationWrapper({ navigations, navigationActive = 'all' }) {
    return (
        <div className="navigation-wrapper">
            {navigations.map((navigation) => (
                <NavigationLink
                    key={navigation.value}
                    {...navigation}
                    navigationActive={navigationActive}
                    style={{ background: navigation.color }}
                >
                    {navigation.text}
                </NavigationLink>
            ))}
        </div>
    );
}

NavigationWrapper.propTypes = {
    navigations: PropTypes.arrayOf(PropTypes.object).isRequired,
    navigationActive: PropTypes.string,
}
