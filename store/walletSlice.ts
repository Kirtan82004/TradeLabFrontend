import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Wallet as WalletType } from "@/lib/wallet"

interface WalletState {
  wallet: WalletType | null
  loading: boolean
  error: string | null
  dailyChange: number
}

const initialState: WalletState = {
  wallet: null,
  loading: false,
  error: null,
  dailyChange: 0,
}

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    // Fetching wallet
    fetchStart(state) {
      state.loading = true
      state.error = null
    },
    fetchSuccess(state, action: PayloadAction<WalletType>) {
      state.loading = false
      state.wallet = action.payload
      state.error = null
    },
    fetchFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
    // Update wallet balance dynamically (e.g., after trade)
    updateBalance(state, action: PayloadAction<number>) {
      if (state.wallet) {
        state.wallet.balance = action.payload
      }
    },
    // Update daily change (optional, if API gives or calculate manually)
    updateDailyChange(state, action: PayloadAction<number>) {
      state.dailyChange = action.payload
    },
    // Reset wallet (e.g., on logout)
    resetWallet(state) {
      state.wallet = null
      state.loading = false
      state.error = null
      state.dailyChange = 0
    },
  },
})

export const { fetchStart, fetchSuccess, fetchFailure, updateBalance, updateDailyChange, resetWallet } = walletSlice.actions
export default walletSlice.reducer
