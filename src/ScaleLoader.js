import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import appendVendorPrefix from 'domkit/appendVendorPrefix';
import insertKeyframesRule from 'domkit/insertKeyframesRule';

class ScaleLoader extends PureComponent {
  constructor(props) {
    super(props);

    this.keyframes = {
      '0%': {
        transform: 'scaley(1.0)',
      },
      '50%': {
        transform: 'scaley(0.4)',
      },
      '100%': {
        transform: 'scaley(1.0)',
      },
    };

    this.animationName = insertKeyframesRule(this.keyframes);
  }

  getLineStyle() {
    return {
      backgroundColor: this.props.color,
      borderRadius: this.props.radius,
      height: this.props.height,
      margin: this.props.margin,
      verticalAlign: this.props.verticalAlign,
      width: this.props.width,
    };
  }

  getAnimationStyle(i) {
    const animation = [this.animationName, '1s', `${i * 0.1}s`, 'infinite', 'cubic-bezier(.2,.68,.18,1.08)'].join(' ');
    const animationFillMode = 'both';

    return {
      animation,
      animationFillMode,
    };
  }

  getStyle(i) {
    return appendVendorPrefix(
      this.getLineStyle(i),
      this.getAnimationStyle(i),
      {
        display: 'inline-block',
      },
    );
  }

  render() {
    const { loading } = this.props;

    if (loading) {
      return (
        <div id={this.props.id} className={this.props.className}>
          <div style={this.getStyle(1)} />
          <div style={this.getStyle(2)} />
          <div style={this.getStyle(3)} />
          <div style={this.getStyle(4)} />
          <div style={this.getStyle(5)} />
        </div>
      );
    }

    return null;
  }
}

ScaleLoader.defaultProps = {
  color: '#ffffff',
  height: '35px',
  loading: true,
  margin: '2px',
  radius: '2px',
  width: '4px',
};

ScaleLoader.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  height: PropTypes.string,
  id: PropTypes.string,
  loading: PropTypes.bool,
  margin: PropTypes.string,
  radius: PropTypes.string,
  verticalAlign: PropTypes.string,
  width: PropTypes.string,
};

export default ScaleLoader;
