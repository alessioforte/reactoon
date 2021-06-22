/* eslint-disable */
import React, { useState } from 'react';
import styled from 'styled-components';
import { SideBar } from './lib';
import * as components from './components';

export default () => {
  const [state, setState] = useState('carousel');

  return (
    <Preview>
      <SideBar
        isWide
        renderHeader={() => (
          <MenuHeader>
            <span>REACTOON</span>
          </MenuHeader>
        )}
        renderMenu={() => (
          <MenuItems>
            {Object.keys(components).map(key => (
              <MenuItem key={key} onClick={() => setState(key)}>
                {key.toUpperCase()}
              </MenuItem>
            ))}
          </MenuItems>
        )}
      ></SideBar>
      <Body>
        {state && (
          <div>
            <Header>
              <h3>{state.toUpperCase()}</h3>
            </Header>
            <Container>
              {components[state] ? components[state]() : <div>Reactoon</div>}
            </Container>
          </div>
        )}
      </Body>
    </Preview>
  );
};

const Body = styled.div`
  flex-grow: 1;
  overflow: scroll;
`;
const Preview = styled.div`
  display: flex;
  max-height: 100vh;
`;
const MenuHeader = styled.div`
  height: 60px;
  background: darkgray;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  & > span {
    cursor: pointer;
  }
`;
const MenuItems = styled.div`
  box-sizing: border-box;
  padding: 10px 0;
`;
const MenuItem = styled.div`
  color: white;
  padding: 10px;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;
const Header = styled.div`
  box-sizing: border-box;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 10px;
`;
const Container = styled.div`
  box-sizing: border-box;
`;

// const longContent = `Beethoven, Mozart, Chopin, Liszt, Brahms, Panties...I'm sorry...Schumann, Schubert, Mendelssohn and Bach. Names that will live for ever. But there is one composer whose name is never included with the greats. Why is it that the world never remembered the name of Johann Gambolputty de von Ausfern- schplenden- schlitter- crasscrenbon- fried- digger- dingle- dangle- dongle- dungle- burstein- von- knacker- thrasher- apple- banger- horowitz- ticolensic- grander- knotty- spelltinkle- grandlich- grumblemeyer- spelterwasser- kurstlich- himbleeisen- bahnwagen- gutenabend- bitte- ein- nürnburger- bratwustle- gerspurten- mitz- weimache- luber- hundsfut- gumberaber- shönedanker- kalbsfleisch- mittler- aucher von Hautkopft of Ulm? To do justice to this man, thought by many to be the greatest name in German Baroque music, we present a profile of Johann Gambolputty de von Ausfern- schplenden- schlitter- crasscrenbon- fried- digger- dingle- dangle- dongle- dungle- burstein- von- knacker- thrasher- apple- banger- horowitz- ticolensic- grander- knotty- spelltinkle- grandlich- grumblemeyer- spelterwasser- kurstlich- himbleeisen- bahnwagen- gutenabend- bitte- ein- nürnburger- bratwustle- gerspurten- mitz- weimache- luber- hundsfut- gumberaber- shönedanker- kalbsfleisch- mittler- aucher von Hautkopft of Ulm. We start with an interview with his only surviving relative Karl Gambolputty de von Ausfern...`
