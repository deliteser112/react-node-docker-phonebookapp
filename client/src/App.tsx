import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Users from './containers/ActiveUsers';
import Navbar from './components/Navbar';

const ManageUsers = React.lazy(() => import('./containers/ManageUsers'));

const App = () => {
  return (
    <div className="container mt-3">
      <Router>
        <Navbar />
        <Route path="/" exact component={Users} />
        <Route path="/manage">
          <Suspense fallback={<div>...Loading</div>}>
            <ManageUsers />
          </Suspense>
        </Route>
      </Router>
    </div>
  );
};

export default App;
