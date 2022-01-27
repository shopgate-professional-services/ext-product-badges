import React from 'react';
import { css } from 'glamor';
import PropTypes from 'prop-types';
import Badge from '../Badge';

const styles = {
  root: css({
    display: 'flex',
    flexWrap: 'wrap',
  }),
};

/**
 * The badge component
 * @param {Object} props The component props
 * @returns {JSX}
 */
const ProductBadges = ({ location, badges }) => {
  if (!badges.length) {
    return null;
  }

  /* eslint-disable react/no-array-index-key */
  return (
    <div className={styles.root}>
      { badges.map((badge, index) => (
        <Badge key={`${index}_${badge.text}`} location={location} badge={badge} />
      ))}
    </div>
  );
  /* eslint-enable react/no-array-index-key */
};

ProductBadges.propTypes = {
  badges: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  location: PropTypes.string,
};

ProductBadges.defaultProps = {
  location: null,
};

export default ProductBadges;
