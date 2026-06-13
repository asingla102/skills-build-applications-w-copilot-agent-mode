const FALLBACK_API_BASE_URL = 'http://localhost:8000'

export function getApiBaseUrl() {
  const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL

  if (configuredBaseUrl) {
    return configuredBaseUrl
  }

  const { hostname, protocol } = window.location

  if (hostname.endsWith('.app.github.dev')) {
    return `${protocol}//${hostname.replace('5173', '8000')}`
  }

  return FALLBACK_API_BASE_URL
}

export async function fetchJson(path) {
  const response = await fetch(`${getApiBaseUrl()}${path}`)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return response.json()
}