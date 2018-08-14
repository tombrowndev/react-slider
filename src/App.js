import React, { Component } from 'react';

// Import Componenets
import CardSlider from './components/CardSlider';
import Card from './components/Card';

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

      return (
        <React.Fragment>
            <h2 className="section-title">Slider</h2>
          {
            (cardData.length > 0) &&
            <CardSlider cards={cardData} toggleLike={this.toggleLike} cardsToShow={cardsToShow} />
          }
            <h2 className="section-title">Single Card</h2><br />
          { (cardData.length > 0) &&
          <Card key={0} data={cardData[0]} handleLike={this.toggleLike} />
          }
        </React.Fragment>
      );


  }
}

export default App;
