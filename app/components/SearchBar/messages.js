/*
 * SearchBar Messages
 *
 * This contains all the text for the SearchBar component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.SearchBar';

export default defineMessages({
  header: {
    id: `${scope}.placeholder`,
    defaultMessage: 'Search...',
  },
});
