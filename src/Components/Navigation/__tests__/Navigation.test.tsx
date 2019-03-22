import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Navigation from '../View';

describe('Navigation component', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<BrowserRouter><Navigation /></BrowserRouter>);
  });

  it('should exists', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe('links', () => {
    let links: ReactWrapper;

    beforeEach(() => {
      links = wrapper.find("NavLink");
    })

    it('should have home link', () => {
      const homeLink = links.filterWhere(el => el.contains('Home'));

      expect(homeLink.exists()).toBeTruthy();
      expect(homeLink).toHaveProp('to', '/');
    });

    it('should have podcasts link', () => {
      const podcastsLink = links.filterWhere(el => el.contains('Podcasts'));

      expect(podcastsLink.exists()).toBeTruthy();
      expect(podcastsLink).toHaveProp('to', '/podcasts');
    });
  })
})

export {
  // Use an empty export to please Babel's single file emit.
  // https://github.com/Microsoft/TypeScript/issues/15230
}