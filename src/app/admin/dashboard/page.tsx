'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';

export default function AdminDashboardPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [creators, setCreators] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCreators = async () => {
    try {
      const res = await fetch('/api/admin/creators');
      const data = await res.json();
      if (res.ok && data.creators) {
        setCreators(data.creators);
      }
    } catch (e) {
      console.error('Error al obtener creadores:', e);
    }
  };

  useEffect(() => {
    const adminSession = localStorage.getItem('creatordesk_admin_session');

    if (!adminSession) {
      window.location.href = '/admin/login';
      return;
    }

    try {
      const parsed = JSON.parse(adminSession);
      if (parsed?.authenticated) {
        setAuthenticated(true);
        fetchCreators();
      } else {
        window.location.href = '/admin/login';
        return;
      }
    } catch (e) {
      window.location.href = '/admin/login';
      return;
    }

    setLoading(false);
  }, []);

  const handleAdminLogout = () => {
    localStorage.removeItem('creatordesk_admin_session');
    window.location.href = '/admin/login';
  };

  const filteredCreators = creators.filter((c) =>
    c.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone?.includes(searchTerm) ||
    c.slug?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading || !authenticated) {
    return (
      <div className="min-h-screen bg-[#080811] flex items-center justify-center text-white text-sm font-medium">
        Cargando Panel de Control Administrativo...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080811] text-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Cabecera Principal */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-purple-900/30 pb-4 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center font-black text-white text-base shadow-md shadow-purple-900/40">
              👑
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Panel Administrador v2</h1>
              <p className="text-xs text-slate-400">Control total de CreatorDesk SaaS</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchCreators}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold rounded-xl text-slate-200 transition"
            >
              🔄 Actualizar
            </button>
            <button
              onClick={handleAdminLogout}
              className="px-4 py-2 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/50 text-xs font-semibold rounded-xl text-rose-200 transition"
            >
              Cerrar Sesión Admin
            </button>
          </div>
        </header>

        {/* Métricas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#0d0d1b] border border-slate-800/80 p-5 rounded-2xl space-y-1">
            <span className="text-xs text-slate-400 font-medium">Total de Creadores Registrados</span>
            <div className="text-2xl font-black text-purple-400">{creators.length}</div>
          </div>
          <div className="bg-[#0d0d1b] border border-slate-800/80 p-5 rounded-2xl space-y-1">
            <span className="text-xs text-slate-400 font-medium">Cuentas en Prueba Gratuita</span>
            <div className="text-2xl font-black text-pink-400">
              {creators.filter(c => c.subscriptionStatus.includes('PRUEBA')).length}
            </div>
          </div>
          <div className="bg-[#0d0d1b] border border-slate-800/80 p-5 rounded-2xl space-y-1">
            <span className="text-xs text-slate-400 font-medium">Estado de la Base de Datos</span>
            <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 pt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Sincronizado en Tiempo Real
            </div>
          </div>
        </div>

        {/* Buscador de Creadores */}
        <div className="flex items-center justify-between gap-4 bg-[#0d0d1b] p-4 rounded-2xl border border-slate-800/80">
          <input
            type="text"
            placeholder="Buscar por nombre, correo, teléfono o slug..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 transition"
          />
          <span className="text-xs text-slate-400 hidden sm:inline">
            Mostrando {filteredCreators.length} de {creators.length} registros
          </span>
        </div>

        {/* Tabla de Creadores */}
        <div className="bg-[#0d0d1b] border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 uppercase font-semibold">
                <tr>
                  <th className="py-3.5 px-4">Creador / Nombre</th>
                  <th className="py-3.5 px-4">Contacto (Correo / Celular)</th>
                  <th className="py-3.5 px-4">Ruta Personalizada</th>
                  <th className="py-3.5 px-4">Estado Membresía</th>
                  <th className="py-3.5 px-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {filteredCreators.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500">
                      No se encontraron cuentas asociadas.
                    </td>
                  </tr>
                ) : (
                  filteredCreators.map((c) => (
                    <tr key={c.id} className="hover:bg-slate-900/40 transition">
                      <td className="py-3.5 px-4 font-semibold text-white">
                        {c.fullName}
                      </td>
                      <td className="py-3.5 px-4 space-y-0.5">
                        <div className="text-slate-200">{c.email}</div>
                        {c.phone !== 'N/A' && (
                          <div className="text-[10px] text-purple-400 font-mono">📱 {c.phone}</div>
                        )}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-purple-300">
                        /creatordesk/{c.slug}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 bg-purple-950/80 border border-purple-800/60 text-purple-300 rounded-lg text-[10px] font-bold uppercase">
                          {c.subscriptionStatus}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center space-x-2">
                        <a
                          href={`/creatordesk/${c.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-block px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-lg text-[11px] transition shadow-sm"
                        >
                          👁️ Ver Espacio
                        </a>
                      </td>
                    </tr>
                  ))
                ) }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}