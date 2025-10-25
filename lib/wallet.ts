import api from "./api"

export interface Wallet {
  balance: number
  currency: string
  lastUpdated: string
}

export interface DepositRequest {
  amount: number
  currency: string
}

export interface WithdrawRequest {
  amount: number
  currency: string
}

export const walletService = {
  // Get current wallet balance
  async getWallet(): Promise<Wallet> {
    const response = await api.get("/wallet")
    console.log("Wallet response:", response)
    return response.data as Wallet
  },

  // Deposit money to wallet
  async deposit(request: DepositRequest): Promise<Wallet> {
    const response = await api.post("/wallet/deposit", request)
    return response.data as Wallet
  },

  // Withdraw money from wallet
  async withdraw(request: WithdrawRequest): Promise<Wallet> {
    const response = await api.post("/wallet/withdraw", request)
    return response.data as Wallet
  },

  // Get wallet transaction history
  async getTransactions(): Promise<Array<{ id: string; type: "deposit" | "withdraw"; amount: number; date: string }>> {
    const response = await api.get("/wallet/transactions")
    return response.data
  },
}
