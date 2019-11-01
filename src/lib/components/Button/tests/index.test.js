import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Button from '../index';

describe('<Button />', () => {
  it('Should render and match the snapshot', () => {
    const { asFragment } = render(<Button />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render children if label prop is provided', () => {
    const label = 'Submit';
    const children = 'Clear';
    const {
      container: { firstChild: buttonWithTextProps }
    } = render(<Button label={label} />);
    const {
      container: { firstChild: buttonWithChildren }
    } = render(
      <Button label={label}>
        <span>{children}</span>
      </Button>
    );

    expect(buttonWithTextProps).toHaveTextContent(label);
    expect(buttonWithChildren).toHaveTextContent(children);
  });

  it('Should render primary button if kind is not valid', () => {
    const { container: button1 } = render(
      <Button kind='kind-not-valid' label='Not Valid' />
    );
    const { container: button2 } = render(
      <Button kind='not-valid-kind'>Not Valid</Button>
    );

    expect(button1).toStrictEqual(button2);
  });

  it('should render button with disabled attribute', () => {
    const { container } = render(
      <Button kind='primary' label='disabled' disabled />
    );
    const button = container.querySelector('button');
    expect(button).toHaveAttribute('disabled');
  });
});
