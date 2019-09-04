import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Input from '../index';

describe('<Input />', () => {
  it('should render and match the snapshot', () => {
    const {
      container: { firstChild }
    } = render(<Input type='input' placeholder='name' />);
    expect(firstChild).toMatchSnapshot();
  });

  it('should render placeholder label', () => {
    const placeholder = 'name'
    const { container } = render(
      <Input
        type='input'
        placeholder={placeholder}
      />
    )
    const label = container.querySelector('label')
    expect(label).toHaveTextContent(placeholder)
  });
});
