import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { tradingService } from "@/lib/trading"

// Trade type
export interface Trade {
  _id: string
  symbol: string
  side: "buy" | "sell"
  quantity: number
  price: number
  status: "open" | "closed"
  pnl?: number
  createdAt: string
}

interface TradeState {
  trades: Trade[]
  loading: boolean
  closingTradeId: string | null
  error: string | null
}

const initialState: TradeState = {
  trades: [],
  loading: false,
  closingTradeId: null,
  error: null,
}

// ✅ Async Thunks
export const fetchTrades = createAsyncThunk("trade/fetchTrades", async (_, { rejectWithValue }) => {
  try {
    return await tradingService.getUserTrades()
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Failed to fetch trades")
  }
})

export const closeTrade = createAsyncThunk("trade/closeTrade", async (tradeId: string, { rejectWithValue }) => {
  try {
    console.log("Dispatching closeTrade for ID:", tradeId)
    await tradingService.closeTrade(tradeId)
    return tradeId
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Failed to close trade")
  }
})

const tradeSlice = createSlice({
  name: "trade",
  initialState,
  reducers: {
    setTrades: (state, action: PayloadAction<Trade[]>) => {
      state.trades = action.payload
    },
    addTrade: (state, action: PayloadAction<Trade>) => {
      console.log("Adding trade:", action.payload)
      state.trades.unshift(action.payload) // push new trade at top
    },
    clearTrades: (state) => {
      state.trades = []
      state.error = null
      state.loading = false
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch trades
      .addCase(fetchTrades.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTrades.fulfilled, (state, action: PayloadAction<Trade[]>) => {
        state.loading = false
        state.trades = action.payload
      })
      .addCase(fetchTrades.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // Close trade
      .addCase(closeTrade.pending, (state, action) => {
        state.closingTradeId = action.meta.arg
      })
      .addCase(closeTrade.fulfilled, (state, action: PayloadAction<string>) => {
        state.closingTradeId = null
        state.trades = state.trades.map((t) =>
          t._id === action.payload ? { ...t, status: "closed" } : t
        )
      })
      .addCase(closeTrade.rejected, (state, action) => {
        state.closingTradeId = null
        state.error = action.payload as string
      })
  },
})

export const { setTrades,addTrade, clearTrades, clearError } = tradeSlice.actions
export default tradeSlice.reducer
