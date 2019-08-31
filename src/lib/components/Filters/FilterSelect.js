import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, withTheme } from 'styled-components';
import Theme, { getContrastYIQ } from '../../theme';
import { Caret, Delete } from '../../icons';
import {
  Block,
  Button,
  Drop,
  List,
  Selected,
  Head,
  Placeholder,
  Icon,
  Control,
  Option,
  IsSelected
} from './styled';

class FilterSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      values: [],
      selected: [],
      position: {}
    };

    this.placeholder = props.placeholder || 'select...';
    this.options = props.options || [];
    this.dropdown = React.createRef();
    this.content = React.createRef();
    this.hide = this.hide.bind(this);
    this.blur = this.blur.bind(this);
    this.show = this.show.bind(this);
    this.close = this.close.bind(this);

    this.selectAll = this.selectAll.bind(this);
    this.unselectAll = this.unselectAll.bind(this);
  }

  componentDidMount() {
    this.setDropdownPosition();
  }

  setDropdownPosition() {
    let rect = this.dropdown.current.getBoundingClientRect();
    let position = {
      top: '0',
      left: '0',
      right: null,
      bottom: null
    };

    if (rect.x + 200 > window.innerWidth) {
      position.left = null;
      position.right = '0';
    }

    if (rect.bottom + 400 > window.innerHeight) {
      position.top = null;
      position.bottom = '0';
    }

    this.setState({ position });
  }

  show(e) {
    this.setDropdownPosition();

    if (!this.state.visible) {
      this.setState({ visible: true });
      document.addEventListener('click', this.hide);
      window.addEventListener('blur', this.blur);
    }
  }

  blur() {
    this.setState({ visible: false });
    document.removeEventListener('click', this.hide);
    window.removeEventListener('blur', this.blur);
  }

  hide(e) {
    var rect = this.content.current.getBoundingClientRect();
    var x = e.clientX;
    var y = e.clientY;
    if (y < rect.top || y > rect.bottom || x < rect.left || x > rect.right) {
      this.setState({ visible: false });
      document.removeEventListener('click', this.hide);
      window.removeEventListener('blur', this.blur);
    }
  }

  close() {
    this.setState({ visible: false });
    document.removeEventListener('click', this.hide);
    window.removeEventListener('blur', this.blur);
  }

  select(e, item) {
    let selected = this.state.selected;
    let values = this.state.values;
    selected.push(item);
    values.push(item.value);

    this.setState({
      selected,
      values
    });

    this.props.onChange(values);
  }

  selectAll(e) {
    let all = [...this.options];
    let values = all.map(item => item.value);

    this.setState({
      selected: all,
      values
    });

    this.props.onChange(values);
  }

  unselectAll(e) {
    this.setState({
      selected: [],
      values: []
    });

    this.props.onChange([]);
  }

  unselect(e, item) {
    e.stopPropagation();

    let sIndex = this.state.selected.indexOf(item);
    let selected = this.state.selected;
    selected.splice(sIndex, 1);

    let vIndex = this.state.values.indexOf(item.value);
    let values = this.state.values;
    values.splice(vIndex, 1);

    this.setState({
      selected,
      values
    });

    this.props.onChange(values);
  }

  renderSelected() {
    const { selected } = this.state;
    const { theme } = this.props;

    return selected.map((item, i) => (
      <div key={`${item}-${i}`}>
        {item.text}
        <div onClick={e => this.unselect(e, item)}>
          <Delete
            size={8}
            color={theme.colors[getContrastYIQ(theme.colors.primary)]}
            margin='0 0 0 8px'
          />
        </div>
      </div>
    ));
  }

  render() {
    const { isError, theme } = this.props;
    const { visible, position, selected } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <Block ref={this.dropdown}>
          {selected.length > 0 && <IsSelected />}
          <Button onClick={this.show} isError={isError}>
            <Placeholder>{this.placeholder}</Placeholder>
            <Icon>
              <Caret
                size={8}
                color={theme.colors[getContrastYIQ(theme.colors.background)]}
              />
            </Icon>
          </Button>
          {visible && (
            <Drop position={position} ref={this.content}>
              <Head>
                <Placeholder>{this.placeholder}</Placeholder>
                <Icon>
                  <Caret
                    size={8}
                    color={
                      theme.colors[getContrastYIQ(theme.colors.background)]
                    }
                  />
                </Icon>
              </Head>
              <Control reverse={position.top ? true : false}>
                <Selected>{this.renderSelected()}</Selected>
                {selected.length === 0 ? (
                  <div className='button' onClick={this.selectAll}>
                    All
                  </div>
                ) : (
                  <div className='button' onClick={this.unselectAll}>
                    Reset
                  </div>
                )}
              </Control>
              <List reverse={position.top ? true : false}>
                {this.options &&
                  this.options.map((item, i) => {
                    let isSelected = selected.includes(item);
                    return (
                      <Option
                        key={`${item.value}-${i}`}
                        isSelected={isSelected}
                        onClick={
                          isSelected
                            ? e => this.unselect(e, item)
                            : e => this.select(e, item)
                        }
                      >
                        {item.text}
                      </Option>
                    );
                  })}
              </List>
            </Drop>
          )}
        </Block>
      </ThemeProvider>
    );
  }
}

FilterSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired
};

FilterSelect.defaultProps = {
  placeholder: 'select...',
  onChange: () => {},
  theme: Theme.styles
};

export default withTheme(FilterSelect);
