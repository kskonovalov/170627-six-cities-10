import {BrowserRouter, Route, Routes} from "react-router-dom";

import Main from '../../pages/main/main';
import {AppRoute} from "../../const";

function App(): JSX.Element {
  return <BrowserRouter>
    <Routes>
      <Route path={AppRoute.Main} element={<Main offersCount={123}/>}/>
    </Routes>
  </BrowserRouter>
}

export default App;
