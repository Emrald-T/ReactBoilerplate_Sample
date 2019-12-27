/**
 *
 * Asynchronously loads the component for EmployeeTable
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
