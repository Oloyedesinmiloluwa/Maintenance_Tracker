import React from 'react';
import { shallow } from 'enzyme';
import { Nav } from '../../components/common/Navigation';
import helper from '../../helpers';

describe('Test Dropdown component', () => {
  it('it should render properly', (done) => {
    const wrapper = shallow(<Nav Tab1={helper('home')} Tab2= {helper('new')} Tab3={helper('signout')} />);
    expect(wrapper.find('nav').length).toEqual(1);
    expect(wrapper.find('ul').length).toEqual(2);
    expect(wrapper.find('li').length).toEqual(4);
    done();
  });
});
