import Theme from '../model/Theme';
import videoView from '../views/videos_views';


export default {
  render(theme: Theme) {
    return {
      id: theme.id,
      title: theme.title,
      videos: videoView.renderMany(theme.videos)
    }
  },
  renderMany(themes: Theme[]) {
    return themes.map(theme => this.render(theme))
  }
}