import { MdHome, MdCloudUpload, MdSupervisorAccount, MdArrowBack, MdArrowForward } from 'react-icons/md';

import { Container, Header, Brand, NavBar, MenuList, MenuItem, Main, VideoBox, VideoTitleCategory, VideoCarrosel, VideoList, VideoItem } from './styles';

export default function Home() {
  return (
    <Container>
      <Header>
        <NavBar>
          <Brand>Stream</Brand>
          <MenuList>
            <MenuItem>
              <MdHome size={22} color="white" />
            </MenuItem>
            <MenuItem>
              <MdCloudUpload size={22} color="white" />
            </MenuItem>
            <MenuItem>
              <MdSupervisorAccount size={22} color="white" />
            </MenuItem>
          </MenuList>
        </NavBar>
      </Header>
      <Main>
        <VideoBox>
          <VideoTitleCategory> Filmes </VideoTitleCategory>
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
        </VideoBox>

        <VideoBox>
          <VideoTitleCategory> Séries </VideoTitleCategory>
          <VideoCarrosel>
            <button onClick={() => document.getElementById("ListVideo2").scrollLeft -= 300}>
              <MdArrowBack size={32} color="white" />
            </button>
            <VideoList id="ListVideo2">
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
            <button onClick={() => document.getElementById("ListVideo2").scrollLeft += 300}>
              <MdArrowForward size={32} color="white" />
            </button>
          </VideoCarrosel>
        </VideoBox>

      </Main>
    </Container>
  );
}
