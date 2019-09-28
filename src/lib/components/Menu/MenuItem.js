const MenuItem = props => {
  const [state, setState] = useState(false);
  let count = 0;

  if (props.submenu) {
    count = props.submenu.length;
    props.submenu.forEach(x => {
      if (x.submenu) count += x.submenu.length;
    });
  }

  return (
    <Wrapper onBlur={() => setState(false)} tabIndex='-1'>
      <First
        isOpen={state}
        onClick={() => props.submenu && setState(!state)}
        href={props.link}
      >
        {props.label}
        {props.submenu && (
          <Rotate isOpen={state}>
            <Icon name='arrow-down' size='9px' />
          </Rotate>
        )}
      </First>
      <Submenu isOpen={state} count={count}>
        {props.submenu &&
          props.submenu.map(second => (
            <div key={second.label}>
              <Second isOpen={true} href={second.link}>
                {second.label}
              </Second>
              {second.submenu &&
                second.submenu.map(third => (
                  <Third key={third.label} isOpen={true} href={third.link}>
                    {third.label}
                  </Third>
                ))}
            </div>
          ))}
      </Submenu>
    </Wrapper>
  );
};

const Wrapper = styled.li`
  &:focus {
    outline: none;
  }
`;
const Rotate = styled.span`
  transform: ${props => (props.isOpen ? 'rotate(180deg)' : null)};
  transition: all 0.7s cubic-bezier(0.86, 0, 0.07, 1);
  svg {
    fill: ${props => (props.isOpen ? theme.colors.hovermenusection : null)};
  }
`;
const Item = styled.a`
  box-sizing: border-box;
  background: ${props => (props.isOpen ? '#fafafa' : 'trasparent')};
  color: ${props =>
    props.isOpen ? theme.colors.hovermenusection : theme.colors.white};
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;
const First = styled(Item)`
  font-weight: bold;
  height: 60px;
  padding: 0 2rem;
  border-left: 5px solid ${props => (props.isOpen ? '#E31013' : 'transparent')};
`;
const Second = styled(Item)`
  height: 32px;
  padding-left: 3rem;
  &:hover {
    background: lightgray;
  }
`;
const Third = styled(Item)`
  height: 32px;
  margin-left: 3rem;
  padding-left: 1rem;
  border-left: 5px solid lightgray;
  &:hover {
    background: lightgray;
  }
`;
const Submenu = styled.div`
  box-sizing: border-box;
  height: ${props => (props.isOpen ? `${props.count * 32 + 32}px` : '0px')};
  overflow: hidden;
  transition: all 0.7s cubic-bezier(0.86, 0, 0.07, 1);
  border-left: 5px solid #e31013;
  background: #fafafa;
`;
/* eslint-enable */
