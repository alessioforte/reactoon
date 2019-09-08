import React from 'react';
import { render } from '@testing-library/react';
import Checkbox from '../index';

describe('<Checkbox />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild }
    } = render(<Checkbox />);
    expect(firstChild).toMatchSnapshot();
  });
});
