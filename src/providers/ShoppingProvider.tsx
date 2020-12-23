import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { useQueryPaidOrders } from '../api/orders';
import { Order } from '../models/Order';
import { useUserState } from './UserProvider';

type Action =
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
  shopping: Order[];
  status: 'isLoading' | 'isError' | 'isFetched' | 'isUpdating';
};

const ShoppingStateContext = createContext<State | undefined>(undefined);
const ShoppingDispatchContext = createContext<Dispatch | undefined>(undefined);

type ShoppingProviderProps = { children: React.ReactNode };

const initialState: State = {
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
  }
};

const ShoppingProvider: React.FC<ShoppingProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(shoppingReducer, initialState);
  const userState = useUserState();
  const { isLoading, isError, data: shopping } = useQueryPaidOrders(
    userState.jwt,
    userState.user?.id
  );

  useEffect(() => {
    if (!isLoading) {
      if (shopping) {
        dispatch({ type: 'set-shopping', payload: shopping });
      }
    }
    dispatch({
      type: 'set-status',
      payload: isLoading ? 'isLoading' : isError ? 'isError' : 'isFetched',
    });
  }, [isLoading]);

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

const useShoppingDispatch = (): Dispatch => {
  const context = useContext(ShoppingDispatchContext);
  if (context === undefined) {
    throw new Error('useShoppingState must be used within a CartProvider');
  }

  return context;
};

export { ShoppingProvider, useShoppingState, useShoppingDispatch };
