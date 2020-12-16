import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import SampleMovie from '../pages/SampleMovie';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/upload" component={SampleMovie} />
        <Route exact path="/account" component={SampleMovie} />
        <Route exact path="/movie" component={SampleMovie} />
      </Switch>
    </BrowserRouter>
  );
}
