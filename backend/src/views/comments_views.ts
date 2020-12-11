import Comments from '../model/Comments';
import moment from 'moment';



export default {
  render(comment: Comments) {
    return {
      id: comment.id,
      comment: comment.comments,
      date: moment(parseFloat(comment.date)).format("DD-MM-YYYY h:mm:ss"),
      video_id: comment.video_id,
    }
  },
  renderMany(comments: Comments[]) {
    return comments.map(comment => this.render(comment));
  }
}