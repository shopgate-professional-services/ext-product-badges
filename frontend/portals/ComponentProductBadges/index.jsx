import React from 'react';
import PropTypes from 'prop-types';
import {
  BADGES_LOCATION_PRODUCT_GRID,
  BADGES_LOCATION_PRODUCT_LIST,
  BADGES_LOCATION_PRODUCT_CARD,
  BADGES_LOCATION_PDP,
  BADGES_LOCATION_LIVESHOPPING,
} from '../../constants';

import ProductBadges from '../../components/ProductBadges';
import {
  showOnSliders, showOnLists, showOnPdp, showOnLiveshopping,
} from '../../config';
import connect from '../connector';

/**
 * ComponentProductBadges portal component
 * @param {Object} props The component props
 * @returns {JSX}
 */
const ComponentProductBadges = ({ location, badges }) => {
  if (!badges.length) {
    return null;
  }

  if ([BADGES_LOCATION_PRODUCT_LIST].includes(location)) {
    // No support for product lists for now
    return null;
  }

  if ([BADGES_LOCATION_PRODUCT_GRID].includes(location) && !showOnLists) {
    return null;
  }

  if ([BADGES_LOCATION_PDP].includes(location) && !showOnPdp) {
    return null;
  }

  if ([BADGES_LOCATION_PRODUCT_CARD].includes(location) && !showOnSliders) {
    return null;
  }

  if ([BADGES_LOCATION_LIVESHOPPING].includes(location) && !showOnLiveshopping) {
    return null;
  }

  return (
    <ProductBadges badges={badges} location={location} />
  );
};

ComponentProductBadges.propTypes = {
  badges: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  location: PropTypes.string,
};

ComponentProductBadges.defaultProps = {
  location: null,
};

export default connect(ComponentProductBadges);
