import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  alpha,
} from '@material-ui/core';

import Topbar from '../../components/topbar/Topbar';
import Footer from '../../components/footer/Footer';
import Menu from '../../components/menu/Menu';
import Projekti from './Projekti';
import ServerError from '../../components/messages/error/ServerError';
import Rezervacije from './Rezervacije';
import RadniProstori from './RadniProstori';
import KorisnickeOvlasti from './KorisnickeOvlasti';
import { strings } from '../../localization/localization';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    top: 64,
    [theme.breakpoints.down('sm')]: {
      top: 60,
    },
    right: 0,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - 300px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 'auto',
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    fontSize: theme.font.fontSize.large,
  },
  container: {
    height: 'calc(100vh - 158px)',
    [theme.breakpoints.down('sm')]: {
      height: 'calc(100% - 145px)',
    },
  },
  tabTitle: {
    marginTop: 10,
    fontWeight: 500,
  },
  content: {
    marginTop: 64,
    flexGrow: 1,
    height: '100%',
    overflow: 'auto',
  },
  datepickerText: {
    color: alpha('#000000', 0.54),
    fontSize: theme.font.fontSize.large,
    whiteSpace: 'nowrap',
  },
  inputProp: {
    fontSize: theme.font.fontSize.medium,
  },
  form: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  formSearch: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: theme.spacing(2),
  },
  addButton: {
    marginLeft: theme.spacing(2),
  },
  spacing: {
    marginLeft: theme.spacing(2),
  },
  formControl: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginBottom: theme.spacing(2),
  },
  paper: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  root: {
    display: 'flex',
  },
  select: {
    marginLeft: theme.spacing(3),
  },
  contentBody: {
    flexGrow: 1,
    alignItems: 'center',
  },
  submit: {
    margin: theme.spacing(2, 0),
    fontSize: theme.font.fontSize.large,
  },
  center: {
    margin: 0,
    top: '50%',
    left: '50%',
  },
  editForm: {
    marginTop: theme.spacing(1),
  },
  singleTeamButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  alertIcon: {
    '& .MuiAlert-message': {
      fontSize: theme.font.fontSize.medium,
    },
    '& .MuiAlert-icon': {
      fontSize: 20,
    },
  },
}));

export default function AdminPanel({
  newNotification,
  setNewNotification,
  setLoggedUser,
  handleLogout,
  handleChangeLanguage,
}) {
  let selectedLanguage = strings.getLanguage();
  const classes = useStyles();
  const [isDashboardMenuOpen, setIsDashboardMenuOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(
    localStorage.getItem('selectedTab')
      ? localStorage.getItem('selectedTab')
      : strings.getLanguage() === 'en'
        ? 'Reservations'
        : 'Rezervacije'
  );
  const [errorOccurred, setErrorOccurred] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (selectedTab === 'Reservations' && selectedLanguage === 'hr') {
      setSelectedTab('Rezervacije');
    }
    if (selectedTab === 'Rezervacije' && selectedLanguage === 'en') {
      setSelectedTab('Reservations');
    }

    if (selectedTab === 'Workspaces' && selectedLanguage === 'hr') {
      setSelectedTab('Radni prostori');
    }
    if (selectedTab === 'Radni prostori' && selectedLanguage === 'en') {
      setSelectedTab('Workspaces');
    }

    if (selectedTab === 'User authorities' && selectedLanguage === 'hr') {
      setSelectedTab('Korisničke ovlasti');
    }
    if (selectedTab === 'Korisničke ovlasti' && selectedLanguage === 'en') {
      setSelectedTab('User authorities');
    }

    if (selectedTab === 'Projects' && selectedLanguage === 'hr') {
      setSelectedTab('Projekti');
    }
    if (selectedTab === 'Projekti' && selectedLanguage === 'en') {
      setSelectedTab('Projects');
    }
  }, [selectedLanguage]);

  const handleDrawerOpen = () => {
    setIsDashboardMenuOpen(true);
  };
  const handleDrawerClose = () => {
    setIsDashboardMenuOpen(false);
  };

  const handleClickOnItem = (text) => {
    localStorage.setItem('selectedTab', text);
    setSelectedTab(text);
  };

  const setInitialErrorOccurred = (errorHappened) => {
    setErrorOccurred(true);
  };

  return (
    <>
      <Topbar
        newNotification={newNotification}
        setNewNotification={setNewNotification}
        setLoggedUser={setLoggedUser}
        handleLogout={handleLogout}
        handleChangeLanguage={handleChangeLanguage}
      />

      <div className={classes.root}>
        <AppBar
          position='absolute'
          className={clsx(
            classes.appBar,
            isDashboardMenuOpen && classes.appBarShift
          )}
        >
          <Toolbar className={classes.toolbar}>
            <Typography
              component='h1'
              variant='h6'
              color='inherit'
              noWrap
              className={classes.title}
            >
              {strings.formatString(strings.adminPanelTitle)}
            </Typography>
            <IconButton
              edge='start'
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                isDashboardMenuOpen && classes.menuButtonHidden
              )}
            >
              <MenuOpenIcon fontSize='large' />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Menu
          isDashboardMenuOpen={isDashboardMenuOpen}
          handleDrawerClose={handleDrawerClose}
          handleClickOnItem={handleClickOnItem}
        />
        {errorOccurred ? (
          <ServerError />
        ) : (
          <main className={classes.content}>
            <Container
              className={classes.container}
              component='main'
              maxWidth='xl'
            >
              <>
                {selectedTab ===
                  strings.formatString(strings.menuItemReservations) && (
                    <Rezervacije
                      classes={classes}
                      setInitialErrorOccurred={setInitialErrorOccurred}
                      user={user.username}
                    />
                  )}
                {selectedTab ===
                  strings.formatString(strings.menuItemWorkspaces) && (
                    <RadniProstori
                      classes={classes}
                      setInitialErrorOccurred={setInitialErrorOccurred}
                      user={user.username}
                    />
                  )}
                {selectedTab ===
                  strings.formatString(strings.menuItemProjects) && (
                    <Projekti
                      classes={classes}
                      setInitialErrorOccurred={setInitialErrorOccurred}
                      user={user.username}
                    />
                  )}
                {selectedTab ===
                  strings.formatString(strings.menuItemUserAuthorities) && (
                    <KorisnickeOvlasti
                      classes={classes}
                      setInitialErrorOccurred={setInitialErrorOccurred}
                      user={user.username}
                    />
                  )}
              </>
            </Container>
          </main>
        )}
      </div>
      <Footer />
    </>
  );
}
