import React from 'react';
import Header from './Header';

const Layout = ({ children, user, setUser }) => {
  return (
    <div>
      <Header user={user} setUser={setUser} />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
