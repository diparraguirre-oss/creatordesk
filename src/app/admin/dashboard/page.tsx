'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';

export default function AdminDashboardPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [creators, setCreators] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modales
  const [selectedCreator, setSelectedCreator] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const [selectedPlanDays, setSelectedPlanDays] = useState<number>(30);
  const [actionLoading, setActionLoading] = useState(false);

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

  const formatDate = (isoStr: string) => {
    if (!isoStr) return 'N/A';
    const d = new Date(isoStr);
    return d.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  // 1. OJO: Inyectar sesión y abrir directamente
  const handleViewCreatorSpace = (creator: any) => {
    localStorage.setItem('creatordesk_user', JSON.stringify({
      email: creator.email,
      slug: creator.slug,
      subscription_status: creator.subscriptionStatus,
      created_at: creator.createdAt
    }));
    window.open(`/creatordesk/${creator.slug}`, '_blank');
  };

  // 2. ELIMINAR CREADOR
  const handleConfirmDelete = async () => {
    if (!selectedCreator) return;
    setActionLoading(true);

    try {
      const res = await fetch('/api/admin/creators/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', userId: selectedCreator.id })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsDeleteModalOpen(false);
        setSelectedCreator(null);
        fetchCreators();
      } else {
        alert(data.error || 'Error al eliminar usuario.');
      }
    } catch (e) {
      alert('Error de red al eliminar usuario.');
    } finally {
      setActionLoading(false);
    }
  };

  // 3. EDITAR MEMBRESÍA
  const handleSavePlan = async () => {
    if (!selectedCreator) return;
    setActionLoading(true);

    try {
      const res = await fetch('/api/admin/creators/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'updatePlan',
          userId: selectedCreator.id,
          planDays: selectedPlanDays
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsEditModalOpen(false);
        setSelectedCreator(null);
        fetchCreators();
      } else {
        alert(data.error || 'Error al actualizar membresía.');
      }
    } catch (e) {
      alert('Error de red al actualizar membresía.');
    } finally {
      setActionLoading(false);
    }
  };

  // 4. RESET DE CONTRASEÑA (LLAVE)
  const handleConfirmResetPassword = async () => {
    if (!selectedCreator) return;
    setActionLoading(true);

    try {
      const res = await fetch('/api/admin/creators/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'resetPassword', userId: selectedCreator.id })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsResetModalOpen(false);
        setSelectedCreator(null);
        fetchCreators();
        alert('Contraseña restablecida con éxito a: Inicio01');
      } else {
        alert(data.error || 'Error al reiniciar contraseña.');
      }
    } catch (e) {
      alert('Error de red al reiniciar contraseña.');
    } finally {
      setActionLoading(false);
    }
  };

  const filteredCreators = creators.filter((c) =>
    c.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone?.includes(searchTerm)
  );

  if (loading || !authenticated) {
    return (
      <div className="min-h-screen bg-[#080811] flex items-center justify-center text-white text-sm font-medium">
        Cargando Panel de Control Administrativo...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080811] text-slate-100 p-6 relative">
      <div className="max-w-7xl mx-auto space-y-6">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#0d0d1b] border border-slate-800/80 p-5 rounded-2xl space-y-1">
            <span className="text-xs text-slate-400 font-medium">Total de Creadores Registrados</span>
            <div className="text-2xl font-black text-purple-400">{creators.length}</div>
          </div>
          <div className="bg-[#0d0d1b] border border-slate-800/80 p-5 rounded-2xl space-y-1">
            <span className="text-xs text-slate-400 font-medium">Cuentas Activas</span>
            <div className="text-2xl font-black text-emerald-400">
              {creators.filter(c => !c.isExpired).length}
            </div>
          </div>
          <div className="bg-[#0d0d1b] border border-slate-800/80 p-5 rounded-2xl space-y-1">
            <span className="text-xs text-slate-400 font-medium">Cuentas Vencidas</span>
            <div className="text-2xl font-black text-rose-400">
              {creators.filter(c => c.isExpired).length}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 bg-[#0d0d1b] p-4 rounded-2xl border border-slate-800/80">
          <input
            type="text"
            placeholder="Buscar por nombre, correo o teléfono..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 transition"
          />
          <span className="text-xs text-slate-400 hidden sm:inline">
            Mostrando {filteredCreators.length} de {creators.length} registros
          </span>
        </div>

        <div className="bg-[#0d0d1b] border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900/80 border-b border-slate-800 text-slate-400 uppercase font-semibold">
                <tr>
                  <th className="py-3.5 px-4">Creador / Nombre</th>
                  <th className="py-3.5 px-4">Contacto (Correo / Celular)</th>
                  <th className="py-3.5 px-4">Fecha Creación</th>
                  <th className="py-3.5 px-4">Fecha Vencimiento</th>
                  <th className="py-3.5 px-4">Estado Membresía</th>
                  <th className="py-3.5 px-4 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {filteredCreators.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-500">
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
                      <td className="py-3.5 px-4 text-slate-300 font-medium">
                        {formatDate(c.createdAt)}
                      </td>
                      <td className="py-3.5 px-4 text-slate-300 font-medium">
                        {formatDate(c.expiresAt)}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase border ${
                            c.isExpired
                              ? 'bg-rose-950/80 border-rose-800/60 text-rose-400'
                              : 'bg-purple-950/80 border-purple-800/60 text-purple-300'
                          }`}
                        >
                          {c.subscriptionStatus}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center space-x-1.5">
                          {/* 👁️ Ver Espacio sin pedir Login */}
                          <button
                            onClick={() => handleViewCreatorSpace(c)}
                            title="Ver Espacio (Acceso Directo)"
                            className="p-2 bg-purple-900/40 hover:bg-purple-800/70 border border-purple-700/50 text-purple-200 rounded-xl transition shadow-sm text-sm"
                          >
                            👁️
                          </button>

                          {/* ✏️ Editar Membresía */}
                          <button
                            onClick={() => { setSelectedCreator(c); setIsEditModalOpen(true); }}
                            title="Editar Membresía"
                            className="p-2 bg-indigo-900/40 hover:bg-indigo-800/70 border border-indigo-700/50 text-indigo-200 rounded-xl transition shadow-sm text-sm"
                          >
                            ✏️
                          </button>

                          {/* 🔑 Reiniciar Contraseña */}
                          <button
                            onClick={() => { setSelectedCreator(c); setIsResetModalOpen(true); }}
                            title="Reiniciar Contraseña a Inicio01"
                            className="p-2 bg-amber-900/40 hover:bg-amber-800/70 border border-amber-700/50 text-amber-200 rounded-xl transition shadow-sm text-sm"
                          >
                            🔑
                          </button>

                          {/* 🗑️ Eliminar Creador con Modal */}
                          <button
                            onClick={() => { setSelectedCreator(c); setIsDeleteModalOpen(true); }}
                            title="Eliminar Registro"
                            className="p-2 bg-rose-950/50 hover:bg-rose-900/80 border border-rose-800/60 text-rose-300 rounded-xl transition shadow-sm text-sm"
                          >
                            🗑️
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

      {/* 1. Modal Editar Membresía */}
      {isEditModalOpen && selectedCreator && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#0d0d1b] border border-purple-900/50 p-6 rounded-3xl max-w-sm w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-white">Editar Membresía</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-white text-xs font-bold">✕</button>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-slate-400">Creador:</span>
              <p className="text-sm font-semibold text-purple-300">{selectedCreator.fullName}</p>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300">Seleccionar Plan de Acceso</label>
              <select
                value={selectedPlanDays}
                onChange={(e) => setSelectedPlanDays(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 transition"
              >
                <option value={7}>Prueba Gratuita (7 Días)</option>
                <option value={30}>Plan Estándar (30 Días)</option>
                <option value={60}>Plan Pro (60 Días)</option>
                <option value={0}>Marcar como VENCIDO (Bloquear)</option>
              </select>
            </div>
            <div className="flex items-center justify-end space-x-2 pt-2">
              <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition">Cancelar</button>
              <button onClick={handleSavePlan} disabled={actionLoading} className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 to-indigo-500 text-white font-bold text-xs rounded-xl transition shadow-md shadow-purple-900/40 disabled:opacity-50">
                {actionLoading ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Modal Eliminar Creador */}
      {isDeleteModalOpen && selectedCreator && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#0d0d1b] border border-rose-900/60 p-6 rounded-3xl max-w-sm w-full space-y-4 shadow-2xl text-center">
            <div className="w-12 h-12 bg-rose-500/10 border border-rose-500/30 rounded-2xl mx-auto flex items-center justify-center text-2xl">
              🗑️
            </div>
            <div className="space-y-1">
              <h2 className="text-base font-bold text-white">¿Eliminar Usuario?</h2>
              <p className="text-xs text-slate-400">
                ¿Estás seguro de que deseas eliminar a <strong className="text-rose-300">{selectedCreator.fullName}</strong>? Esta acción borra su cuenta permanentemente.
              </p>
            </div>
            <div className="flex items-center justify-center space-x-3 pt-2">
              <button onClick={() => setIsDeleteModalOpen(false)} className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition">
                Cancelar
              </button>
              <button onClick={handleConfirmDelete} disabled={actionLoading} className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl transition shadow-md shadow-rose-900/40 disabled:opacity-50">
                {actionLoading ? 'Eliminando...' : 'Sí, Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Modal Reiniciar Contraseña (Llave) */}
      {isResetModalOpen && selectedCreator && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#0d0d1b] border border-amber-900/60 p-6 rounded-3xl max-w-sm w-full space-y-4 shadow-2xl text-center">
            <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-2xl mx-auto flex items-center justify-center text-2xl">
              🔑
            </div>
            <div className="space-y-1">
              <h2 className="text-base font-bold text-white">Restablecer Contraseña</h2>
              <p className="text-xs text-slate-400">
                La contraseña de <strong className="text-amber-300">{selectedCreator.fullName}</strong> se reiniciará a <code className="bg-slate-900 px-1.5 py-0.5 rounded text-amber-400">Inicio01</code> y se le exigirá cambiarla al iniciar sesión.
              </p>
            </div>
            <div className="flex items-center justify-center space-x-3 pt-2">
              <button onClick={() => setIsResetModalOpen(false)} className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition">
                Cancelar
              </button>
              <button onClick={handleConfirmResetPassword} disabled={actionLoading} className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl transition shadow-md shadow-amber-900/40 disabled:opacity-50">
                {actionLoading ? 'Procesando...' : 'Restablecer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}