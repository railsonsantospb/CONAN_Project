import Videos from '../model/Videos';
import dotenv from 'dotenv';

dotenv.config();

export default {
  render(video: Videos) {
    return {
      id: video.id,
      url: process.env.URL + `${video.path}`,
    }
  },
  renderMany(videos: Videos[]) {
    return videos.map(video => this.render(video))
  }
}