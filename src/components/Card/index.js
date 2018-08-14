import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import InlineSVG from 'svg-inline-react';

// Styling / CSS
import './style.css';

/**
 * Will display a card.
 * Required Props:
 * - {number} Key
 * - {object} data The data rendered in the card. Properties of the object must be...
 *        - {number} id
          - {string} title
          - {string} subtitle (not required)
          - {string} text
          - {url} image_url
          - {link} href
          - {bool} is_liked
 * - {number} cardsToShow A number of cards to be visible between 1 - 3.
 */
class Card extends Component {
  constructor(state) {
    super(state);

    this.heartSvg = '<svg aria-hidden="true" class="svg-inline--fa fa-heart fa-w-16" viewBox="0 0 512 512"><path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path></svg>';
    this.heartEmptySvg = '<svg aria-hidden="true" class="svg-inline--fa fa-heart fa-w-16" viewBox="0 0 512 512"><path d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"></path></svg>';

    this.handleClick = this.handleClick.bind(this);
  }

  /**
   * Handles the click event and passed the card id to the parent
   */
  handleClick(e) {
    e.preventDefault();
    const {data, handleLike} = this.props;
    handleLike(data.id);
  }

  /**
   * Required for accessability.
   * Allows spacebar to be used to toggle the like heart
   */
  handleKeyDown(e) {
    if(e.keyCode === 32 || e.keyCode === 13) {
      e.target.click();
    }
  }

  /**
   *  Returns the filled heart SVG
   */
  getHeartSvg() {
    return this.heartSvg;
  }

  /**
   *  Returns the empty heart SVG
   */
  getHeartEmptySvg() {
    return this.heartEmptySvg;
  }

  /**
   * Render the component
   */
  render() {
    const {id, title, subtitle, text, image_url, href, is_liked} = this.props.data;

    let textOutput;

    if(text.length > 130) {
      textOutput = text.substring(0, 130) + '...';
    } else {
      textOutput = text;
    }

    return (
      <a href={href} target="_blank" className="card-link" title="Read the full information" tabIndex="2">
        <div className="card">
          <img src={image_url + '&' + id} width="100%" alt="Card Hero" />
          <div className="content">
            <header>
              <h2 className={title.length > 24 ? 'very-long-title' : (title.length > 19) ? 'long-title' : 'normal-title'}>{title}</h2>
              {subtitle && <h3>{subtitle}</h3>}
            </header>
            <p>
              {ReactHtmlParser(textOutput)}
            </p>
            <div href="#" onClick={this.handleClick} onKeyDown={this.handleKeyDown} tabIndex="2" className="like-toggle" title={is_liked ? 'Unlike this card' : 'Like this card'}>
              <InlineSVG src={is_liked ? this.getHeartSvg() : this.getHeartEmptySvg()} />
            </div>
          </div>
        </div                                 >
      </a>
    );
  }
}

/**
 * Type check the props
 */
Card.propTypes = {
  handleLike: PropTypes.func.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    text: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    is_liked: PropTypes.bool.isRequired
  }).isRequired
};

export default Card;
