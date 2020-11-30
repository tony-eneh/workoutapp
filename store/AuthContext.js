import {createContext} from 'react';

export default createContext({
  signIn: (data) => {},
  signOut: () => {},
  signUp: (data) => {},
});
