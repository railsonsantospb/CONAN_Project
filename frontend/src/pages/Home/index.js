import { Container, Header, Brand, NavBar, MenuList, MenuItem, Main, TitleCategory, VideoList, VideoItem } from './styles';

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
      <Main>
        <TitleCategory> Filmes </TitleCategory>
        <VideoList>
          <VideoItem>
            <video width="320" height="240" controls>
              <source src="movie.mp4" type="video/mp4" />
              <source src="movie.ogg" type="video/ogg" />
            Your browser does not support the video tag.
            </video>
          </VideoItem>
          <VideoItem>
            <video width="320" height="240" controls>
              <source src="movie.mp4" type="video/mp4" />
              <source src="movie.ogg" type="video/ogg" />
            Your browser does not support the video tag.
            </video>
          </VideoItem>
          <VideoItem>
            <video width="320" height="240" controls>
              <source src="movie.mp4" type="video/mp4" />
              <source src="movie.ogg" type="video/ogg" />
            Your browser does not support the video tag.
            </video>
          </VideoItem>
          <VideoItem>
            <video width="320" height="240" controls>
              <source src="movie.mp4" type="video/mp4" />
              <source src="movie.ogg" type="video/ogg" />
            Your browser does not support the video tag.
            </video>
          </VideoItem>
        </VideoList>
      </Main>
    </Container>
  );
}
