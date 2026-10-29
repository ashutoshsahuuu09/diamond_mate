import { createContext, useContext, useReducer, useEffect } from 'react';

// ── Cart Context ──────────────────────────────────────────────────────────────

const CartContext = createContext(null);

const USER_ID = 'guest_user'; // In production, use auth

const initialState = {
  items: [],
  userId: USER_ID,
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'SET_CART':
      return { ...state, items: action.payload };

    case 'ADD_ITEM': {
      const exists = state.items.find((i) => i.ring_id === action.payload.ring_id);
      if (exists) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.ring_id === action.payload.ring_id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, action.payload] };
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((i) => i.ring_id !== action.payload),
      };

    case 'CLEAR_CART':
      return { ...state, items: [] };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Persist to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('dm_cart');
    if (saved) {
      dispatch({ type: 'SET_CART', payload: JSON.parse(saved) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dm_cart', JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (item) => dispatch({ type: 'ADD_ITEM', payload: item });
  const removeItem = (ringId) => dispatch({ type: 'REMOVE_ITEM', payload: ringId });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const subtotal = state.items.reduce(
    (sum, item) => sum + item.unit_price * item.quantity,
    0
  );
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ ...state, subtotal, itemCount, addItem, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
