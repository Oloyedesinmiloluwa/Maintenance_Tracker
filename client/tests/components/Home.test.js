import React from 'react';
import { shallow } from 'enzyme';
import Home from '../../components/home/Home';

describe('Test Home component', () => {
  it('it should render properly', (done) => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find('.card').length).toEqual(4);
    expect(wrapper.find('Footer').length).toEqual(1);
    expect(wrapper.find('Link').length).toEqual(5);
    done();
  });
  it('it should render properly when user is logged in', (done) => {
    const wrapper = shallow(<Home userName ='Sinmi' />);
    expect(wrapper.find('.card').length).toEqual(4);
    expect(wrapper.find('Footer').length).toEqual(1);
    expect(wrapper.find('Link').length).toEqual(5);
    done();
  });
});
