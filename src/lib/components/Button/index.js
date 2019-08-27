import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled, { css, withTheme } from 'styled-components';
import Theme, { getContrastYIQ } from '../../theme';

/**
 * add Button type ( primary, ghost, success...) and html type ( disables ) props
 *
 */
const Button = ({ onClick, href, children, theme, ...rest }) => {
    let button = (
        <StyledButton onClick={onClick} { ...rest }>
            {Children.toArray(children)}
        </StyledButton>
    )

    if (href) {
        button = (
            <A href={href} onClick={onClick} { ...rest }>
                {Children.toArray(children)}
            </A>
        )
    }

    return <Wrapper>{button}</Wrapper>
};

Button.propTypes = {
    href: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired
}

Button.defaultProps = {
    theme: Theme.styles,
    text: '',
    onClick: () => {},
    theme: Theme.styles
};

export default withTheme(Button);

const buttonStyles = css`
    display: inline-block;
    box-sizing: border-box;
    padding: 0.25em 2em;
    text-decoration: none;
    border-radius: 4px;
    -webkit-font-smoothing: antialiased;
    -webkit-touch-callout: none;
    user-select: none;
    cursor: pointer;
    outline: 0;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: bold;
    font-size: 16px;
    border: 2px solid #41addd;
    color: #41addd;

    &:active {
        background: #41addd;
        color: #fff;
    }
`
const A = styled.div`
    ${buttonStyles};
`
const StyledButton = styled.button`
  ${buttonStyles};
`
const Wrapper = styled.div`
  width: 100%;
  text-align: center;
  margin: 4em 0;
`


const Shape = styled.button`
    height: ${props => (props.height ? props.height + 'px' : '30px')};
    min-width: 30px;
    min-height: 30px;
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors[getContrastYIQ(props.theme.colors.primary)]};
    border: 0;
    border-radius: ${props => props.theme.borders.radius + 'px'};
    outline: none;
    padding: ${props => (props.circular ? '0' : '0 10px')};
    cursor: pointer;
    flex-shrink: 0;
    &:hover {
        opacity: 0.9;
    }
    &:active {
        opacity: 0.9;
    }
`;
const Inner = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
