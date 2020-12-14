import { MdArrowBack, MdArrowForward } from 'react-icons/md';

import { Container, Header, Brand, NavBar, MenuList, MenuItem, Main, TitleCategory, VideoCarrosel, VideoList, VideoItem } from './styles';

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
        <VideoCarrosel>
          <button onClick={() => document.getElementById("ListVideo1").scrollLeft -= 300}>
            <MdArrowBack size={32} color="white" />
          </button>
          <VideoList id="ListVideo1">
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
          <button onClick={() => document.getElementById("ListVideo1").scrollLeft += 300}>
            <MdArrowForward size={32} color="white" />
          </button>
        </VideoCarrosel>
      </Main>
    </Container>
  );
}
