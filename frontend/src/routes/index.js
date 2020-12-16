import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import SampleMovie from '../pages/SampleMovie';
import UploadFile from '../pages/UploadFile';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/upload" component={UploadFile} />
        <Route exact path="/account" component={SampleMovie} />
        <Route exact path="/movie" component={SampleMovie} />
      </Switch>
    </BrowserRouter>
  );
}
