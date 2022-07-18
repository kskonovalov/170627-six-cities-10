import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Room from '../../pages/room/room';
import NotFound from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route';
import Layout from '../ui/layout/layout';
import ScrollTop from '../ux/scroll-top';
import {AppRoute} from '../../const';
import {offerType} from '../../mocks/offers';

type AppProps = {
  offers: offerType[]
}

const App = ({offers}: AppProps) => (
  <BrowserRouter>
    <ScrollTop />
    <Routes>
      <Route path={AppRoute.Main} element={<Layout/>}>
        <Route index element={<Main offers={offers}/>}/>
        <Route path={AppRoute.Login} element={<Login/>}/>
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute>
            <Favorites offers={offers}/>
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.Room} element={<Room/>}/>
        <Route path={AppRoute.NotFound} element={<NotFound/>}/>
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
