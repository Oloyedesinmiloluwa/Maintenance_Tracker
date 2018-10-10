import React from 'react';
import { shallow } from 'enzyme';
import MessageText from '../../components/common/MessageText';

describe('Test MessageText component', () => {
  it('it should render properly', (done) => {
    const wrapper = shallow(<MessageText message = "hi" color = "blue" />);
    expect(wrapper.find('p').length).toEqual(1);
    expect(wrapper.find('p').props().id).toEqual('messageText');
    expect(wrapper.find('p').text()).toEqual('hi');
    done();
  });
});
