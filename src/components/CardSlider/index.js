import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from "react-slick";
import InlineSVG from 'svg-inline-react';

// Componenets
import Card from './../Card';

// Styling / CSS
import './style.css';

// Configuration
import { sliderSettings } from './config';

/**
 * Will display a slick slider of card components.
 * Required Props:
 * - {array} Cards An array of card object data.
 * - {function} toggleLike A funciton to hangle the heart click event.
 * - {number} cardsToShow A number of cards to be visible between 1 - 3.
 */
class CardSlider extends Component {
  constructor(state) {
    super(state);

    this.arrowSvg = '<svg aria-hidden="true" viewBox="0 0 192 512" class="svg-inline--fa fa-angle-left fa-w-6 fa-3x"><path d="M4.2 247.5L151 99.5c4.7-4.7 12.3-4.7 17 0l19.8 19.8c4.7 4.7 4.7 12.3 0 17L69.3 256l118.5 119.7c4.7 4.7 4.7 12.3 0 17L168 412.5c-4.7 4.7-12.3 4.7-17 0L4.2 264.5c-4.7-4.7-4.7-12.3 0-17z" class=""></path></svg>';

    this.passLikeToApp = this.passLikeToApp.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
    this.previousSlide = this.previousSlide.bind(this);
  }

  /**
   *  Moves the slider to next card.
   */
  nextSlide() {
    this.slider.slickNext();
    window.slider = this.slider;
  }

  /**
   *  Moves the slider to previous card.
   */
  previousSlide() {
    this.slider.slickPrev();
  }

  /**
   *  Returns the arrow button SVG
   */
  getArrowSvg() {
    return this.arrowSvg;
  }

  /**
   * Passes the id of the heart's card that was clicked between the Card component and a parent
   */
  passLikeToApp(id) {
    this.props.toggleLike(id);
  }

  /**
   * Render the component
   */
  render() {
    const { cards, cardsToShow } = this.props;

    return (
      <div className={"card-slider show-" + cardsToShow + "-cards"}>
        <Slider ref={c => (this.slider = c)} {...sliderSettings}>
          {cards.map(card => {
            return <Card key={card.id} data={card} handleLike={this.passLikeToApp} />
          })}
        </Slider>
        <div className="slider-controls">
          <div id="prevButton" onClick={this.previousSlide} title="Previous Card" className="control" aria-hidden="true" tabIndex="-1">
            <InlineSVG src={this.getArrowSvg()} />
          </div>
          <div id="nextButton" onClick={this.nextSlide} title="Next Card" className="control" aria-hidden="true" tabIndex="-1">
            <InlineSVG src={this.getArrowSvg()} />
          </div>
        </div>
      </div>
    );
  }
}

/**
 * Type check the props
 */
CardSlider.propTypes = {
  cards: PropTypes.array.isRequired,
  cardsToShow: PropTypes.number.isRequired,
  toggleLike: PropTypes.func.isRequired
};

export default CardSlider;
