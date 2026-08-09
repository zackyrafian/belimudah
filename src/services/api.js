const API = import.meta.env.VITE_SERVER_URL; 

async function request(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      message = body.message || body.error || message;
    } catch {
      console.log(message)
    }
    throw new Error(message);
  }
  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  get: (path, opts) => request(path, { ...opts, method: 'GET' }),
  post: (path, body, opts) =>
    request(path, { ...opts, method: 'POST', body: JSON.stringify(body)}),
  put: (path, body, opts) =>
    request(path, { ...opts, method: 'PUT', body: JSON.stringify(body)}),
  patch: (path, body, opts) =>
    request(path, { ...opts, method: 'PATCH', body: JSON.stringify(body) }),
  delete: (path, opts) => request(path, { ...opts, method: 'DELETE' }),
};