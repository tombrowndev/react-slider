import React, { Component } from 'react';

// Componenets
import CardSlider from './components/CardSlider';
import Card from './components/Card';

// Styling / CSS
import './style.css';

// Configuration
import {apiSettings} from './config';

/**
 * The main component for our App
 */
class App extends Component {
  constructor(state) {
    super(state);

    // Initial state
    this.state = {
      cardData: [],
      cardsToShow: 3
    };

    this.toggleLike = this.toggleLike.bind(this);
  }

  /**
   * Once the component mounted, request the card data and update our state
   */
  componentDidMount() {
      fetch(apiSettings.url, {
        headers: apiSettings.jsonHeader
      })
        .then(response => {
          if (!response.ok) {
            throw Error(response.statusText);
          }

          return response.json();
          }
        )
        .then(data => {
          this.setState({cardData: data});
        })
        .catch(error => {
          console.log('Cant\'t fetch card data from API');
        });
  }

  /**
   * Patches the item in the database
   */
  patchDatabase(id, card) {

    // Validate card
    if(!this.cardIsValid(card)) throw Error('Can\'t patch the database because the card data is invalid');

    fetch(apiSettings.url + id, {
      headers: apiSettings.jsonHeader,
      method: 'PATCH',
      body: JSON.stringify(card)
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
      })
      .catch(error => {
        console.log('Cant\'t patch the database');
      });
  }

  /**
   * Validate card object
   */
   cardIsValid(card) {
     let isValid = true;

     const validProps = ['id', 'title', 'subtitle', 'text', 'image_url', 'href', 'is_liked'];

     // Type check
     if(typeof card.id !== 'number') isValid = false;
     if(typeof card.title !== 'string') isValid = false;
     if(typeof card.text !== 'string') isValid = false;
     if(typeof card.image_url !== 'string') isValid = false;
     if(typeof card.href !== 'string') isValid = false;
     if(typeof card.is_liked === 'undefined') isValid = false;

     // Check for invalid properties
     for(const property in card) {
       if(validProps.indexOf(property) === -1) isValid = false;
     }

     return isValid;
   }

  /**
    * Toggles the card data. Triggered via the AppSlider component
    */
  toggleLike(id) {
    const { cardData } = this.state;

    try {
      cardData.forEach((card, index) => {
        if(card.id === id) {
          cardData[index].is_liked = !cardData[index].is_liked;
          this.patchDatabase(id, cardData[index]);
        }
      });
    } catch(error) {
      console.log(error);
      return;
    }

    this.setState({cardData});
  }

  /**
   * Render the component
   */
  render() {
    const { cardData, cardsToShow } = this.state;

      return (
        <React.Fragment>
            <h2 className="section-title">Slider</h2><br />
          {
            (typeof cardData !== 'undefined') && (cardData.length > 0) &&
            <CardSlider cards={cardData} toggleLike={this.toggleLike} cardsToShow={cardsToShow} />
          }
            <h2 className="section-title">Single Card</h2><br />
          {
            (typeof cardData !== 'undefined') && (cardData.length > 0) &&
          <Card key={0} data={cardData[0]} handleLike={this.toggleLike} />
          }
        </React.Fragment>
      );


  }
}

export default App;
