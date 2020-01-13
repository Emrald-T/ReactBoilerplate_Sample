/**
 *
 * FilterDialog
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import saga from './saga';
import reducer from './reducer';
import makeSelectFilterDialog from './selectors';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
const formStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  header: {},
}));
const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});
const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);
const projects = ['project1', 'project2', 'project3', 'project4', 'project5'];
const fcodes = ['fcode1', 'fcode2', 'fcode3', 'fcode4', 'fcode5'];
export function FilterDialog(props) {
  useInjectReducer({ key: 'filterDialog', reducer });
  useInjectSaga({ key: 'filterDialog', saga });
  const classes = formStyles();
  const [projName, setprojName] = React.useState([]);
  const [fcodeName, setfcodeName] = React.useState([]);

  const handleChangePr = event => {
    setprojName(event.target.value);
  };
  const handleChangeFC = event => {
    setfcodeName(event.target.value);
  };
  return (
    <div>
      <Dialog
        onClose={props.close}
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        <DialogTitle
          className={classes.header}
          id="customized-dialog-title"
          onClose={props.close}
        >
          Filter Dialog
        </DialogTitle>
        <DialogContent dividers>
          <form className={classes.root} noValidate autoComplete="off">
            <InputLabel id="demo-mutiple-name-label">Projects</InputLabel>
            <Select
              labelId="demo-mutiple-checkbox-label"
              id="demo-mutiple-checkbox"
              multiple
              value={projName}
              onChange={handleChangePr}
              input={<Input />}
              renderValue={selected => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {projects.map(name => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={projName.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
            <InputLabel id="demo-mutiple-name-label">FastCodes</InputLabel>
            <Select
              labelId="demo-mutiple-checkbox-label"
              id="demo-mutiple-checkbox"
              multiple
              value={fcodeName}
              onChange={handleChangeFC}
              input={<Input />}
              renderValue={selected => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {fcodes.map(name => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={fcodeName.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.close} color="primary">
            Apply
          </Button>
          <Button autoFocus onClick={props.close} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

FilterDialog.propTypes = {
  close: PropTypes.bool,
  open: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  filterDialog: makeSelectFilterDialog(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(FilterDialog);
