/**
 *
 * Asynchronously loads the component for TreeView
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
