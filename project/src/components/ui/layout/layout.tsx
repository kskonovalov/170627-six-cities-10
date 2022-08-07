import React from 'react';
import {Outlet} from 'react-router-dom';

import Header from '../header/header';
import Footer from '../footer/footer';
import Error from '../error/error';
import {useAppSelector} from '../../../hooks/redux-hooks';

const Layout = () => {
  const {error} = useAppSelector((state) => state);
  return (
    <>
      <Header/>
      {error !== null && <Error message={error}/>}
      <Outlet/>
      <Footer/>
    </>
  );
};

export default Layout;
