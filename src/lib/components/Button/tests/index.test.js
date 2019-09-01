import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Button from '../index';

describe('<Button />', () => {
  it('Should render and match the snapshot', () => {
    const { asFragment } = render(<Button />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render children if text prop is provided', () => {
    const text = 'Submit';
    const children = 'Clear';
    const {
      container: { firstChild: buttonWithTextProps }
    } = render(<Button text={text} />);
    const {
      container: { firstChild: buttonWithChildren }
    } = render(
      <Button text={text}>
        <span>{children}</span>
      </Button>
    );

    expect(buttonWithTextProps).toHaveTextContent(text);
    expect(buttonWithChildren).toHaveTextContent(children);
  });

  it('Should render primary button if status is not valid', () => {
    const { container: button1 } = render(
      <Button status='status-not-valid' text='Not Valid' />
    );
    const { container: button2 } = render(
      <Button status='not-valid-status'>Not Valid</Button>
    );

    expect(button1).toStrictEqual(button2);
  });

  it('should render button with disabled attribute', () => {
    const { container } = render(
      <Button status='primary' text='disabled' disabled />
    );
    const button = container.querySelector('button');
    expect(button).toHaveAttribute('disabled');
  });
});
