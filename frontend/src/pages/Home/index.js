// import { MdArrowBack, MdArrowForward } from 'react-icons/md';
// import { Container, Main, VideoBox, VideoTitleCategory, VideoCarrosel, VideoList, VideoItem } from './styles';
//
// import thumbnailDefault from '../../assets/img/thumbnail_default.png';
// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// require('dotenv').config();
//
// export default function Home() {
//
//   const [themes, setTheme] = useState([]);
//   const [thumbnail, setThumbnail] = useState([]);
//
//   // call values in Themes (Category)
//   useEffect(() => {
//
//     async function themesAll(){
//         axios.get(`http://localhost:3333/theme`, {
//         headers: {
//           'Authorization': 'Bearer 1c92o83n74a65n'
//         }
//         })
//         .then(res => {
//           setTheme(res.data);
//         });
//     }
//
//     async function thumbnailAll(){
//       axios.get(`http://localhost:3333/thumbnail`, {
//       headers: {
//         'Authorization': 'Bearer 1c92o83n74a65n'
//       }
//       })
//       .then(res => {
//         setThumbnail(res.data);
//       });
//   }
//
//     themesAll();
//     thumbnailAll();
//
//   }, [])
//   //console.log(thumbnail);
//   return (
//     <Container>
//       <Main>
//       {themes.map((videoItem) => {
//           return (
//             <VideoBox key={videoItem.id}>
//               <VideoTitleCategory> {videoItem.title} </VideoTitleCategory>
//               <VideoCarrosel>
//                 <button onClick={() => document.getElementById(videoItem.id).scrollLeft -= 300}>
//                   <MdArrowBack size={32} color="white" />
//                 </button>
//
//                 <VideoList id={videoItem.id}>
//                   {videoItem.videos.map((list) => {
//                     let img = '';
//                     thumbnail.forEach(image => {
//                       if(videoItem.id === image.video_id){
//                         img = image.image[0].url;
//                       }
//                     })
//                     return (
//                       <VideoItem key={list.id}>
//                         <img src={img || thumbnailDefault} alt={videoItem.title} />
//                       </VideoItem>
//                     );
//                   })}
//                 </VideoList>
//
//                 <button onClick={() => document.getElementById(videoItem.id).scrollLeft += 300}>
//                   <MdArrowForward size={32} color="white" />
//                 </button>
//               </VideoCarrosel>
//             </VideoBox>
//           );
//         })}
//
//       </Main>
//     </Container>
//   );
// }


import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AppsIcon from '@material-ui/icons/Apps';
import IconButton from '@material-ui/core/IconButton';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {Link} from "react-router-dom";
import {Typography} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });


  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({...state, [anchor]: open});
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
            <ListItemText primary={text}/>
          </ListItem>
        ))}
      </List>
      <Divider/>
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
            <ListItemText primary={text}/>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const responsive = {
    desktop: {
      breakpoint: {max: 3000, min: 1024},
      items: 3,
      paritialVisibilityGutter: 60
    },
    tablet: {
      breakpoint: {max: 1024, min: 464},
      items: 2,
      paritialVisibilityGutter: 50
    },
    mobile: {
      breakpoint: {max: 464, min: 0},
      items: 1,
      paritialVisibilityGutter: 30
    }
  };
  const images = [
    "https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1550133730-695473e544be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1550167164-1b67c2be3973?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1550338861-b7cfeaf8ffd8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1550223640-23097fc71cb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1550353175-a3611868086b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1550330039-a54e15ed9d33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1549737328-8b9f3252b927?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1549833284-6a7df91c1f65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1549985908-597a09ef0a7c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1550064824-8f993041ffd3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
  ];

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          {/*<Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>*/}
          <IconButton color="primary" onClick={toggleDrawer(anchor, true)} aria-label="add to shopping cart">
            <AppsIcon style={{fontSize: '50px'}} color="secondary"/>
          </IconButton>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}


      <Box textAlign="center" m={1}>
        <Typography variant="h4" gutterBottom>
          Paisagens

        </Typography>
        <TextField id="outlined-basic" label="Pesquisar" variant="outlined" style={{marginBottom: "10px"}}/>
      </Box>
      <Fab color="secondary" aria-label="add" style={{margin: "10px"}}>
        <AddIcon/>
      </Fab>
      <Carousel
        ssr={false}
        partialVisbile
        itemClass="image-item"
        responsive={responsive}
      >
        {images.map((image, index) => {

          return (
            <Link to="/">
              <div key={index} style={{position: "relative"}}>
                <img
                  draggable={false}
                  alt="text"
                  style={{width: "550px", height: "300px", boxShadow: "10px 10px 10px  black"}}
                  src={image}
                />
                <p
                  style={{
                    position: "absolute",
                    left: "47.5%",
                    bottom: 0,
                    color: "white",
                    transform: " translateX(-50%)",
                    background: "black",
                    width: "550px",
                    textAlign: "center",
                    opacity: "0.7",
                    ":hover": {
                      width: "50px", height: "30px",
                    }
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Paisagens
                  </Typography>
                </p>
              </div>
            </Link>
          );

        })}
      </Carousel>
      <Divider style={{marginBottom: "60px"}}/>
      <Box textAlign="center" m={1}>
        <Typography variant="h4" gutterBottom>
          Vegetação

        </Typography>
        <TextField id="outlined-basic" label="Pesquisar" variant="outlined" style={{marginBottom: "10px"}}/>
      </Box>
      <Fab color="secondary" aria-label="add" style={{margin: "10px"}}>
        <AddIcon/>
      </Fab>
      <Carousel
        ssr={false}
        partialVisbile
        itemClass="image-item"
        responsive={responsive}
      >
        {images.map((image, index) => {

          return (
            <Link to="/">
              <div key={index} style={{position: "relative"}}>
                <img
                  draggable={false}
                  alt="text"
                  style={{width: "550px", height: "300px", boxShadow: "10px 10px 10px  black"}}
                  src={image}
                />
                <p
                  style={{
                    position: "absolute",
                    left: "47.5%",
                    bottom: 0,
                    color: "white",
                    transform: " translateX(-50%)",
                    background: "black",
                    width: "550px",
                    textAlign: "center",
                    opacity: "0.7",
                    ":hover": {
                      width: "50px", height: "30px",
                    }
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Vegetação
                  </Typography>
                </p>
              </div>
            </Link>
          );

        })}
      </Carousel>
      <Divider style={{marginBottom: "60px"}}/>
      <Box textAlign="center" m={1}>
        <Typography variant="h4" gutterBottom>
          Meio Ambiente

        </Typography>
        <TextField id="outlined-basic" label="Pesquisar" variant="outlined" style={{marginBottom: "10px"}}/>
      </Box>
      <Fab color="secondary" aria-label="add" style={{margin: "10px"}}>
        <AddIcon/>
      </Fab>
      <Carousel
        ssr={false}
        partialVisbile
        itemClass="image-item"
        responsive={responsive}
      >
        {images.map((image, index) => {

          return (
            <Link to="/">
              <div key={index} style={{position: "relative"}}>
                <img
                  draggable={false}
                  alt="text"
                  style={{width: "550px", height: "300px", boxShadow: "10px 10px 10px  black"}}
                  src={image}
                />
                <p
                  style={{
                    position: "absolute",
                    left: "47.5%",
                    bottom: 0,
                    color: "white",
                    transform: " translateX(-50%)",
                    background: "black",
                    width: "550px",
                    textAlign: "center",
                    opacity: "0.7",
                    ":hover": {
                      width: "50px", height: "30px",
                    }
                  }}
                >
                  <Typography variant="h6" gutterBottom>
                    Meio Ambiente
                  </Typography>
                </p>
              </div>
            </Link>
          );

        })}
      </Carousel>
      <Divider style={{marginBottom: "60px"}}/>
    </div>

  );
}
