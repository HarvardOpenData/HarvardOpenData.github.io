import React, { useState } from 'react';
import { select, selectAll } from 'd3-selection';
import { csv } from 'd3-fetch';
import { path } from 'd3-path';
import { transition } from 'd3-transition';
import { format } from 'd3-format';
import { easeLinear } from 'd3-ease';
import { xml } from 'd3-request';
import { interpolateString } from 'd3-interpolate';

const d3 = {
  xml,
  format,
  select,
  selectAll,
  csv,
  path,
  interpolateString,
  transition,
  easeLinear,
};

const options = [
  {
    text: 'ENTER AN LDR ;)',
    link: 'https://www.amazon.com/Introduction-Algorithms-3rd-MIT-Press/dp/0262033844',
  },
  {
    text: 'BUY ZM STOCK',
    link: 'https://www.marketwatch.com/investing/stock/zm',
  },
  {
    text: 'READ A BOOK',
    link:
      'https://www.amazon.com/Introduction-Algorithms-3rd-MIT-Press/dp/0262033844',
  },
  {
    text: 'GROW YOUR NETWORK',
    link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    text: 'BAKE SOME BREAD',
    link:
      'https://t8x8a5p2.stackpathcdn.com/wp-content/uploads/2018/05/Ciabatta-Bread-Recipe.webp',
  },
  {
    text: 'GET READY TO RISK IT ALL',
    link: 'https://www.amazon.com/Introduction-Algorithms-3rd-MIT-Press/dp/0262033844',
  },
  {
    text: 'LEAVE YOUR LDR ;o',
    link: 'https://www.amazon.com/Introduction-Algorithms-3rd-MIT-Press/dp/0262033844',
  },
  {
    text: 'TAKE THE DM SURVEY',
    link: 'https://www.amazon.com/Introduction-Algorithms-3rd-MIT-Press/dp/0262033844',
  },
];

class WheelOfFortune extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstSpin: true,
      rotation: 0,
      initialized: false,
      width: 300,
      height: 300,
      active: false,
    };
    this.initialize = this.initialize.bind(this);
    this.play = this.play.bind(this);
    this.spin = this.spin.bind(this);
    this.tween = this.tween.bind(this);
  }

  componentDidMount() {
    this.initialize();
  }

  initialize() {
    const wheelGraphicUrl = 'https://i.ibb.co/mJZJMnT/wheel.png';
    const width = 300;
    const height = width;

    var svg = d3
      .select('#viz')
      .append('svg:svg')
      .attr('height', width)
      .attr('width', height);

    svg
      .append('image')
      .attr('id', 'wheel')
      .attr('xlink:href', wheelGraphicUrl)
      .attr('width', width)
      .attr('height', height);

    // append total users
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', height / 2 - 10)
      .attr('text-anchor', 'middle')
      .style('font-size', '30px')
      .style('font-weight', 'bold')
      .style('weight', '700px')
      .text("1000");

    // add line 1
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', height / 2 + 10)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .attr('class', 'click description')
      .text('users have signed');

    // add line 2 - sorry this is gross :/
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', height / 2 + 30)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .attr('class', 'click description')
      .text('up for Datamatch');

    this.setState({ initialized: true, width: width, height: height });
  }

  play(dur) {
    if (this.state.active) {
      return;
    }

    this.setState({ active: true, firstSpin: false });
    this.spin(dur);
    setTimeout(() => this.setState({ active: false }), dur);
  }

  async spin(dur) {
    d3.select('#wheel')
      .transition()
      .duration(dur)
      .attrTween('transform', this.tween);
  }

  tween() {
    const { rotation, width, height } = this.state;
    const baseRotation = 5000;
    const ctr = width / 2 + ', ' + height / 2;
    const prevAngle = rotation;
    const newAngle = prevAngle + baseRotation + Math.random() * 360;
    this.setState({ rotation: newAngle % 360 });
    return d3.interpolateString(
      'rotate(' + prevAngle + ',' + ctr + ')',
      'rotate(' + newAngle + ',' + ctr + ')',
    );
  }

  renderResponse() {
    const { active, firstSpin, rotation } = this.state;
    if (firstSpin) {
      return (
        <div style={{ cursor: 'pointer' }} onClick={() => this.play(7000)}>
          Spin to find out!
        </div>
      );
    }
    if (active) {
      return 'beep boop beep boop';
    }
    const choice = Math.floor(rotation / (360 / options.length));
    const { link, text } = options[choice];
    return link === '/register' ? (
      <a href={link} rel="noopener noreferrer" target="_blank">
        {text}
      </a>
    ) : (
      <a href={link} rel="noopener noreferrer" target="_blank">
        {text}
      </a>
    );
  }

  render() {
    const { active } = this.state;
    return (
      <div>
        <h2>What should you do today?</h2>
        <div>{this.renderResponse()}</div>
        <i className="arrow fas fa-arrow-down"></i>
        <div id="viz"></div>
        <br />
        <button onClick={() => this.play(7000)}>
          {active ? 'SPINNING...' : 'SPIN FOR ANSWERS'}
        </button>
      </div>
    );
  }
}

export default WheelOfFortune;