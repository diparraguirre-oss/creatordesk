'use client';

import { useState, useEffect } from 'react';
import { RefreshCw, Key, Check, AlertCircle, Calendar, Trash2 } from 'lucide-react';

interface CreatorProfile {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  created_at: string;
  subscription_expires_at: string | null;
  subscription_status: string | null;
}

export default function AdminDashboard() {
  const [creators, setCreators] = useState<CreatorProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [passwords, setPasswords] = useState<{ [key: string]: string }>({});
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchCreators = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (Array.isArray(data)) {
        setCreators(data);
      } else if (data.users) {
        setCreators(data.users);
      }
    } catch (err) {
      console.error('Error al cargar creadores:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCreators();
  }, []);

  const getLoginCredential = (creator: CreatorProfile) => {
    if (creator.phone) return creator.phone;
    if (creator.email) {
      if (creator.email.startsWith('phone_') && creator.email.endsWith('@creatordesk.app')) {
        const phoneClean = creator.email.replace('phone_', '').replace('@creatordesk.app', '');
        return `Tel: ${phoneClean}`;
      }
      return creator.email;
    }
    return 'No registrado';
  };

  const getExpirationDate = (creator: CreatorProfile) => {
    if (creator.subscription_expires_at) {
      return new Date(creator.subscription_expires_at).toLocaleDateString('es-PE');
    }
    if (creator.created_at) {
      const createdDate = new Date(creator.created_at);
      createdDate.setDate(createdDate.getDate() + 7);
      return createdDate.toLocaleDateString('es-PE');
    }
    return '-';
  };

  const handleUpdatePassword = async (userId: string) => {
    const newPassword = passwords[userId];
    if (!newPassword || newPassword.length < 6) {
      setMsg({ type: 'error', text: 'La contraseña debe tener al menos 6 caracteres' });
      return;
    }

    setUpdatingId(userId);
    setMsg(null);

    try {
      const res = await fetch('/api/admin/update-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setMsg({ type: 'success', text: 'Contraseña actualizada correctamente' });
        setPasswords((prev) => ({ ...prev, [userId]: '' }));
      } else {
        setMsg({ type: 'error', text: data.error || 'Error al actualizar contraseña' });
      }
    } catch (err: any) {
      setMsg({ type: 'error', text: 'Error de conexión con el servidor' });
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteUser = async (userId: string, name: string | null) => {
    const confirmDelete = window.confirm(`¿Estás seguro de eliminar el registro de "${name || 'este usuario'}"? Esta acción no se puede deshacer.`);
    if (!confirmDelete) return;

    setDeletingId(userId);
    setMsg(null);

    try {
      const res = await fetch('/api/admin/delete-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();

      if (res.ok) {
        setMsg({ type: 'success', text: 'Usuario eliminado correctamente' });
        // Remover de la lista local de inmediato
        setCreators((prev) => prev.filter((item) => item.id !== userId));
      } else {
        setMsg({ type: 'error', text: data.error || 'Error al eliminar usuario' });
      }
    } catch (err) {
      setMsg({ type: 'error', text: 'Error de conexión con el servidor' });
    } finally {
      setDeletingId(null);
    }
  };

  const handleAdd30Days = async (userId: string, currentExp: string | null) => {
    try {
      const res = await fetch('/api/admin/extend-trial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, currentExp, days: 30 }),
      });
      if (res.ok) {
        fetchCreators();
      }
    } catch (err) {
      console.error('Error al extender trial:', err);
    }
  };

  const filteredCreators = creators.filter((c) => {
    const searchLower = search.toLowerCase();
    const name = (c.full_name || '').toLowerCase();
    const cred = getLoginCredential(c).toLowerCase();
    return name.includes(searchLower) || cred.includes(searchLower);
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10 space-y-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Panel Administrador
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Control total de CreatorDesk SaaS
            </p>
          </div>
          <button
            onClick={fetchCreators}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 rounded-xl text-sm border border-slate-700/80 transition shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Actualizar Todo
          </button>
        </div>

        {/* Alertas */}
        {msg && (
          <div
            className={`p-4 rounded-xl flex items-center gap-3 text-sm ${
              msg.type === 'success'
                ? 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-300'
                : 'bg-rose-950/80 border border-rose-500/50 text-rose-300'
            }`}
          >
            {msg.type === 'success' ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {msg.text}
          </div>
        )}

        {/* Buscador */}
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por nombre, correo o teléfono..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm shadow-inner"
          />
          <svg
            className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Tabla Creadores */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-950/90 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-4 px-6">Creador</th>
                  <th className="py-4 px-6">Credencial (Login)</th>
                  <th className="py-4 px-6">Registrado El</th>
                  <th className="py-4 px-6">Vence El</th>
                  <th className="py-4 px-6">Estado</th>
                  <th className="py-4 px-6">Cambiar Contraseña</th>
                  <th className="py-4 px-6 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredCreators.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-slate-500">
                      {loading ? 'Cargando datos...' : 'No se encontraron creadores registrados.'}
                    </td>
                  </tr>
                ) : (
                  filteredCreators.map((creator) => (
                    <tr key={creator.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-4 px-6 font-semibold text-slate-100">
                        {creator.full_name || 'Sin nombre'}
                      </td>
                      <td className="py-4 px-6 text-slate-300 font-mono text-xs">
                        {getLoginCredential(creator)}
                      </td>
                      <td className="py-4 px-6 text-slate-400">
                        {creator.created_at ? new Date(creator.created_at).toLocaleDateString('es-PE') : '-'}
                      </td>
                      <td className="py-4 px-6 font-semibold text-amber-400">
                        {getExpirationDate(creator)}
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded-full text-xs font-semibold whitespace-nowrap">
                          PRUEBA (7 DÍAS)
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <input
                            type="password"
                            placeholder="Nueva clave"
                            value={passwords[creator.id] || ''}
                            onChange={(e) => setPasswords({ ...passwords, [creator.id]: e.target.value })}
                            className="px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:border-purple-500 focus:outline-none w-32 placeholder-slate-600"
                          />
                          <button
                            onClick={() => handleUpdatePassword(creator.id)}
                            disabled={updatingId === creator.id}
                            className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-medium transition flex items-center gap-1.5 disabled:opacity-50"
                          >
                            <Key className="w-3.5 h-3.5" />
                            Guardar
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleAdd30Days(creator.id, creator.subscription_expires_at)}
                            className="px-3 py-1.5 bg-indigo-950 border border-indigo-700/80 hover:bg-indigo-900/80 text-indigo-200 rounded-lg text-xs font-medium transition flex items-center gap-1.5 whitespace-nowrap"
                          >
                            <Calendar className="w-3.5 h-3.5" />
                            +30 Días
                          </button>
                          <button
                            onClick={() => handleDeleteUser(creator.id, creator.full_name)}
                            disabled={deletingId === creator.id}
                            className="px-3 py-1.5 bg-rose-950/80 border border-rose-700/80 hover:bg-rose-900 text-rose-300 rounded-lg text-xs font-medium transition flex items-center gap-1.5 whitespace-nowrap disabled:opacity-50"
                            title="Eliminar usuario"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}