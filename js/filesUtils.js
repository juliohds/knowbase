// with it funtions your mainreducers:

import { reducers } from './index';

const rootReducer = {
  ...reducers
};

export default rootReducer;

// your store consume this

import { mapFiles, getFiles } from '../utils/files';

export const reducers = mapFiles(getFiles(require.context('./', true, /reducer.js/)));
export const actions = mapFiles(getFiles(require.context('./', true, /actions.js/)));
export const sagas = mapFiles(getFiles(require.context('./', true, /sagas.js/)));

export default {
  reducers,
  actions,
  sagas
};



export const getFiles = context => {
  const keys = context.keys();
  const values = keys.map(context);
  return keys.reduce((acc, item, index) => {
    acc[item] = values[index];
    return acc;
  }, {});
};

export const mapFiles = files =>
  Object.entries(files).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [setPropName(key)]: value.default
    }),
    {}
  );
