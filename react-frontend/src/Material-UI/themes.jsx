import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    marginTop: '150px',
  },
  homepage: {
    marginTop: '40px',
  },
  griditems: {
    margin: 'auto',
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    Width: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  baseExpansion: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    marginLeft: '10px'
  },
  darkmode: {
      backgroundColor: 'black',
      color: 'white',
      marginTop: '150px',
  },
  iconcards: {
    width: '250px',
    display: 'inline-block',
    marginLeft: '40px',
    marginTop: '40px',
    marginBotton: '40px',
    marginRight: '40px',
    textAlign: 'center',
  },
  createboardcard: {
    ':hover': {
        content: '/static/images/CreateBoardCardIconPlaced.png',
    }
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
}));

export default useStyles;