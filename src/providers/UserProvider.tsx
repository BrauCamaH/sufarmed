import React, { createContext, useContext, useReducer } from 'react';
import { User } from '../models/User';

type Action = { type: 'set-user'; payload: User } | { type: 'sign-out' };
type Dispatch = (action: Action) => void;
type State = { user?: User; jwt: string };
type UserProviderProps = { children: React.ReactNode };

const UserStateContext = createContext<State | undefined>(undefined);
const UserDispatchContext = createContext<Dispatch | undefined>(undefined);

const initialState: State = { jwt: '', user: undefined };

const userReducer = (state: State, action: Action): any => {
  switch (action.type) {
    case 'set-user':
      return { ...action.payload };
    case 'sign-out':
      return null;
    default: {
      return state;
    }
  }
};

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

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
