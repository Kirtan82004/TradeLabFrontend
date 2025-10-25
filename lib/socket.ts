import { io, type Socket } from "socket.io-client"
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

class SocketService {
  private socket: Socket | null = null

  connect() {
    if (!this.socket) {
      this.socket = io(API_BASE_URL|| "http://localhost:3001", {
        auth: {
          token: localStorage.getItem("token"),
        },
      })
    }
    return this.socket
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  }

  on(event: string, callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on(event, callback)
    }
  }

  off(event: string, callback?: (data: any) => void) {
    if (this.socket) {
      this.socket.off(event, callback)
    }
  }

  emit(event: string, data: any) {
    if (this.socket) {
      this.socket.emit(event, data)
    }
  }
}

export const socketService = new SocketService()
