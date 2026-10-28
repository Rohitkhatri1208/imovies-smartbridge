import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api';
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => { try { return JSON.parse(localStorage.getItem('imovies_user')); } catch { return null; } });
  const [loading, setLoading] = useState(Boolean(localStorage.getItem('imovies_token')));
  useEffect(() => { if (!localStorage.getItem('imovies_token')) return; api.get('/auth/me').then(r => { setUser(r.data.user); localStorage.setItem('imovies_user', JSON.stringify(r.data.user)); }).catch(() => { localStorage.removeItem('imovies_token'); localStorage.removeItem('imovies_user'); setUser(null); }).finally(() => setLoading(false)); }, []);
  const login = data => { localStorage.setItem('imovies_token', data.token); localStorage.setItem('imovies_user', JSON.stringify(data.user)); setUser(data.user); };
  const logout = () => { localStorage.removeItem('imovies_token'); localStorage.removeItem('imovies_user'); setUser(null); };
  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
