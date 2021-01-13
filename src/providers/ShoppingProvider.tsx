import React, { createContext, useContext, useReducer } from 'react';
import { Order } from '../models/Order';
import { useUserState } from './UserProvider';

type Action =
  | { type: 'set-shopping-id'; payload: number }
  | {
      type: 'set-shopping';
      payload: Order[];
    }
  | { type: 'add-order'; payload: Order }
  | {
      type: 'set-status';
      payload: 'isLoading' | 'isError' | 'isFetched' | 'isUpdating';
    };

type Dispatch = (action: Action) => void;

type State = {
  id: number;
  shopping: Order[];
  status: 'isLoading' | 'isError' | 'isFetched' | 'isUpdating';
};

const ShoppingStateContext = createContext<State | undefined>(undefined);
const ShoppingDispatchContext = createContext<Dispatch | undefined>(undefined);

type ShoppingProviderProps = {
  children: React.ReactNode;
};

const initialState: State = {
  id: 1,
  shopping: [],
  status: 'isLoading',
};

const shoppingReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'set-shopping':
      return { ...state, shopping: [...action.payload] };
    case 'add-order':
      return { ...state, shopping: [...state.shopping, { ...action.payload }] };
    case 'set-status':
      return { ...state, status: action.payload };
    default:
      return { ...state };
  }
};

const Provider: React.FC<ShoppingProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(shoppingReducer, initialState);

  return (
    <ShoppingStateContext.Provider value={state}>
      <ShoppingDispatchContext.Provider value={dispatch}>
        {children}
      </ShoppingDispatchContext.Provider>
    </ShoppingStateContext.Provider>
  );
};

const useShoppingState = (): State => {
  const context = useContext(ShoppingStateContext);
  if (context === undefined) {
    throw new Error('useCartState must be used within a CartProvider');
  }

  return context;
};

const ShoppingProvider: React.FC = ({ children }) => {
  const userState = useUserState();

  return userState.user ? <Provider>{children}</Provider> : <> {children}</>;
};

const useShoppingDispatch = (): Dispatch => {
  const context = useContext(ShoppingDispatchContext);
  if (context === undefined) {
    throw new Error('useShoppingState must be used within a CartProvider');
  }

  return context;
};

export { ShoppingProvider, useShoppingState, useShoppingDispatch };
