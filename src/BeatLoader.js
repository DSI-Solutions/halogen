import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import appendVendorPrefix from 'domkit/appendVendorPrefix';
import insertKeyframesRule from 'domkit/insertKeyframesRule';

class BeatLoader extends PureComponent {
  constructor(props) {
    super(props);

    this.keyframes = {
      '50%': {
        transform: 'scale(0.75)',
        opacity: 0.2,
      },
      '100%': {
        transform: 'scale(1)',
        opacity: 1,
      },
    };

    this.animationName = insertKeyframesRule(this.keyframes);
  }

  getBallStyle() {
    return {
      backgroundColor: this.props.color,
      width: this.props.size,
      height: this.props.size,
      margin: this.props.margin,
      borderRadius: '100%',
      verticalAlign: this.props.verticalAlign,
    };
  }

  getAnimationStyle() {
    const animation = [this.animationName, '0.7s', i % 2 ? '0s' : '0.35s', 'infinite', 'linear'].join(' ');
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
          <div style={this.getStyle(1)} />
          <div style={this.getStyle(2)} />
          <div style={this.getStyle(3)} />
        </div>
      );
    }

    return null;
  }
}

BeatLoader.defaultProps = {
  loading: true,
  color: '#ffffff',
  size: '15px',
  margin: '2px',
};

BeatLoader.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  loading: React.PropTypes.bool,
  color: React.PropTypes.string,
  size: React.PropTypes.string,
  margin: React.PropTypes.string,
  verticalAlign: PropTypes.string,
};

export default BeatLoader;
