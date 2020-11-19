import Videos from '../model/Videos';
import moment from 'moment';

export default {
  render(video: Videos) {
    return {
      id: video.id,
      title: video.title,
      url: process.env.URL + `${video.path}`,
      about: video.about,
      path: video.path,
      date: moment(parseFloat(video.date)).format("DD-MM-YYYY h:mm:ss")

    }
  },
  renderMany(videos: Videos[]) {
    return videos.map(video => this.render(video))
  }
}