import Commments from '../model/Commments';
import moment from 'moment';



export default {
  render(comment: Commments) {
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