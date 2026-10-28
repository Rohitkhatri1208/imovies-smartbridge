import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Clapperboard, Ticket, UserRound, LogOut, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
export default function Layout({ children }) {
  const { user, logout } = useAuth(); const navigate = useNavigate();
  const signOut = () => { logout(); navigate('/'); };
  return <><header className="topbar"><Link className="brand" to="/"><span className="brand-icon"><Clapperboard size={22}/></span>iMovies<span className="brand-dot">.</span></Link><nav><NavLink to="/" end>Discover</NavLink>{user && <NavLink to="/bookings"><Ticket size={16}/> My bookings</NavLink>}{user?.role === 'admin' && <NavLink to="/admin"><ShieldCheck size={16}/> Admin</NavLink>}</nav><div className="nav-right">{user ? <><span className="hello">Hi, {user.name.split(' ')[0]}</span><button className="icon-button" onClick={signOut} title="Log out"><LogOut size={17}/></button></> : <Link className="button button-small" to="/login"><UserRound size={16}/> Sign in</Link>}</div></header><main>{children}</main><footer><div className="brand footer-brand"><Clapperboard size={20}/> iMovies<span className="brand-dot">.</span></div><p>Good stories deserve a great screen.</p><small>Student project · Demo bookings only · © {new Date().getFullYear()} iMovies</small></footer></>;
}
