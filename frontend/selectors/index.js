import { createSelector } from 'reselect';
import { getProduct, getProductDiscount } from '@shopgate/engage/product';
import { badges, maxDisplayCount, badgeStyle } from '../config';

/**
 * Create discount badge data
 * @param {Object} badge A badge entry from the config
 * @param {number} discount Discount for the current product
 * @returns {Object|null}
 */
const createDiscountBadgeData = (badge, discount) => {
  const { label, min = 1, max = 100 } = badge;
  // Break if the product discount is not within the desired range
  if (!discount || discount < min || discount > max) {
    return null;
  }

  // When a text is configured it's used for the badge, otherwise the percentage discount is shown
  return {
    label: label || `-${discount}%`,
  };
};

/**
 * Create property badge data
 * @param {Object} badge A badge entry from the config
 * @param {Array} productProperties Product properties
 * @returns {Object|null}
 */
const createPropertyBadgeData = (badge, productProperties) => {
  const { label, properties = [] } = badge;

  if (!Array.isArray(productProperties) || !Array.isArray(properties) || !properties.length) {
    // Break when the input data is invalid
    return null;
  }

  // Check the product properties
  const match = productProperties.find(productProperty => properties.find((property) => {
    if (label) {
      // When a text is configured we search for an exact match of property label and value
      return productProperty.label === property.label && productProperty.value === property.value;
    }
    // When no text is configured the property value will be used as label text
    return productProperty.label === property.label;
  }));

  if (!match) {
    return null;
  }

  return {
    label: label || match.value,
  };
};

/**
 * Creates selector data for a single batch entry
 * @param {Object} badge A badge entry from the config
 * @param {number} discount Discount for the current product
 * @param {Array} productProperties Product properties
 * @returns {Object|null}
 */
const createBadgeData = (badge, discount, productProperties) => {
  const { type, style } = badge;

  if (!type) {
    return null;
  }

  let result = null;

  if (type === 'discount') {
    result = createDiscountBadgeData(badge, discount);
  } else if (type === 'property') {
    result = createPropertyBadgeData(badge, productProperties);
  }

  if (result) {
    result = {
      ...result,
      // Add local and global styles to the data
      style: {
        ...badgeStyle,
        ...style,
      },
    };
  }

  return result;
};

/**
 * Creates a selector that returns badge data
 * @returns {Function}
 */
export const makeGetBadges = () => createSelector(
  getProduct,
  getProductDiscount,
  (product, discount) => {
    if (!product || !Array.isArray(badges) || !badges.length) {
      return [];
    }

    const { additionalProperties = [] } = product;

    return badges.reduce((acc, current) => {
      const badge = createBadgeData(current, discount, additionalProperties);

      if (badge) {
        acc.push(badge);
      }

      return acc;
    }, []).slice(0, maxDisplayCount);
  }
);

