import React from 'react';
import styled, { withTheme } from 'styled-components';
import Theme, { getContrastYIQ } from '../../theme';

const Button = ({ height, text, onClick, children, theme }) => {
    return (
        <Shape onClick={onClick} theme={theme}>
            {<Inner>{children || text}</Inner>}
        </Shape>
    );
};

Button.defaultProps = {
    theme: Theme.styles,
    text: '',
    onClick: () => {}
};

export default withTheme(Button);

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
