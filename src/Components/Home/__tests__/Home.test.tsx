import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Home from '../View';

describe('Home component', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<Home />);
  });

  it('should exists', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should match snapshot', () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });
})

export {
  // Use an empty export to please Babel's single file emit.
  // https://github.com/Microsoft/TypeScript/issues/15230
}