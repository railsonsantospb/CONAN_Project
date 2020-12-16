import { MdArrowBack, MdArrowForward } from 'react-icons/md';

import { Container, Main, VideoBox, VideoTitleCategory, VideoCarrosel, VideoList, VideoItem } from './styles';

import thumbnailDefault from '../../assets/img/thumbnail_default.png';
import apiVideos from '../../services/api-videos.json';

export default function Home() {

  return (
    <Container>
      <Main>
        {apiVideos.map((videoItem) => {
          return (
            <VideoBox key={videoItem.id}>
              <VideoTitleCategory> {videoItem.category} </VideoTitleCategory>
              <VideoCarrosel>
                <button onClick={() => document.getElementById(videoItem.id).scrollLeft -= 300}>
                  <MdArrowBack size={32} color="white" />
                </button>

                <VideoList id={videoItem.id}>
                  {videoItem.list_videos.map((list) => {
                    return (
                      <VideoItem key={list.id}>
                        <img src={list.thumbnail || thumbnailDefault} alt={list.title} />
                      </VideoItem>
                    );
                  })}
                </VideoList>

                <button onClick={() => document.getElementById(videoItem.id).scrollLeft += 300}>
                  <MdArrowForward size={32} color="white" />
                </button>
              </VideoCarrosel>
            </VideoBox>
          );
        })}

      </Main>
    </Container>
  );
}
