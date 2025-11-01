// services/authService.ts
import { jwtDecode } from 'jwt-decode';
import { User } from '../types';

const tokenKey = 'token';

function getCurrentUser(): User | null {
  try {
    const token = localStorage.getItem(tokenKey);
    if (!token) return null;

    const decoded: any = jwtDecode(token);

    // Check if rows[0] exists
    if (decoded?.rows?.length > 0) {
      return decoded.rows[0] as User;
    }

    return null;
  } catch (error) {
    console.error('Invalid token or decode failed:', error);
    return null;
  }
}
function isTokenExpired(): boolean {
  try {
    const token = localStorage.getItem(tokenKey);
    if (!token) return true;

    const decoded: any = jwtDecode(token);
    const currentTime = Date.now() / 1000; // in seconds

    return decoded.exp < currentTime;
  } catch {
    return true;
  }
}
function logout() {
  localStorage.removeItem(tokenKey);
}

export default {
  getCurrentUser,isTokenExpired,logout,
};
