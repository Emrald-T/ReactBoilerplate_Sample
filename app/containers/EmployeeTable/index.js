/**
 *
 * EmployeeTable
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import CommentIcon from '@material-ui/icons/Comment';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import HoursInput from 'components/HoursInput';
import { editEmployeeData } from 'containers/HomePage/actions';
import {
  makeSelectEmpData,
  makeSelectSearchValue,
} from 'containers/HomePage/selectors';
import messages from './messages';

const useStyles = makeStyles(() => ({
  table: {
    minWidth: 740,
  },
}));

export function EmployeeTable(props) {
  const classes = useStyles();

  const handleValueChange = sourceData => {
    props.onEdit(props.tab, sourceData);
  };

  const DataRows = () => {
    let items;
    let data;
    if (props.data.length) {
      /* eslint-disable array-callback-return, consistent-return */
      data = props.data.filter(item => {
        const value = props.searchValue ? props.searchValue.toUpperCase() : '';
        if (
          item.Ename.toUpperCase().includes(value) ||
          item.Empno.toUpperCase().includes(value)
        )
          return item;
      });
      items = data.map(emp => (
        <TableRow key={emp.Empno}>
          <TableCell>
            <div>{emp.Ename}</div>
            <Link
              href="#BreakdownDialog"
              aria-describedby={`hours breakdown dialog for ${emp.Ename}`}
            >
              {emp.Empno}
            </Link>
          </TableCell>
          <TableCell colSpan={2} align="center">
            <HoursInput type="St" data={emp} handleChange={handleValueChange} />
            <Typography />
          </TableCell>
          <TableCell colSpan={2} align="center">
            <HoursInput type="Ot" data={emp} handleChange={handleValueChange} />
          </TableCell>
          <TableCell colSpan={2} align="center">
            <HoursInput type="Dt" data={emp} handleChange={handleValueChange} />
          </TableCell>
          <TableCell align="center">{emp.Total.toFixed(2)}</TableCell>
          <TableCell align="center">
            <IconButton color="inherit" aria-label="show notes" edge="end">
              <Icon
                component={CommentIcon}
                color="primary"
                title="Comments"
                size={1}
              />
            </IconButton>
          </TableCell>
        </TableRow>
      ));
    } else {
      items = (
        <TableRow>
          <TableCell colSpan={9} align="center">
            <FormattedMessage {...messages.noData} />
          </TableCell>
        </TableRow>
      );
    }
    return items;
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell>
              <FormattedMessage {...messages.employee} />
            </TableCell>
            <TableCell colSpan={2} align="center">
              <FormattedMessage {...messages.st} />
            </TableCell>
            <TableCell colSpan={2} align="center">
              <FormattedMessage {...messages.ot} />
            </TableCell>
            <TableCell colSpan={2} align="center">
              <FormattedMessage {...messages.dt} />
            </TableCell>
            <TableCell align="center">
              <FormattedMessage {...messages.total} />
            </TableCell>
            <TableCell align="center">
              <FormattedMessage {...messages.notes} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{DataRows()}</TableBody>
      </Table>
    </TableContainer>
  );
}

EmployeeTable.propTypes = {
  dispatch: PropTypes.func.isRequired,
  tab: PropTypes.string,
  data: PropTypes.array,
  searchValue: PropTypes.string,
  onEdit: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectEmpData(),
  searchValue: makeSelectSearchValue(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onEdit: (key, data) => {
      dispatch(editEmployeeData(key, data));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(EmployeeTable);
