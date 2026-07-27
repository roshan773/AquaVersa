import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/api';
import { Waves, Lock, Mail, Loader2, AlertCircle } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await loginUser({ email, password });
      
      // Store in auth context
      login(data.accessToken, data.refreshToken, {
        id: data.user.id,
        username: data.user.username,
        email: data.user.email,
        role: data.user.role
      });

      navigate('/admin');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 font-semibold text-sm">
      <div className="glass rounded-3xl p-6 md:p-10 border border-slate-800/85 w-full max-w-md bg-gradient-to-br from-slate-950 to-[#071224]/50 space-y-6">
        
        {/* Brand */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-sky-500/10 rounded-2xl border border-sky-500/20 text-sky-400">
            <Waves className="h-7 w-7" />
          </div>
          <h2 className="text-2xl font-black text-slate-100">Portal Authorization</h2>
          <p className="text-xs text-slate-400">Authenticate admin session permissions.</p>
        </div>

        {error && (
          <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl flex items-center space-x-2.5">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <span className="text-xs font-bold">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="email"
                placeholder="admin@fishversa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950/60 border border-slate-700/60 rounded-xl px-4 py-2.5 pl-9 text-xs text-slate-200 focus:outline-none focus:border-sky-400 font-semibold"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950/60 border border-slate-700/60 rounded-xl px-4 py-2.5 pl-9 text-xs text-slate-200 focus:outline-none focus:border-sky-400 font-semibold"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-sky-400 to-sky-500 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors btn-glow-cyan flex items-center justify-center space-x-2 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Verifying credentials...</span>
              </>
            ) : (
              <span>Authorize Login</span>
            )}
          </button>
        </form>

        <p className="text-[10px] text-slate-500 leading-normal text-center">
          Demo Admin Credentials: <br/> Email: <span className="text-slate-400 font-bold">admin@fishversa.com</span> &bull; Password: <span className="text-slate-400 font-bold">AdminPassword123!</span>
        </p>

      </div>
    </div>
  );
};
export default AdminLogin;
