import React, { useState } from 'react';
import { Switch, Route, Redirect, HashRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { useIdleTimer } from 'react-idle-timer';

import theme from './utils/theme';
import Login from './screens/login/Login';
import Dashboard from './screens/dashboard/Dashboard';
import AdminPanel from './screens/adminPanel/AdminPanel';
import TeamBoxDetails from './screens/boxDetails/TeamBoxDetails';
import SingleBoxDetails from './screens/boxDetails/SingleBoxDetails';
import MyReservations from './screens/myReservations/MyReservations';
import { strings } from './localization/localization';

function App() {
  const [loggedUser, setLoggedUser] = useState(
    localStorage.getItem('token') ? localStorage.getItem('token') : null
  );
  const [newNotification, setNewNotification] = useState(false);
  const [language, setLanguage] = useState(
    localStorage.getItem('language') ? localStorage.getItem('language') : 'hr'
  );

  const handleChangeLanguage = (event) => {
    if (event.target.checked) {
      setLanguage('en');
    } else {
      setLanguage('hr');
    }
  };

  strings.setLanguage(language);
  localStorage.setItem('language', language);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');

    setLoggedUser(null);
  };

  const handleOnIdle = (event) => {
    console.log('User is IDLE');
    console.log('Last active', getLastActiveTime());

    handleLogout();
  };

  const handleOnActive = (event) => {
    console.log('User is active', event);
    console.log('Time remaining', getRemainingTime());
  };

  const handleOnAction = (event) => {
    // console.log("User did something", event);
  };

  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 60 * 30,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 500,
    crossTab: {
      emitOnAllTabs: true,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <Switch>
          <Route exact path='/'>
            <Redirect to='login' />
          </Route>
          <Route exact path='/login'>
            {loggedUser ? (
              <Redirect to='dashboard' />
            ) : (
              <Login
                setLoggedUser={setLoggedUser}
                handleChangeLanguage={handleChangeLanguage}
              />
            )}
          </Route>
          <Route exact path='/dashboard'>
            {loggedUser ? (
              <Dashboard
                newNotification={newNotification}
                setNewNotification={setNewNotification}
                setLoggedUser={setLoggedUser}
                handleLogout={handleLogout}
                handleChangeLanguage={handleChangeLanguage}
              />
            ) : (
              <Redirect to='login' />
            )}
          </Route>
          <Route exact path='/adminPanel'>
            {loggedUser ? (
              <AdminPanel
                newNotification={newNotification}
                setNewNotification={setNewNotification}
                setLoggedUser={setLoggedUser}
                handleLogout={handleLogout}
                handleChangeLanguage={handleChangeLanguage}
              />
            ) : (
              <Redirect to='login' />
            )}
          </Route>
          <Route path='/teamBox/:id/reservations/:selectedDate'>
            {loggedUser ? (
              <TeamBoxDetails
                newNotification={newNotification}
                setNewNotification={setNewNotification}
                setLoggedUser={setLoggedUser}
                handleLogout={handleLogout}
                handleChangeLanguage={handleChangeLanguage}
              />
            ) : (
              <Redirect to='/login' />
            )}
          </Route>
          <Route path='/singleBox/:id/reservations/:selectedDate'>
            {loggedUser ? (
              <SingleBoxDetails
                newNotification={newNotification}
                setNewNotification={setNewNotification}
                setLoggedUser={setLoggedUser}
                handleLogout={handleLogout}
                handleChangeLanguage={handleChangeLanguage}
              />
            ) : (
              <Redirect to='/login' />
            )}
          </Route>
          <Route path='/myReservations'>
            {loggedUser ? (
              <MyReservations
                newNotification={newNotification}
                setNewNotification={setNewNotification}
                setLoggedUser={setLoggedUser}
                handleLogout={handleLogout}
                handleChangeLanguage={handleChangeLanguage}
              />
            ) : (
              <Redirect to='/login' />
            )}
          </Route>
        </Switch>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
