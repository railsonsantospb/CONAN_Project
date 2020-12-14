import styled from 'styled-components';

export const Container = styled.div`

`;

export const Header = styled.header`
  width: 100%;
  background-color: #333;
`;

export const NavBar = styled.nav`
  max-width: 1080px;
  height: 60px;
  margin: 0 auto;
  padding: 0 10px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Brand = styled.div`

`;

export const MenuList = styled.ul`
  list-style: none;
`;

export const MenuItem = styled.li`
  display: inline;
  margin-left: 10px;
`;


export const Main = styled.main`
  max-width: 1080px;
  margin: 50px auto 0;
  padding: 0 10px;

  display: flex;
  flex-direction: column;
`;

export const TitleCategory = styled.h2`

`;

export const VideoCarrosel = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    width: 40px;
    height: 40px;
    margin: 5px;
    background-color: transparent;
    border: none;
    outline: none;

    &:hover {
      cursor: pointer;
    }

    &:active {
      background-color: #555;
    }
  }
`;

export const VideoList = styled.ul`
  width: 100%;
  overflow-y: hidden;
  overflow-x: scroll;
  overscroll-behavior-x: initial;
  scroll-behavior: smooth;
  display: flex;
  flex-direction: row;
  list-style: none;
`;

export const VideoItem = styled.li`
  margin: 4px;
  video {
    width: 300px;
    height: 200px;
    background-color: #111;
  }

  video + video {
    margin-left: 10px;
  }
`;
