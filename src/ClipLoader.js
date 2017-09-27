import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import appendVendorPrefix from 'domkit/appendVendorPrefix';
import insertKeyframesRule from 'domkit/insertKeyframesRule';

class ClipLoader extends PureComponent {
  constructor(props) {
    super(props);

    this.keyframes = {
      '0%': {
        transform: 'rotate(0deg) scale(1)',
      },
      '50%': {
        transform: 'rotate(180deg) scale(0.8)',
      },
      '100%': {
        transform: 'rotate(360deg) scale(1)',
      },
    };

    this.animationName = insertKeyframesRule(this.keyframes);
  }

  getBallStyle() {
    return {
      width: this.props.size,
      height: this.props.size,
      border: '2px solid',
      borderColor: this.props.color,
      borderBottomColor: 'transparent',
      borderRadius: '100%',
      background: 'transparent !important',
      verticalAlign: this.props.verticalAlign,
    };
  }

  getAnimationStyle() {
    const animation = [this.animationName, '0.75s', '0s', 'infinite', 'linear'].join(' ');
    const animationFillMode = 'both';

    return {
      animation,
      animationFillMode,
    };
  }

  getStyle(i) {
    return appendVendorPrefix(
      this.getBallStyle(i),
      this.getAnimationStyle(i),
      {
        display: 'inline-block',
      },
    );
  }

  render() {
    const { loading, id, className } = this.props;

    if (loading) {
      return (
        <div id={id} className={className}>
          <div style={this.getStyle()} />
        </div>
      );
    }

    return null;
  }
}

ClipLoader.defaultProps = {
  color: '#ffffff',
  loading: true,
  size: '35px',
};

ClipLoader.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  id: PropTypes.string,
  loading: PropTypes.bool,
  size: PropTypes.string,
  verticalAlign: PropTypes.string,
};

export default ClipLoader;
