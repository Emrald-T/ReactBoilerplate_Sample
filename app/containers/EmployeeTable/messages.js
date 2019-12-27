/*
 * EmployeeTable Messages
 *
 * This contains all the text for the EmployeeTable container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.EmployeeTable';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the EmployeeTable container!',
  },
  employee: {
    id: `${scope}.employee`,
    defaultMessage: 'Employee',
  },
  st: {
    id: `${scope}.st`,
    defaultMessage: 'ST',
  },
  ot: {
    id: `${scope}.ot`,
    defaultMessage: 'OT',
  },
  dt: {
    id: `${scope}.dt`,
    defaultMessage: 'DT',
  },
  total: {
    id: `${scope}.total`,
    defaultMessage: 'Total',
  },
  notes: {
    id: `${scope}.notes`,
    defaultMessage: 'Notes',
  },
  noData: {
    id: `${scope}.noData`,
    defaultMessage: 'No Data',
  },
});
