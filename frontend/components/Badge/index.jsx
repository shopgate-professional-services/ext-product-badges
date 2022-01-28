import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import classNames from 'classnames';
import { DiscountBadge } from '@shopgate/engage/components';
import { BADGES_LOCATION_PDP } from '../../constants';

const styles = {
  root: css({
    minWidth: 42,
    marginRight: 4,
  }),
  badge: css({
    paddingLeft: 6,
    paddingRight: 6,
  }).toString(),
  big: css({
    fontSize: '1.15rem',
  }).toString(),
};

/**
 * The badge component
 * @param {Object} props The component props
 * @returns {JSX}
 */
const Badge = ({ badge, location }) => {
  const { label, style } = badge;

  // Custom class created from badge styles
  const customClass = useMemo(() => {
    if (!style) {
      return '';
    }

    return css(style).toString();
  }, [style]);

  return (
    <div className={styles.root}>
      <DiscountBadge
        className={classNames(styles.badge, {
          [styles.big]: location === BADGES_LOCATION_PDP,
        }, customClass)}
        text={label}
      />
    </div>
  );
};

Badge.propTypes = {
  badge: PropTypes.shape().isRequired,
  location: PropTypes.string,
};

Badge.defaultProps = {
  location: null,
};

export default Badge;
