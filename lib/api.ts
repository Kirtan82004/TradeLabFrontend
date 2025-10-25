const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api"

class ApiClient {
  private getAuthHeaders(): HeadersInit {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    }
  }

  private async handleResponse(response: Response) {
    if (response.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token")
        window.location.href = "/login"
      }
      throw new Error("Unauthorized")
    }

    if (!response.ok) {
      const error = await response.text()
      throw new Error(error || `HTTP error! status: ${response.status}`)
    }

    const contentType = response.headers.get("content-type")
    if (contentType && contentType.includes("application/json")) {
      return response.json()
    }
    return response.text()
  }

  async get(url: string) {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: "GET",
      headers: this.getAuthHeaders(),
    })
    return this.handleResponse(response)
  }

  async post(url: string, data?: any) {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    })
    return this.handleResponse(response)
  }

  async put(url: string, data?: any) {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: "PUT",
      headers: this.getAuthHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    })
    return this.handleResponse(response)
  }

  async delete(url: string) {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: "DELETE",
      headers: this.getAuthHeaders(),
    })
    return this.handleResponse(response)
  }
}

const api = new ApiClient()
export default api
