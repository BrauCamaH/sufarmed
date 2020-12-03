import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { User } from '../models/User';
import api from '../api/';
import axios from 'axios';

type Action = { type: 'set-user'; payload: State } | { type: 'sign-out' };
type Dispatch = (action: Action) => void;
type State = { user?: User; jwt: string };
type UserProviderProps = { children: React.ReactNode };

const UserStateContext = createContext<State | undefined>(undefined);
const UserDispatchContext = createContext<Dispatch | undefined>(undefined);

const initialState: State = { jwt: '', user: undefined };

const userReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'set-user':
      return { ...state, ...action.payload };
    case 'sign-out':
      return { user: undefined, jwt: '' };
    default: {
      return state;
    }
  }
};

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem('sufarmedAuth');
    if (token !== null && !state.user) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios
        .get('/users/me', { headers: { Authorization: `Bearer ${token}` } })
        .then(({ data }: { data: User }) =>
          dispatch({ type: 'set-user', payload: { jwt: token, user: data } })
        )
        .catch((e) => console.log(e));
    } else if (state.jwt) {
      api.defaults.headers.common['Authorization'] = `Bearer ${state.jwt}`;
      localStorage.setItem('sufarmedAuth', state.jwt);
    }

    return () => {
      delete api.defaults.headers.common['Authorization'];
    };
  }, [state.jwt]);

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

const useUserState = (): State => {
  const context = useContext(UserStateContext);
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider');
  }

  return context;
};

const useUserDispatch = (): Dispatch => {
  const context = useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider');
  }

  return context;
};

export { UserProvider, useUserState, useUserDispatch };
