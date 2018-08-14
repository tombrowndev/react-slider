import React from 'react';
import CardSlider from './';
import Enzyme from 'enzyme';
import {shallow, mount, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

describe('Card Slider', () => {

  let wrapper;

  beforeEach(() => {
    let mockCardData = [
      {
        "id": 1,
        "title": "We are Humans",
        "subtitle": "And we love humans",
        "text": "We act like humans, we talk like humans, and we think like humans. And we call out anyone who does the opposite.",
        "image_url": "https://picsum.photos/300/150/?random",
        "href": "https://mindera.com/people-and-culture/we-are-humans/",
        "is_liked": true
      },
      {
        "id": 2,
        "title": "We work together",
        "text": "We insist on working collaborativelly. <strong>No rockstars</strong>. No departments. The whole owns the whole project together.",
        "image_url": "https://picsum.photos/300/150/?random",
        "href": "https://mindera.com/people-and-culture/we-work-together/",
        "is_liked": false
      }
    ];
    wrapper = render(<CardSlider cards={mockCardData} cardsToShow={2} toggleLike={new Function()} />);

  });

  it('renders without crashing', () => {

  });

  it('renders the slick slider', () => {
      expect(wrapper.find('.slick-slider.slick-initialized').length).toEqual(1);
  });

});
