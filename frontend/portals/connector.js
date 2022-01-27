import { connect } from 'react-redux';
import { makeGetBadges } from '../selectors';

/**
 * makeMapStateToProps
 * @returns {Function}
 */
const makeMapStateToProps = () => {
  const getBadges = makeGetBadges();

  return (state, props) => ({
    badges: getBadges(state, props),
  });
};

export default connect(makeMapStateToProps);
