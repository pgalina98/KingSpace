import themes from '../../utils/theme';
import { alpha } from '@material-ui/core/styles/colorManipulator';

const style = {
  root: {
    flexGrow: 1,
    backgroundColor: themes.palette.primary.main,
  },
  table: {
    minWidth: 700,
  },
  inputProp: {
    fontSize: themes.font.fontSize.medium,
  },
  container: {
    height: 'calc(100vh - 158px)',
    maxWidth: '100%',
    marginTop: themes.spacing(1),
    [themes.breakpoints.down('sm')]: {
      height: 'calc(100% - 145px)',
    },
  },
  paper: {
    height: 'calc(100%-64px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: themes.spacing(1),
    backgroundColor: themes.palette.secondary.main,
  },
  textFieldRoot: {
    '& .MuiFormLabel-root': {
      fontSize: themes.font.fontSize.large,
    },
  },
  textFieldRootWithSpacing: {
    marginTop: themes.spacing(4),
    '& .MuiFormLabel-root': {
      fontSize: themes.font.fontSize.large,
    },
  },
  spacing: {
    marginLeft: themes.spacing(2),
  },
  select: {
    marginLeft: themes.spacing(2),
    height: 50,
  },
  checkBoxRoot: {
    marginTop: themes.spacing(1),
    marginLeft: themes.spacing(1),
  },
  submit: {
    margin: themes.spacing(2, 0),
    fontSize: themes.font.fontSize.large,
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: themes.spacing(1),
  },
  formControl: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  datepickerText: {
    color: alpha('#000000', 0.54),
    fontSize: themes.font.fontSize.large,
    whiteSpace: 'nowrap',
  },
  inputLabel: {
    marginTop: themes.spacing(3),
    marginBottom: 10,
  },
  contentBody: {
    flexGrow: 1,
    alignItems: 'center',
  },
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    marginBottom: themes.spacing(1),
  },
  alertIcon: {
    '& .MuiAlert-message': {
      fontSize: themes.font.fontSize.medium,
    },
    '& .MuiAlert-icon': {
      fontSize: 20,
    },
  },
};

export default style;
