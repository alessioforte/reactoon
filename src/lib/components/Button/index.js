import React, { Children } from "react";
import PropTypes from "prop-types";
import styled, { css, withTheme, ThemeProvider } from "styled-components";
import Theme, { getContrastYIQ } from "../../theme";

/**
 * add Button type ( default, primary, ghost, success, error, warning, light, dark )
 * and html type ( disables ) props
 *
 */
const Button = ({ status, onClick, href, children, theme, ...rest }) => {
  let button = (
    <StyledButton className={status} onClick={onClick} {...rest}>
      {Children.toArray(children)}
    </StyledButton>
  );

  if (href) {
    button = (
      <A className={status} href={href} onClick={onClick} {...rest}>
        {Children.toArray(children)}
      </A>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>{button}</Wrapper>
    </ThemeProvider>
  );
};

Button.propTypes = {
  status: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired
};

Button.defaultProps = {
  status: "default",
  text: "",
  onClick: () => {},
  theme: Theme.styles
};

export default withTheme(Button);

const buttonStyles = css`
  height: ${props => (props.height ? props.height + "px" : "30px")};
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
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: bold;
  font-size: 16px;
  border: 2px solid ${props => props.theme.colors.primary};
  color: ${props =>
    props.theme.colors[getContrastYIQ(props.theme.colors.primary)]};
  &:active {
    opacity: 0.9;
  }
`;
const A = styled.a`
  ${buttonStyles};
`;
const StyledButton = styled.button`
  ${buttonStyles};
`;
const Wrapper = styled.div`
  width: 100%;
  text-align: center;
  margin: 4em 0;
  .default,
  .primary {
    background: ${props => props.theme.colors.primary};
    border: 2px solid ${props => props.theme.colors.primary};
  }
  .success {
    background: ${props => props.theme.colors.success};
    border: 2px solid ${props => props.theme.colors.success};
  }
  .error {
    background: ${props => props.theme.colors.error};
    border: 2px solid ${props => props.theme.colors.error};
  }
  .ghost {
    background: ${props => props.theme.colors.error};
    border: 2px solid ${props => props.theme.colors.error};
  }
  .warning {
    background: ${props => props.theme.colors.warning};
    border: 2px solid ${props => props.theme.colors.warning};
  }
`;
