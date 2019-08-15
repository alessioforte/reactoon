import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme, ThemeProvider } from 'styled-components';
import Theme, { getContrastYIQ } from '../../theme';
import Icon from '../Icon';

class Checkbox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.checked
        };

        this.setValue = this.setValue.bind(this);
    }

    setValue(e) {
        let value = !this.state.value;
        let data = { checked: value, label: this.props.label };
        this.setState({ value });
        this.props.onChange(e, data);
    }

    render() {
        const { label, theme } = this.props;
        const { value } = this.state;

        return (
            <ThemeProvider theme={theme}>
                <Box onClick={this.setValue}>
                    <Check check={value}>
                        <Icon
                            name='checkmark'
                            size={8}
                            color={theme.colors[getContrastYIQ(theme.colors.primary)]}
                        />
                    </Check>
                    {label && <Label>{label}</Label>}
                </Box>
            </ThemeProvider>
        );
    }
}

Checkbox.propTypes = {
    label: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func
};

Checkbox.defaultProps = {
    checked: false,
    label: null,
    onChange: () => {},
    theme: Theme.styles
};

export default withTheme(Checkbox);

const Box = styled.div`
    display: inline-flex;
    align-items: center;
    cursor: pointer;
`;
const Check = styled.div`
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    border-radius: 3px;
    background: ${props => (props.check ? props.theme.colors.primary : props.theme.colors.background)};
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        opacity: 0.8;
    }
    & svg {
        opacity: ${props => (props.check ? 1 : 0)};
    }
`;
const Label = styled.div`
    display: inline-block;
    margin-left: 5px;
`;
