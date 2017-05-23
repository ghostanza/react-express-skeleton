import React from 'react';
import {shallow} from 'enzyme';
import App from '../components/App';

describe('<App />', () => {
  it('says Testing', () => {
    const component = shallow(<App />);

    expect(component.text()).toEqual('Testing');
  })

});
