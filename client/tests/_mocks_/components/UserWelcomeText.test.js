import React from 'react';
import { shallow } from 'enzyme';
import UserWelcomeText from '../../../components/common/UserWelcomeText';
import { user } from './mockData';

describe('Test UserWelcomeText component', () => {
it('it should render properly', (done) => {
const wrapper = shallow(<UserWelcomeText username = {user} />);
expect(wrapper.find('p').length).toEqual(1);
expect(wrapper.find('i').length).toEqual(1);
done();
});
});
