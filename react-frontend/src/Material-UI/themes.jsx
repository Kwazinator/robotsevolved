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
  iconcardsDaily: {
    maxWidth: 345,
    minWidth: 250,
    float: 'left',
    marginLeft: '40px',
    marginTop: '40px',
    marginBotton: '40px',
    marginRight: '40px',
    textAlign: 'center',
  },
  titlehome: {
    fontFamily: "'Epilogue', sans-serif",
    marginBottom: '30px',
  },
  titledailyroto: {
    fontFamily: "'Epilogue', sans-serif",
    marginBottom: '10px',
  },
  iconfonts: {
    fontFamily: "'Arvo', serif",
  },
  createboardcard: {
    ':hover': {
        content: '/static/images/CreateBoardCardIconPlaced.png',
    }
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  centeredProfile: {
    marginTop: '20px',
    display: 'inline-block',
  },
  expandedPanelDCH: {
    background: 'linear-gradient(70deg, #fff810  30%, rgba(0,0,0,0) 30%), linear-gradient(30deg, #63e89e 60%, #ff7ee3 60%)'
  },
  table: {
    width: '33%'
  }
}));

export default useStyles;