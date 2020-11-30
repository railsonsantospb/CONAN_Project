import Thumbnail from '../model/Thumbnail';
import imageView from '../views/image_views';


export default {
  render(thumbnail: Thumbnail) {
    return {
      id: thumbnail.id,
      video_id: thumbnail.video_id,
      image: imageView.renderMany(thumbnail.image)
    }
  },
  renderMany(thumbnails: Thumbnail[]) {
    return thumbnails.map(thumbnail => this.render(thumbnail))
  }
}