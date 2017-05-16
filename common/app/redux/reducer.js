import { handleActions } from 'redux-actions';
import types from './types';

const initialState = {
  title: 'Learn To Code | codeCampChallenge',
  isSignInAttempted: false,
  user: '',
  lang: '',
  csrfToken: '',
  theme: 'default'
};

export default handleActions(
  {
    [types.updateTitle]: (state, { payload = 'Learn To Code' }) => ({
      ...state,
      title: payload + ' | codeCampChallenge'
    }),

    [types.updateThisUser]: (state, { payload: user }) => ({
      ...state,
      user,
      isSignInAttempted: true
    }),
    [types.updateAppLang]: (state, { payload = 'en' }) =>({
      ...state,
      lang: payload
    }),
    [types.updateTheme]: (state, { payload = 'default' }) => ({
      ...state,
      theme: payload
    }),
    [types.showSignIn]: state => ({
      ...state,
      isSignInAttempted: true
    }),

    [types.challengeSaved]: (state, { payload: { points = 0 } }) => ({
      ...state,
      points
    }),
    [types.delayedRedirect]: (state, { payload }) => ({
      ...state,
      delayedRedirect: payload
    }),
    [types.openDropdown]: state => ({
      ...state,
      isNavDropdownOpen: true
    }),
    [types.closeDropdown]: state => ({
      ...state,
      isNavDropdownOpen: false
    })
  },
  initialState
);
