import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { useQueryCart } from '../api/orders';
import { OrderDetail } from '../models/OrderDetail';
import { useUserState } from './UserProvider';

type Action =
  | { type: 'set-item'; payload: OrderDetail }
  | { type: 'delete-item'; payload: number }
  | { type: 'set-cart'; payload: OrderDetail[] }
  | { type: 'set-status'; payload: 'isLoading' | 'isError' | 'isFetched' };

type Dispatch = (action: Action) => void;
type State = {
  cart: OrderDetail[];
  status: 'isLoading' | 'isError' | 'isFetched';
};
type UserProviderProps = { children: React.ReactNode };

const CartStateContext = createContext<State | undefined>(undefined);
const CartDispatchContext = createContext<Dispatch | undefined>(undefined);

const initialState: State = { cart: [], status: 'isLoading' };

const cartReducer = (state: State, action: Action): any => {
  switch (action.type) {
    case 'set-status':
      return { ...state, status: action.payload };
    case 'set-cart':
      return action.payload
        ? { ...state, cart: [...action.payload] }
        : { ...state };
    case 'set-item':
      return { ...state, cart: [...state.cart, { ...action.payload }] };
    case 'delete-item':
      return null;
    default: {
      return state;
    }
  }
};

const CartProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const userState = useUserState();
  const { isLoading, isError, data: cart } = useQueryCart(
    userState.jwt,
    userState.user?.id
  );

  useEffect(() => {
    dispatch({ type: 'set-cart', payload: cart });

    dispatch({
      type: 'set-status',
      payload: isLoading ? 'isLoading' : isError ? 'isError' : 'isFetched',
    });
  }, [isLoading]);

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
};

const useCartState = (): State => {
  const context = useContext(CartStateContext);
  if (context === undefined) {
    throw new Error('useCartState must be used within a CartProvider');
  }

  return context;
};

const useCartDispatch = (): Dispatch => {
  const context = useContext(CartDispatchContext);
  if (context === undefined) {
    throw new Error('useCartState must be used within a CartProvider');
  }

  return context;
};

export { CartProvider, useCartState, useCartDispatch };
