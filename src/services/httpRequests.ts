const BASE_URL =
  process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:3000";
interface EndpointOptions extends Omit<RequestInit, "body"> {
  searchParams?: URLSearchParams;
  body?: unknown;
}

class API {
  private headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  private generateRequest: (defaultRequest: RequestInit) => RequestInit;
  constructor(
    generateRequest: (defaultRequest: RequestInit) => RequestInit = (req) => req
  ) {
    this.generateRequest = generateRequest;
  }

  async get<T>(
    endpoint: string,
    { searchParams, ...nextOptions }: EndpointOptions = {}
  ) {
    const initRequest = {
      method: "GET",
      headers: this.headers,
      ...nextOptions,
      body: JSON.stringify(nextOptions.body),
    };
    const finalRequest = this.generateRequest(initRequest);
    const url = [BASE_URL, endpoint, searchParams].filter(Boolean).join("/");
    const response = await fetch(url, finalRequest);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<T>;
  }
  async post<T>(
    endpoint: string,
    { body, ...nextOptions }: EndpointOptions = {}
  ) {
    const url = [BASE_URL, endpoint].filter(Boolean).join("/");
    const response = await fetch(url, {
      method: "POST",
      headers: this.headers,
      ...nextOptions,
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<T>;
  }
  async put<T>(
    endpoint: string,
    { body, ...nextOptions }: EndpointOptions = {}
  ) {
    const url = [BASE_URL, endpoint].filter(Boolean).join("/");
    const response = await fetch(url, {
      method: "PUT",
      headers: this.headers,
      ...nextOptions,
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<T>;
  }
  async delete<T>(
    endpoint: string,
    { searchParams, ...nextOptions }: EndpointOptions = {}
  ) {
    const url = [BASE_URL, endpoint, searchParams].filter(Boolean).join("/");
    const response = await fetch(url, {
      method: "DELETE",
      headers: this.headers,
      ...nextOptions,
      body: JSON.stringify(nextOptions.body),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<T>;
  }
}

const api = new API();
export const apiAuth = new API();
export default api;
