import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import SampleMovie from '../pages/SampleMovie';
import UploadFile from '../pages/UploadFile';
import Account from '../pages/Account';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/upload" component={UploadFile} />
      <Route exact path="/account" component={Account} />
      <Route exact path="/movie" component={SampleMovie} />
    </Switch>
  );
}
