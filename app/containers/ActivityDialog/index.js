/**
 *
 * ActivityDialog
 *
 */
/* eslint-disable no-param-reassign */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import LoadingIndicator from 'components/LoadingIndicator';
import {
  getSlctdProjects,
  getSlctdProjectData,
  getProjectTree,
  getProjectData,
  getRequestCompleted,
} from './selectors';
import { getProjects } from './actions';
import messages from './messages';
import saga from './saga';
import reducer from './reducer';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiDialog-paperScrollPaper': {
      height: '100%',
    },
    '& .MuiDialogContent-root': {
      padding: 0,
    },
  },
  list: {
    backgroundColor: theme.palette.background.paper,
    '& p': {
      display: '-webkit-box',
      '-webkit-line-clamp': 2,
      '-webkit-box-orient': 'vertical',
      maxWidth: '200px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      height: 'auto',
    },
  },
  tree: {
    flexGrow: 1,
    padding: '1em',
  },
  bBase: {
    width: '100%',
    '& > *': {
      width: '100%',
    },
  },
  denseTreeItem: {
    '& > div': {
      margin: '5px 0',
      display: 'flex',
    },
    '& .MuiTreeItem-iconContainer': {
      width: '2.75em',
    },
  },
  treeItemContent: {
    display: 'flex',
    '& > div': {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingRight: '5px',
      '& > div': {
        // width: '10px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
    },
  },
  noDataItem: {
    textAlign: 'center',
    cursor: 'auto',
    background: '#eee',
  },
}));

export function ActivityDialog(props) {
  useInjectReducer({ key: 'projectsDialog', reducer });
  useInjectSaga({ key: 'projectsDialog', saga });
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState([]);
  const [error, setError] = React.useState(props.data.message || '');
  const [checked, setChecked] = React.useState([]);
  const [bindings, setBinding] = React.useState([]);
  const handleChange = (event, nodes) => {
    setExpanded(nodes);
  };
  const beforeOpening = () => {
    props.getProjects();
    setChecked(props.slctdProjects);
    setBinding(props.slctdProjectData);
  };

  useEffect(() => {
    if (props.requestComplete && !props.data.success) {
      setError(props.data.message);
    }
  }, [props.requestComplete]);

  const getTabName = (item, name) => {
    const currName = item.ProjectNo;
    let newName = name ? `${name} | ${currName}` : currName;
    if (item.Parent) {
      newName = getTabName(props.projectData[item.Parent], newName);
    }
    return newName;
  };

  // Called when the check box is checked/unchecked
  const handleToggle = (event, item) => {
    const itemValue = item.tabName;
    // item.tabName = itemValue;
    const currentIndex = checked.indexOf(itemValue);
    const newChecked = [...checked];
    const newBindings = [...bindings];

    if (currentIndex === -1) {
      newChecked.push(itemValue);
      // delete the children of parent node to prevent stack overflow
      if (item.parentNode) {
        delete item.parentNode.children;
        delete item.parentNode.parentNode;
      }
      newBindings.push(item);
    } else {
      newChecked.splice(currentIndex, 1);
      newBindings.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    setBinding(newBindings);
  };

  // Called when the 'Confirm' button is pressed
  const onConfirm = () => {
    props.onSelectionComplete({ id: checked, data: bindings });
    props.onClose();
  };

  const generateTree = data => {
    const tree = data.map(item => {
      item.tabName = item.tabName || getTabName(item);
      const checkBox = (
        <Checkbox
          edge="start"
          checked={checked.indexOf(item.tabName) !== -1}
          tabIndex={-1}
          inputProps={{ 'aria-labelledby': item }}
          style={{ margin: '0' }}
        />
      );
      return (
        <TreeItem
          className={classes.denseTreeItem}
          nodeId={item.tabName}
          key={item.tabName}
          onClick={e => (item.children.length ? {} : handleToggle(e, item))}
          label={
            <ButtonBase className={classes.bBase}>
              <div className={classes.treeItemContent}>
                {item.children.length ? '' : checkBox}
                <div>
                  <div style={{ textAlign: 'left' }}>
                    {item.ProjectNo}
                    <Typography variant="subtitle2">{item.ProjDesc}</Typography>
                  </div>
                  <Typography variant="body1">{item.Total || '(0)'}</Typography>
                </div>
              </div>
            </ButtonBase>
          }
        >
          {generateTree(item.children)}
        </TreeItem>
      );
    });
    return tree;
  };

  // The Activity Dialog
  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="sm"
        aria-labelledby="dialog-title"
        open={props.open}
        onClose={props.onClose}
        className={classes.root}
        onEnter={beforeOpening}
      >
        <DialogTitle id="dialog-title">
          <FormattedMessage {...messages.header} />
        </DialogTitle>
        <DialogContent>
          {props.requestComplete ? (
            <TreeView
              className={classes.tree}
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              expanded={expanded}
              onNodeToggle={handleChange}
            >
              {props.data.success && props.data.tree.length ? (
                generateTree(props.data.tree)
              ) : (
                <TreeItem
                  className={classes.denseTreeItem}
                  nodeId="noData"
                  key="noData"
                  label={
                    <div className={`${classes.bBase} ${classes.noDataItem}`}>
                      <Typography variant="body1" style={{ padding: '5px 0' }}>
                        No Data
                      </Typography>
                    </div>
                  }
                />
              )}
            </TreeView>
          ) : (
            <LoadingIndicator />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onConfirm} color="primary">
            Confirm
          </Button>
          <Button onClick={props.onClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

ActivityDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSelectionComplete: PropTypes.func,
  slctdProjects: PropTypes.array,
  slctdProjectData: PropTypes.array,
  data: PropTypes.object,
  projectData: PropTypes.object,
  getProjects: PropTypes.func,
  requestComplete: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  slctdProjects: getSlctdProjects(),
  slctdProjectData: getSlctdProjectData(),
  data: getProjectTree(),
  projectData: getProjectData(),
  requestComplete: getRequestCompleted(),
});

function mapDispatchToProps(dispatch) {
  return {
    getProjects: () => dispatch(getProjects()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ActivityDialog);
