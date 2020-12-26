import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { User } from '../models/User';
import api from '../api/';
import axios from 'axios';
import { Address } from '../models/Address';

type Action =
  | { type: 'set-user'; payload: State }
  | { type: 'set-token'; payload: string }
  | { type: 'add-address'; payload: Address }
  | { type: 'delete-address'; payload: Address }
  | { type: 'delete-address'; payload: Address }
  | { type: 'update-address'; payload: Address }
  | { type: 'update-user'; payload: User }
  | { type: 'sign-out' };
type Dispatch = (action: Action) => void;
type State = { user?: User; jwt: string };
type UserProviderProps = { children: React.ReactNode };

const UserStateContext = createContext<State | undefined>(undefined);
const UserDispatchContext = createContext<Dispatch | undefined>(undefined);

const initialState: State = { jwt: '', user: undefined };

const userReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'add-address':
      if (state.user) {
        return {
          ...state,
          user: {
            ...state.user,
            addresses: [...state.user.addresses, { ...action.payload }],
          },
        };
      } else {
        return { ...state };
      }
    case 'delete-address':
      if (state.user) {
        const updatedAdresses =
          state.user.addresses.filter(
            (item) => item.id !== action.payload.id
          ) || state.user.addresses;

        return {
          ...state,
          user: {
            ...state.user,
            addresses: [...updatedAdresses],
          },
        };
      } else {
        return { ...state };
      }
    case 'update-address':
      if (state.user) {
        const updatedAddresses = [...state.user.addresses];
        const index = updatedAddresses.findIndex(
          (item) => item.id === action.payload.id
        );
        updatedAddresses[index] = { ...action.payload };

        return {
          ...state,
          user: { ...state.user, addresses: [...updatedAddresses] },
        };
      } else {
        return { ...state };
      }
    case 'set-token':
      return { ...state, jwt: action.payload };
    case 'set-user':
      return { ...state, ...action.payload };
    case 'update-user':
      return { ...state, user: { ...state.user, ...action.payload } };
    case 'sign-out':
      return { user: undefined, jwt: '' };
    default: {
      return { ...state };
    }
  }
};

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    if (state.jwt) {
      api.defaults.headers.common['Authorization'] = `Bearer ${state.jwt}`;

      axios
        .get('/users/me')
        .then(({ data }: { data: User }) =>
          dispatch({
            type: 'set-user',
            payload: { jwt: state.jwt, user: data },
          })
        )
        .catch((e) => console.log(e));
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
