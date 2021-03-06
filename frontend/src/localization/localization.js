import LocalizedStrings from 'react-localization';

export const strings = new LocalizedStrings({
  en: {
    //Topbar locale
    topbatToggleNotification: 'Toggle notification panel.',

    //Navigation locale
    navigationItemDashboardText: 'Dashboard',
    navigationItemMyReservationsText: 'My reservations',
    navigationItemAdminPanelText: 'Admin panel',
    navigationItemLogoutText: 'Logout',

    //Sign in locale
    signInTitle: 'Sign in',
    signInEmail: 'E-mail address',
    signInPassword: 'Password',
    signInEmailError: 'Please enter valid e-mail address!',
    signInEmailRequired: 'This field is required!',
    signInPasswordRequired: 'This field is required!',
    signInAlert: 'Error',
    signInError: 'E-mail or password is invalid. Please try again!',
    signInButton: 'Sign in',

    //Dashboard locale
    dashboardToggleLegend: 'Toggle Gallery legend.',
    dashboardCalendar: 'Calendar',
    dashboardInvalidDateMessage: 'Invalid date format!',
    dashboardGalleryLegendTitle: 'Gallery legend',

    //BoxCard locale
    boxCardToggleTeamBoxType: 'Team box',
    boxCardToggleSingleBoxType: 'Single box',
    boxCardDetails: 'Details',
    boxCardGalleryLegendTitle: 'Gallery',

    //TeamBoxDetails locale
    teamBoxDetailsTitle: ' | TEAM | Reservations',
    teamBoxDetailsReserveFromLabel: 'Reserve from:',
    teamBoxDetailsReserveUntilLabel: 'Reserve until:',
    teamBoxDetailsChooseTeamLabel: 'Choose team',
    teamBoxDetailsReserveButton: 'Reserve',
    teamBoxDetailsWrongReservedUntilDate:
      'The end date cannot be earlier than the start date of the reservation.',
    teamBoxDetailsWrongReservedUntilFrom:
      'The start date cannot be later than the end date of the reservation.',
    teamBoxDetailsInvalidReservationPeriod:
      'The team workspace can be booked for a maximum of 14 days.',
    teamBoxDetailsInvalidTeam:
      'You have not selected the team for which you want to reserve workspace.',
    teamBoxDetailsTeamLabel: 'Team',
    teamBoxDetailsTeamReservationInIntervalExist:
      'has a reservation in the period',
    teamBoxDetailsBoxLabel: 'Box',
    teamBoxDetailsBoxReservationInIntervalExist: 'is reserved in the period',
    teamBoxDetailsSuccessfulReservationFirstPart: 'Your reservation for Box',
    teamBoxDetailsSuccessfulReservationSecondPart: 'in period',
    teamBoxDetailsSuccessfulReservationThirdPart:
      'has been saved successfully.',

    //SingleBoxDetails locale
    singleBoxDetailsTitle: ' | SINGLE | Reservations',
    singleDetailsReserveFromLabel: 'Reserve from:',
    singleDetailsReserveUntilLabel: 'Reserve until:',
    singleDetailsReserveButton: 'Reserve',
    singleBoxDetailsWrongReservedUntilDate:
      'The end date cannot be earlier than the start date of the reservation.',
    singleDetailsWrongReservedUntilFrom:
      'The start date cannot be later than the end date of the reservation.',
    singleBoxDetailsInvalidReservationPeriod:
      'The single box can be booked for a maximum of 31 day.',
    singleBoxDetailsInPeriodLabel: 'In period',
    singleBoxDetailsTeamReservationInIntervalExist:
      'you already have an active reservation',
    singleBoxDetailsWorkplaceLabel: 'Workplace',
    singleBoxDetailsWorkplaceReservationInIntervalExist:
      'is reserved in the period',
    singleBoxDetailsSuccessfulReservationFirstPart:
      'Your reservation for Workplace',
    singleBoxDetailsSuccessfulReservationSecondPart: 'in Box',
    singleBoxDetailsSuccessfulReservationThirdPart: 'in period',
    singleBoxDetailsSuccessfulReservationFourthPart:
      'has been saved successfully.',

    //Notification locale
    notificationMessage: 'Reservation | Box',

    //MyReservations locale
    myReservationsTitle: 'My reservations',
    myReservationsTableViewLabel: 'Table view',
    myReservationsCalendarViewLabel: 'Calendar view',
    myReservationsFilterTypeLabel: 'Type:',
    myReservationsFilterTypeSingle: 'Single box',
    myReservationsFilterTypeTeam: 'Team box',
    myReservationsFilterTypeAllTypesLabel: 'All types',
    myReservationsFilterWorkplaceLabel: 'Workplace:',
    myReservationsFilterWorkplaceAllWorkplacesLabel: 'All workplaces',
    myReservationsFilterReservedFromLabel: 'Reserved from:',
    myReservationsFilterReservedUntilLabel: 'Reserved until:',
    myReservationsDeleteButton: 'Delete selected',
    myReservationsSchedulerHeaderWorkplace: 'Workplace',
    myReservationsSchedulerHeaderType: 'Type',
    myReservationsSchedulerHeaderReservedFrom: 'Reserved from',
    myReservationsSchedulerHeaderReservedUntil: 'Reserved until',
    myReservationsSchedulerHeaderDelete: 'Delete',
    myReservationsDeleteMessageTitle: 'Delete reservation',
    myReservationsDeleteMessageText:
      'Are you sure that you want delete selected reservation?',
    myReservationsDeleteSelectedMessageTitle: 'Delete reservations',
    myReservationsDeleteSelectedMessageText:
      'Are you sure that you want delete selected reservations?',
    myReservationsFilterSearchMessageTitle: 'No items found',
    myReservationsFilterSearchMessageText:
      'There are no results for specified filter.',

    //Menu for Admin panel locale
    menuItemReservations: 'Reservations',
    menuItemWorkspaces: 'Workspaces',
    menuItemUserAuthorities: 'User authorities',
    menuItemProjects: 'Projects',

    //Admin panel locale
    adminPanelTitle: 'Admin panel',
    adminPanelSingleReservationsTitle: 'All reservations | Single reservations',
    adminPanelTeamReservationsTitle: 'All reservations | Team reservations',
    adminPanelReservationsSingleTab: 'Single',
    adminPanelReservationsHeaderTeamTab: 'Team',
    adminPanelReservationsFilterFrom: 'From:',
    adminPanelReservationsFilterUntil: 'Until:',
    adminPanelReservationsFilterSearch: 'Search:',
    adminPanelReservationsDeleteButton: 'Delete selected',
    adminPanelReservationsHeaderEmployee: 'Employee',
    adminPanelReservationsHeaderBox: 'Box',
    adminPanelReservationsHeaderProjectTeam: 'Project - Team',
    adminPanelReservationsHeaderReservedFrom: 'Reserved from',
    adminPanelReservationsHeaderReservedUntil: 'Reserved until',
    adminPanelReservationsHeaderDelete: 'Delete',
    adminPanelReservationsDeleteMessageTitle: 'Delete reservation',
    adminPanelReservationsDeleteMessageText:
      'Are you sure that you want delete selected reservation?',
    adminPanelBoxesTitle: 'Workspaces | All Workspaces',
    adminPanelBoxesFilterSearch: 'Search:',
    adminPanelFilterSearchMessageTitle: 'No items found',
    adminPanelFilterSearchMessageText:
      'There are no results for specified filter.',
    adminPanelBoxesDeleteButton: 'Delete selected',
    adminPanelBoxesHeaderBox: 'Workspace',
    adminPanelBoxesHeaderBoxType: 'Workspace type',
    adminPanelBoxesHeaderCapacity: 'Capacity',
    adminPanelBoxesHeaderEdit: 'Edit',
    adminPanelBoxesHeaderDelete: 'Delete',
    adminPanelUserAuthoritiesTitle: 'User-Team roles | All User-Team roles',
    adminPanelUserAuthoritiesHeaderModerator: 'Moderator',
    adminPanelUserAuthoritiesHeaderProjectTeam: 'Project - team',
    adminPanelUserAuthoritiesHeaderDelete: 'Delete',
    adminPanelProjectsTitle: 'Teams | All Teams',
    adminPanelProjectsHeaderTeamName: 'Project name',
    adminPanelProjectsHeaderEdit: 'Edit',
    adminPanelProjectsHeaderDelete: 'Delete',
    adminPanelEditBoxTitle: 'Edit workplace',
    adminPanelEditBoxName: 'Box name',
    adminPanelEditBoxType: 'Box type',
    adminPanelEditBoxCapacity: 'Box capacity',
    adminPanelEditBoxSaveButton: 'Save',
    adminPanelEditBoxCancelButton: 'Cancel',
    adminPanelBoxesDeleteMessageTitle: 'Delete workplace',
    adminPanelBoxesDeleteMessageText:
      'Are you sure that you want delete selected workplace?',
    adminPanelBoxesDeleteSelectedMessageTitle: 'Delete workplaces',
    adminPanelBoxesDeleteSelectedMessageText:
      'Are you sure that you want delete selected workplaces?',
    adminPanelUserAuthoritiesDeleteMessageTitle: 'Delete authority',
    adminPanelUserAuthoritiesDeleteMessageText:
      'Are you sure that you want delete selected user authority?',
    adminPanelUserAuthoritiesDeleteSelectedMessageTitle: 'Delete authorities',
    adminPanelUserAuthoritiesDeleteSelectedMessageText:
      'Are you sure that you want delete selected user authorities?',
    adminPanelEditTeamTitle: 'Edit team',
    adminPanelEditUserTeam: 'Team name',
    adminPanelEditTeamSaveButton: 'Save',
    adminPanelEditTeamCancelButton: 'Cancel',
    adminPanelTeamDeleteMessageTitle: 'Delete project',
    adminPanelTeamDeleteMessageText:
      'Are you sure that you want delete selected project?',
    adminPanelTeamDeleteSelectedMessageTitle: 'Delete projects',
    adminPanelTeamDeleteSelectedMessageText:
      'Are you sure that you want delete selected projects?',
    adminPanelCreateBoxTitle: 'Create workplace',
    adminPanelCreateBoxBoxName: 'Workplace name',
    adminPanelCreateBoxBoxType: 'Workplace type',
    adminPanelCreateBoxBoxCapacity: 'Workplace capacity',
    adminPanelCreateBoxSaveButton: 'Save',
    adminPanelCreateBoxCancelButton: 'Cancel',
    adminPanelCreateUserAuhtorityTitle: 'Add User auhtority',
    adminPanelCreateUserAuhtorityUser: 'User',
    adminPanelCreateUserAuhtorityTeam: 'Project team',
    adminPanelCreateUserAuhtoritySaveButton: 'Save',
    adminPanelCreateUserAuhtorityCancelButton: 'Cancel',
    adminPanelCreateTeamTitle: 'Create team',
    adminPanelCreateTeamName: 'Team name',
    adminPanelCreateTeamSaveButton: 'Save',
    adminPanelCreateTeamCancelButton: 'Cancel',

    //Server error locale
    serverErrorMessageTitle: 'Service is currently unavailable.',
    serverErrorMessageText: 'Please try again later!',

    //Additional
    createOvlastUserLabel: 'User',
    createOvlastTeamLabel: 'Team',
    dialogYes: 'Yes',
    dialogNo: 'No',
    allUsersLabel: 'All Users',
    allTeamsLabel: 'All Teams',
    myReservationsDeleteLabel:
      'Delete of selected reservation has been successful.',
    myReservationsSelectedDeleteLabel:
      'Delete of selected reservation has been successful.',
    workspaceDeleteLabel: 'Delete of selected workspace has been successful.',
    workspaceSelectedDeleteLabel:
      'Delete of selected workspaces has been successful.',
    workspaceCreateLabel: 'Workspace has been successfully created.',
    workspaceEditLabel: 'Workspace has been successfully edited.',
    projectDeleteLabel: 'Delete of selected project has been successful.',
    projectSelectedDeleteLabel:
      'Delete of selected projects has been successful.',
    projectCreateLabel: 'Project has been successfully created.',
    projectEditLabel: 'Project has been successfully edited.',
    userAuthorityDeleteLabel:
      'Delete of selected user authority has been successful.',
    userAuthoritySelectedDeleteLabel:
      'Delete of selected user authorities has been successful.',
    userAuthorityCreateLabel: 'User authority has been successfully created.',
    userAuthorityEditLabel: 'User authority has been successfully edited.',

    //Footer locale
    footerTitle: 'King Academy 2021. All rights reserved',
  },
  hr: {
    //Topbar locale
    topbatToggleNotification: 'Otvorite panel s obavijestima.',

    //Navigation locale
    navigationItemDashboardText: 'Dashboard',
    navigationItemMyReservationsText: 'Moje rezervacije',
    navigationItemAdminPanelText: 'Admin panel',
    navigationItemLogoutText: 'Odjava',

    //Sign in locale
    signInTitle: 'Prijava',
    signInEmail: 'E-mail adresa',
    signInPassword: 'Lozinka',
    signInEmailError: 'Unesite validnu e-mail adresu!',
    signInEmailRequired: 'Ovo polje je obavezno!',
    signInPasswordRequired: 'Ovo polje je obavezno!',
    signInAlert: 'Pogre??ka',
    signInError: 'E-mail ili lozinka su pogre??ni. Poku??ajte ponovno!',
    signInButton: 'Prijavi se',

    //Dashboard locale
    dashboardToggleLegend: 'Otvorite legendu Galerije.',
    dashboardCalendar: 'Kalendar',
    dashboardInvalidDateMessage: 'Pogre??an format datuma!',
    dashboardGalleryLegendTitle: 'Legenda Galerije',

    //BoxCard locale
    boxCardToggleTeamBoxType: 'Timski box',
    boxCardToggleSingleBoxType: 'Pojedina??ni box',
    boxCardDetails: 'Detalji',
    boxCardGalleryLegendTitle: 'Galerija',

    //TeamBoxDetails locale
    teamBoxDetailsTitle: ' | TIMSKI | Rezervacije',
    teamBoxDetailsReserveFromLabel: 'Rezerviraj od:',
    teamBoxDetailsReserveUntilLabel: 'Rezerviraj do:',
    teamBoxDetailsChooseTeamLabel: 'Odaberi tim',
    teamBoxDetailsReserveButton: 'Rezerviraj',
    teamBoxDetailsWrongReservedUntilDate:
      'Krajnji datum ne mo??e biti raniji od po??etnog datuma rezervacije.',
    teamBoxDetailsWrongReservedUntilFrom:
      'Po??etni datum ne mo??e biti kasniji od krajnjeg datuma rezervacije.',
    teamBoxDetailsInvalidReservationPeriod:
      'Timski prostor se mo??e rezervirati na maksimalno 14 dana.',
    teamBoxDetailsInvalidTeam:
      'Niste odabrali tim za koji ??elite rezervirati radni prostor.',
    teamBoxDetailsTeamLabel: 'Tim',
    teamBoxDetailsTeamReservationInIntervalExist: 'ima rezervaciju u periodu',
    teamBoxDetailsBoxLabel: 'Box',
    teamBoxDetailsBoxReservationInIntervalExist: 'je zauzet u periodu',
    teamBoxDetailsSuccessfulReservationFirstPart: 'Va??a rezervacija za Box',
    teamBoxDetailsSuccessfulReservationSecondPart: 'u periodu',
    teamBoxDetailsSuccessfulReservationThirdPart: 'je uspje??no spremljena.',

    //SingleBoxDetails locale
    singleBoxDetailsTitle: ' | POJEDINA??NI | Rezervacije',
    singleDetailsReserveFromLabel: 'Rezerviraj od:',
    singleDetailsReserveUntilLabel: 'Rezerviraj do:',
    singleDetailsReserveButton: 'Rezerviraj',
    singleBoxDetailsWrongReservedUntilDate:
      'Krajnji datum ne mo??e biti raniji od po??etnog datuma rezervacije.',
    singleDetailsWrongReservedUntilFrom:
      'Po??etni datum ne mo??e biti kasniji od krajnjeg datuma rezervacije.',
    singleBoxDetailsInvalidReservationPeriod:
      'Radno mjesto se mo??e rezervirati na maksimalno 31 dan.',
    singleBoxDetailsInPeriodLabel: 'U periodu',
    singleBoxDetailsTeamReservationInIntervalExist:
      've?? imate aktivnu rezervaciju',
    singleBoxDetailsWorkplaceLabel: 'Radno mjesto',
    singleBoxDetailsWorkplaceReservationInIntervalExist:
      'je rezervirano u periodu',
    singleBoxDetailsSuccessfulReservationFirstPart:
      'Va??a rezervacija za radno mjesto',
    singleBoxDetailsSuccessfulReservationSecondPart: 'u Box-u',
    singleBoxDetailsSuccessfulReservationThirdPart: 'u periodu',
    singleBoxDetailsSuccessfulReservationFourthPart: 'je uspje??no spremljena.',

    //Notification locale
    notificationMessage: 'Rezervacija | Box',

    //MyReservations locale
    myReservationsTitle: 'Moje rezervacije',
    myReservationsTableViewLabel: 'Tabli??ni prikaz',
    myReservationsCalendarViewLabel: 'Kalendarski prikaz',
    myReservationsFilterTypeLabel: 'Tip:',
    myReservationsFilterTypeSingle: 'Pojedina??ni box',
    myReservationsFilterTypeTeam: 'Timski box',
    myReservationsFilterTypeAllTypesLabel: 'Svi tipovi',
    myReservationsFilterWorkplaceLabel: 'Radni prostor:',
    myReservationsFilterWorkplaceAllWorkplacesLabel: 'Svi radni prostori',
    myReservationsFilterReservedFromLabel: 'Rezervirano od:',
    myReservationsFilterReservedUntilLabel: 'Rezervirano do:',
    myReservationsDeleteButton: 'Obri??i ozna??eno',
    myReservationsSchedulerHeaderWorkplace: 'Radni prostor',
    myReservationsSchedulerHeaderType: 'Tip',
    myReservationsSchedulerHeaderReservedFrom: 'Rezervirano od',
    myReservationsSchedulerHeaderReservedUntil: 'Rezervirano do',
    myReservationsSchedulerHeaderDelete: 'Obri??i',
    myReservationsDeleteMessageTitle: 'Obri??i rezervaciju',
    myReservationsDeleteMessageText:
      'Jeste li sigurni da ??elite obrisati odabranu rezervaciju?',
    myReservationsDeleteSelectedMessageTitle: 'Obri??i rezervacije',
    myReservationsDeleteSelectedMessageText:
      'Jeste li sigurni da ??elite obrisati odabrane rezervacije?',
    myReservationsFilterSearchMessageTitle: 'Nema rezultata',
    myReservationsFilterSearchMessageText:
      'Nisu prona??eni zapisi za zadani filter.',

    //Menu for Admin panel locale
    menuItemReservations: 'Rezervacije',
    menuItemWorkspaces: 'Radni prostori',
    menuItemUserAuthorities: 'Korisni??ke ovlasti',
    menuItemProjects: 'Projekti',

    //Admin panel locale
    adminPanelTitle: 'Admin panel',
    adminPanelSingleReservationsTitle:
      'Sve rezervacije | Pojedina??ne rezervacije',
    adminPanelTeamReservationsTitle: 'Sve rezervacije | Timske rezervacije',
    adminPanelReservationsSingleTab: 'Pojedina??ne',
    adminPanelReservationsHeaderTeamTab: 'Timske',
    adminPanelReservationsFilterFrom: 'Od:',
    adminPanelReservationsFilterUntil: 'Do:',
    adminPanelReservationsFilterSearch: 'Pretra??i:',
    adminPanelReservationsDeleteButton: 'Obri??i ozna??eno',
    adminPanelReservationsHeaderEmployee: 'Zaposlenik',
    adminPanelReservationsHeaderBox: 'Box',
    adminPanelReservationsHeaderProjectTeam: 'Projekt - tim',
    adminPanelReservationsHeaderReservedFrom: 'Rezervirano od',
    adminPanelReservationsHeaderReservedUntil: 'Rezervirano do',
    adminPanelReservationsHeaderDelete: 'Obri??i',
    adminPanelReservationsDeleteMessageTitle: 'Obri??i rezervaciju',
    adminPanelReservationsDeleteMessageText:
      'Jeste li sigurni da ??elite obrisati odabranu rezervaciju?',
    adminPanelReservationsDeleteSelectedMessageTitle: 'Obri??i rezervacije',
    adminPanelReservationsDeleteSelectedMessageText:
      'Jeste li sigurni da ??elite obrisati odabrane rezervacije?',
    adminPanelBoxesTitle: 'Radni prostori | Svi radni prostori',
    adminPanelBoxesFilterSearch: 'Pretra??i:',
    adminPanelFilterSearchMessageTitle: 'Nema rezultata',
    adminPanelFilterSearchMessageText:
      'Nisu prona??eni zapisi za zadani filter.',
    adminPanelBoxesDeleteButton: 'Obri??i ozna??eno',
    adminPanelBoxesHeaderBox: 'Radni prostor',
    adminPanelBoxesHeaderBoxType: 'Tip radnog prostora',
    adminPanelBoxesHeaderCapacity: 'Kapacitet',
    adminPanelBoxesHeaderEdit: 'Uredi',
    adminPanelBoxesHeaderDelete: 'Obri??i',
    adminPanelUserAuthoritiesTitle:
      'Korisni??ke ovlasti | Sve korisni??ke ovlasti',
    adminPanelUserAuthoritiesHeaderModerator: 'Moderator',
    adminPanelUserAuthoritiesHeaderProjectTeam: 'Projekt - tim',
    adminPanelUserAuthoritiesHeaderDelete: 'Obri??i',
    adminPanelProjectsTitle: 'Projekti | Svi projekti',
    adminPanelProjectsHeaderTeamName: 'Naziv projekta',
    adminPanelProjectsHeaderEdit: 'Uredi',
    adminPanelProjectsHeaderDelete: 'Obri??i',
    adminPanelEditBoxTitle: 'Uredi radni prostor',
    adminPanelEditBoxName: 'Naziv radnog prostora',
    adminPanelEditBoxType: 'Tip radnog prostora',
    adminPanelEditBoxCapacity: 'Kapacitet radnog prostora',
    adminPanelEditBoxSaveButton: 'Spremi',
    adminPanelEditBoxCancelButton: 'Odustani',
    adminPanelBoxesDeleteMessageTitle: 'Obri??i radni prostor',
    adminPanelBoxesDeleteMessageText:
      'Jeste li sigurni da ??elite obrisati odabrani radni prostor?',
    adminPanelBoxesDeleteSelectedMessageTitle: 'Obri??i radne prostore',
    adminPanelBoxesDeleteSelectedMessageText:
      'Jeste li sigurni da ??elite obrisati odabrane radne prostore?',
    adminPanelUserAuthoritiesDeleteMessageTitle: 'Obri??i korisni??ku ovlast',
    adminPanelUserAuthoritiesDeleteMessageText:
      'Jeste li sigurni da ??elite obrisati odabranu korisni??ku ovlast?',
    adminPanelUserAuthoritiesDeleteSelectedMessageTitle:
      'Obri??i korisni??ke ovlasti',
    adminPanelUserAuthoritiesDeleteSelectedMessageText:
      'Jeste li sigurni da ??elite obrisati odabrane korisni??ke ovlasti?',
    adminPanelEditTeamTitle: 'Uredi tim',
    adminPanelEditUserTeam: 'Naziv tima',
    adminPanelEditTeamSaveButton: 'Spremi',
    adminPanelEditTeamCancelButton: 'Odustani',
    adminPanelTeamDeleteMessageTitle: 'Obri??i projekt',
    adminPanelTeamDeleteMessageText:
      'Jeste li sigurni da ??elite obrisati odabrani projekt?',
    adminPanelTeamDeleteSelectedMessageTitle: 'Obri??i projekte',
    adminPanelTeamDeleteSelectedMessageText:
      'Jeste li sigurni da ??elite obrisati odabrane projekte?',
    adminPanelCreateBoxTitle: 'Kreiraj radni prostor',
    adminPanelCreateBoxBoxName: 'Naziv radnog prostora',
    adminPanelCreateBoxBoxType: 'Tip radnog prostora',
    adminPanelCreateBoxBoxCapacity: 'Kapacitet radnog prostora',
    adminPanelCreateBoxSaveButton: 'Spremi',
    adminPanelCreateBoxCancelButton: 'Odustani',
    adminPanelCreateUserAuhtorityTitle: 'Dodaj ovlast korisniku',
    adminPanelCreateUserAuhtorityUser: 'Korisnik',
    adminPanelCreateUserAuhtorityTeam: 'Projektni tim',
    adminPanelCreateUserAuhtoritySaveButton: 'Spremi',
    adminPanelCreateUserAuhtorityCancelButton: 'Odustani',
    adminPanelCreateTeamTitle: 'Kreiraj tim',
    adminPanelCreateTeamName: 'Naziv tima',
    adminPanelCreateTeamSaveButton: 'Spremi',
    adminPanelCreateTeamCancelButton: 'Odustani',

    //Server error locale
    serverErrorMessageTitle: 'Usluga je trenutno nedostupna.',
    serverErrorMessageText: 'Molimo poku??ajte kasnije!',

    //Additional
    createOvlastUserLabel: 'Korisnik',
    createOvlastTeamLabel: 'Tim',
    dialogYes: 'Da',
    dialogNo: 'Ne',
    allUsersLabel: 'Svi korisnici',
    allTeamsLabel: 'Svi timovi',
    myReservationsDeleteLabel: 'Uspje??no ste obrisali odabranu rezervaciju.',
    myReservationsSelectedDeleteLabel:
      'Uspje??no ste obrisali odabrane rezervacije.',
    workspaceDeleteLabel: 'Uspje??no ste obrisali odabrani radni prostor.',
    workspaceSelectedDeleteLabel:
      'Uspje??no ste obrisali odabrane radne prostore.',
    workspaceCreateLabel: 'Uspje??no ste kreirali novi radni prostor.',
    workspaceEditLabel: 'Uspje??no ste a??urirali radni prostor.',
    projectDeleteLabel: 'Uspje??no ste obrisali odabrani projekt.',
    projectSelectedDeleteLabel: 'Uspje??no ste obrisali odabrane projekte.',
    projectCreateLabel: 'Uspje??no ste kreirali novi projekt.',
    projectEditLabel: 'Uspje??no ste a??urirali projekt.',
    userAuthorityDeleteLabel: 'Uspje??no ste obrisali odabrani moderatore.',
    userAuthoritySelectedDeleteLabel:
      'Uspje??no ste obrisali odabrane moderatore.',
    userAuthorityCreateLabel: 'Uspje??no ste dodijelili moderatora.',
    userAuthorityEditLabel: 'Uspje??no ste a??urirali moderatora.',

    //Footer locale
    footerTitle: 'King akademija 2021. Sva prava podr??ana',
  },
});

strings.formatString(strings.signInEmailRequired);
