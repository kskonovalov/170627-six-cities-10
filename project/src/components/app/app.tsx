import {BrowserRouter, Route, Routes} from 'react-router-dom';

import {AppRoute} from '../../const';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Room from '../../pages/room/room';
import NotFound from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route';
import {OfferType} from '../../mocks/offers';

type AppTypes = {
  Offers: OfferType[]
}

const App = ({Offers}: AppTypes) => (
  <BrowserRouter>
    <Routes>
      <Route path={AppRoute.Main} element={<Main Offers={Offers}/>}/>
      <Route path={AppRoute.Login} element={<Login/>}/>
      <Route path={AppRoute.Favorites} element={
        <PrivateRoute>
          <Favorites/>
        </PrivateRoute>
      }
      />
      <Route path={AppRoute.Room} element={<Room/>}/>
      <Route path={AppRoute.NotFound} element={<NotFound/>}/>
    </Routes>
  </BrowserRouter>
);

export default App;
