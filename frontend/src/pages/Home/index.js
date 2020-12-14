import { Container, Header, Brand, NavBar, MenuList, MenuItem } from './styles';

export default function Home() {
  return (
    <Container>
      <Header>
        <NavBar>
          <Brand>Stream</Brand>
          <MenuList>
            <MenuItem> Home </MenuItem>
            <MenuItem> Upload </MenuItem>
            <MenuItem> Users </MenuItem>
          </MenuList>
        </NavBar>
      </Header>
    </Container>
  );
}
