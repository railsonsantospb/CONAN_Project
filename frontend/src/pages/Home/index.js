import { MdArrowBack, MdArrowForward } from 'react-icons/md';

import { Container, Main, VideoBox, VideoTitleCategory, VideoCarrosel, VideoList, VideoItem } from './styles';

import thumbnailDefault from '../../assets/img/thumbnail_default.png';
import apiVideos from '../../services/api-videos.json';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function Home() {

  const [themes, setTheme] = useState([]);
  const [thumbnail, setThumbnail] = useState([]);

  // call values in Themes (Category)
  useEffect(() => {

    async function themesAll(){
        axios.get(`http://localhost:3333/theme`, {
        headers: {
          'Authorization': 'Bearer 1c92o83n74a65n'
        }
        })
        .then(res => {
          setTheme(res.data);  
        });
    }

    themesAll();

  }, [])
  console.log(themes);
  return (
    <Container>
      <Main>
      {themes.map((videoItem) => {
          return (
            <VideoBox key={videoItem.id}>
              <VideoTitleCategory> {videoItem.title} </VideoTitleCategory>
              <VideoCarrosel>
                <button onClick={() => document.getElementById(videoItem.id).scrollLeft -= 300}>
                  <MdArrowBack size={32} color="white" />
                </button>

                <VideoList id={videoItem.id}>
                  {videoItem.videos.map((list) => {
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
