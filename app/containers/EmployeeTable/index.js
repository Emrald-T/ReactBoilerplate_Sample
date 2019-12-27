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
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
// import TextField from '@material-ui/core/TextField';
import HoursInput from 'components/HoursInput';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { editEmployeeData } from 'containers/Home/actions';
import { makeSelectEmpData } from 'containers/Home/selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const useStyles = makeStyles(() => ({
  table: {
    minWidth: 700,
  },
}));

export function EmployeeTable(props) {
  useInjectReducer({ key: 'employeeTable', reducer });
  useInjectSaga({ key: 'employeeTable', saga });

  const classes = useStyles();

  const [localData, setLocalData] = React.useState(props.data);

  const handleValueChange = (sourceData, index) => {
    props.onEdit(props.tab, props.data);
    setLocalData(props.data);
  };

  // const data = data ? props.data[props.tab] : [];

  // <TextField
  //   error={emp.invalidSt}
  //   type="number"
  //   variant="standard"
  //   defaultValue={emp.St.toFixed(2)}
  //   onChange={e =>
  //     handleValueChange(e, { index, type: 'St', data: emp })
  //   }
  //   helperText={emp.invalidSt ? 'Value is greater than 24' : ''}
  //   aria-describedby="ST hours input"
  // />

  const DataRows = () => {
    let list;
    if (props.data.length) {
      if (localData.length) {
        list = localData;
      } else {
        list = props.data;
      }
      list = list.map((emp, index) => (
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
            <HoursInput
              type="St"
              data={emp}
              handleChange={e => handleValueChange(e, index)}
            />
          </TableCell>
          <TableCell colSpan={2} align="center">
            <HoursInput
              type="Ot"
              data={emp}
              handleChange={e => handleValueChange(e, index)}
            />
          </TableCell>
          <TableCell colSpan={2} align="center">
            <HoursInput
              type="Dt"
              data={emp}
              handleChange={e => handleValueChange(e, index)}
            />
          </TableCell>
          <TableCell align="center">{emp.Total.toFixed(2)}</TableCell>
          <TableCell align="center">
            <Button>Notes</Button>
          </TableCell>
        </TableRow>
      ));
    } else {
      list = (
        <TableRow>
          <TableCell colSpan={9} align="center">
            <FormattedMessage {...messages.noData} />
          </TableCell>
        </TableRow>
      );
    }
    return list;
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
  onEdit: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectEmpData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    // onEdit: (key, pos, data) => dispatch(editEmployeeData(key, pos, data)),
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
