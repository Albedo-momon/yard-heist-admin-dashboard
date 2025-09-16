// Cookie utility functions
// Note: For HTTP-only cookies, we can't directly access them from JavaScript
// The server should set the cookie with httpOnly flag, and the browser will
// automatically include it in requests

/**
 * Set a regular cookie (not HTTP-only)
 * This is used as a fallback for token storage
 */
export const setCookie = (name: string, value: string, days: number = 7): void => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict;Secure=${window.location.protocol === 'https:'}`;
};

/**
 * Get a cookie value by name
 */
export const getCookie = (name: string): string | null => {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

/**
 * Delete a cookie
 */
export const deleteCookie = (name: string): void => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

/**
 * Check if cookies are enabled
 */
export const areCookiesEnabled = (): boolean => {
  try {
    document.cookie = 'cookietest=1';
    const ret = document.cookie.indexOf('cookietest=') !== -1;
    document.cookie = 'cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT';
    return ret;
  } catch (e) {
    return false;
  }
};

/**
 * Token management functions
 */
export const tokenUtils = {
  // Store token in localStorage as fallback (since we can't access HTTP-only cookies)
  setToken: (token: string): void => {
    localStorage.setItem('admin_token', token);
  },

  // Get token from localStorage
  getToken: (): string | null => {
    return localStorage.getItem('admin_token');
  },

  // Remove token
  removeToken: (): void => {
    localStorage.removeItem('admin_token');
  },

  // Check if token exists
  hasToken: (): boolean => {
    return !!localStorage.getItem('admin_token');
  },
};