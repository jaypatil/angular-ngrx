import { DBSchema } from './database/database';

/**
 * ngrx/db uses a simple schema config object to initialize stores in IndexedDB.
 */
export const schema: DBSchema = {
  version: 1,
  name: 'books_app',
  stores: {
    books: {
      autoIncrement: true,
      primaryKey: 'id',
    },
  },
};
