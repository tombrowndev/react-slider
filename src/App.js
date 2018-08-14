import React, { Component } from 'react';

// Import Componenets
import CardSlider from './components/CardSlider';

// Import styles
import './style.css';

// App Component
class App extends Component {
  constructor(state) {
    super(state);

    this.state = {
      cardData: [],
      cardsToShow: 3
    }

    this.toggleLike = this.toggleLike.bind(this);
  }

  // Once the component mounted, request the card data
  componentDidMount() {
      fetch('http://localhost:3001/cards')
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

  toggleLike(id) {
    const { cardData } = this.state;

    cardData.forEach((card, index) => {
      if(card.id === id) {
        cardData[index].is_liked = !cardData[index].is_liked;
      }
    });

    this.setState({cardData});
  }

  // Render the component (duh?)
  render() {
    const { cardData, cardsToShow } = this.state;

      return cardData.length ? (
        <CardSlider cards={cardData} cardsToShow={cardsToShow} toggleLike={this.toggleLike} />
      ) : '';

  }
}

export default App;