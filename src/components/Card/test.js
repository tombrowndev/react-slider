import React from 'react';
import Card from './';
import Enzyme from 'enzyme';
import {shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

describe('Card Slider', () => {

  let wrapper, mockCardData;

  beforeEach(() => {
    mockCardData = {
        "id": 1,
        "title": "We are Humans",
        "subtitle": "And we love humans",
        "text": "We act like humans, we talk like humans, and we think like humans. And we call out anyone who does the opposite.",
        "image_url": "https://picsum.photos/300/150/?random",
        "href": "https://mindera.com/people-and-culture/we-are-humans/",
        "is_liked": true
      };

    wrapper = render(<Card key={1} data={mockCardData} cardsToShow={2} handleLike={new Function()} />);

  });

  it('renders without crashing', () => {

  });

  it('renders the card', () => {
      expect(wrapper.find('h2').text()).toEqual(mockCardData.title);
      expect(wrapper.find('h3').text()).toEqual(mockCardData.subtitle);
  });

});
