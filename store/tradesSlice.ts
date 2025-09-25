import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Trade type (adjust based on your API response)
export interface Trade {
  _id: string;
  symbol: string;
  side: "buy" | "sell";
  quantity: number;
  price: number;
  status: "open" | "closed";
  pnl?: number;
  createdAt: string;
}

interface TradeState {
  trades: Trade[];
  loading: boolean;
  error: string | null;
}

const initialState: TradeState = {
  trades: [],
  loading: false,
  error: null,
};

const tradeSlice = createSlice({
  name: "trade",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setTrades: (state, action: PayloadAction<Trade[]>) => {
      state.trades = action.payload;
      state.loading = false;
      state.error = null;
    },
    addTrade: (state, action: PayloadAction<Trade>) => {
      state.trades.push(action.payload);
    },
    updateTrade: (state, action: PayloadAction<Trade>) => {
      const index = state.trades.findIndex((t) => t._id === action.payload._id);
      if (index !== -1) {
        state.trades[index] = action.payload;
      }
    },
    removeTrade: (state, action: PayloadAction<string>) => {
      state.trades = state.trades.filter((t) => t._id !== action.payload);
    },
    tradeFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearTrades: (state) => {
      state.trades = [];
      state.loading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setTrades,
  addTrade,
  updateTrade,
  removeTrade,
  tradeFailure,
  clearTrades,
  clearError,
} = tradeSlice.actions;

export default tradeSlice.reducer;
