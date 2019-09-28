import React from 'react';
import { render } from '@testing-library/react';
import Tag from '../';

describe('<Tag />', () => {
  it('should render and match the snapshop', () => {
    const {
      container: { firstChild }
    } = render(<Tag label='test' />);
    expect(firstChild).toMatchSnapshot();
  });
});
