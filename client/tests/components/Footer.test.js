import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../components/common/Footer';

describe('Test Footer component', () => {
  it('it should render properly', (done) => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('a').length).toEqual(5);
    expect(wrapper.find('footer').length).toEqual(1);
    expect(wrapper.find('i').length).toEqual(4);
    done();
  });
});
