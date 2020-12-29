import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import { Container, Main, VideoBox, VideoTitleCategory, VideoCarrosel, VideoList, VideoItem } from './styles';

import thumbnailDefault from '../../assets/img/thumbnail_default.png';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
require('dotenv').config();

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

    async function thumbnailAll(){
      axios.get(`http://localhost:3333/thumbnail`, {
      headers: {
        'Authorization': 'Bearer 1c92o83n74a65n'
      }
      })
      .then(res => {
        setThumbnail(res.data);  
      });
  }

    themesAll();
    thumbnailAll();

  }, [])
  //console.log(thumbnail);
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
                    let img = '';
                    thumbnail.forEach(image => {
                      if(videoItem.id === image.video_id){
                        img = image.image[0].url;
                      }
                    })
                    return (
                      <VideoItem key={list.id}>
                        <img src={img || thumbnailDefault} alt={videoItem.title} />
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
