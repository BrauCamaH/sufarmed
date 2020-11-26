import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { useQueryCart } from '../api/orders';
import { Order } from '../models/Order';
import { OrderDetail } from '../models/OrderDetail';
import { useUserState } from './UserProvider';

type Action =
  | { type: 'set-item'; payload: OrderDetail }
  | { type: 'delete-item'; payload: number }
  | { type: 'set-cart'; payload: Order }
  | {
      type: 'set-status';
      payload: 'isLoading' | 'isError' | 'isFetched' | 'isUpdating';
    }
  | {
      type: 'update-quantity';
      payload: { quantity: number; orderDetail: OrderDetail };
    };

type Dispatch = (action: Action) => void;
type State = {
  cart: Order;
  status: 'isLoading' | 'isError' | 'isFetched' | 'isUpdating';
};
type UserProviderProps = { children: React.ReactNode };

const CartStateContext = createContext<State | undefined>(undefined);
const CartDispatchContext = createContext<Dispatch | undefined>(undefined);

const initialState: State = {
  cart: {
    id: 0,
    order_details: [],
    payment: 'cash',
    ship_date: '',
    status: 'created',
  },
  status: 'isLoading',
};

const cartReducer = (state: State, action: Action): any => {
  switch (action.type) {
    case 'set-status':
      return { ...state, status: action.payload };
    case 'set-cart':
      return action.payload
        ? { ...state, cart: { ...action.payload } }
        : { ...state };
    case 'set-item':
      return {
        ...state,
        cart: {
          ...state.cart,
          order_details: [...state.cart.order_details, { ...action.payload }],
        },
      };
    case 'delete-item':
      return {
        ...state,
        cart: {
          ...state.cart,
          order_details: [
            ...state.cart.order_details.filter(
              (item: OrderDetail) => item.id !== action.payload
            ),
          ],
        },
      };
    case 'update-quantity': {
      const newArray = [...state.cart.order_details];
      const index = newArray.findIndex(
        (item) => item.id === action.payload.orderDetail.id
      );
      newArray[index] = {
        ...action.payload.orderDetail,
        quantity: action.payload.quantity,
      };

      return {
        ...state,
        cart: { ...state.cart, order_details: [...newArray] },
      };
    }

    default: {
      return {
        cart: {
          id: 0,
          order_details: [],
          payment: 'cash',
          ship_date: '',
          status: 'created',
        },
        status: 'isLoading',
      };
    }
  }
};

const CartProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const userState = useUserState();
  const { isLoading, isError, data: orders } = useQueryCart(
    userState.jwt,
    userState.user?.id
  );

  useEffect(() => {
    if (!isLoading) {
      dispatch({ type: 'set-cart', payload: orders[0] });
      dispatch({
        type: 'set-status',
        payload: isLoading ? 'isLoading' : isError ? 'isError' : 'isFetched',
      });
    }
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
