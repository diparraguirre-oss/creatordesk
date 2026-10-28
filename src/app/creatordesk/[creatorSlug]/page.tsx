'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';

export default function CreatorDeskAppPage({ params }: { params: { creatorSlug?: string } }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [isExpired, setIsExpired] = useState(false);
  const [daysRemaining, setDaysRemaining] = useState<number>(7);
  const [activeTab, setActiveTab] = useState<'home' | 'colabs' | 'calendar' | 'tasks' | 'income' | 'mediakit'>('home');

  // Estados interactivos para pruebas
  const [colabs, setColabs] = useState([
    { id: '1', brand: 'Adidas Originals', status: 'En Aprobación', amount: 1500, type: '2 Reels + 3 Stories', dueDate: '15/11/2026' },
    { id: '2', brand: 'Aurelia Cosmetics', status: 'Activa', amount: 800, type: '1 TikTok + 1 Post', dueDate: '20/11/2026' },
    { id: '3', brand: 'Cúspide Relojes', status: 'Cobrado', amount: 2200, type: '1 Reel Unboxing', dueDate: '02/11/2026' }
  ]);

  const [tasks, setTasks] = useState([
    { id: 't1', title: 'Enviar guión para aprobación a Adidas', brand: 'Adidas', status: 'pendiente', category: 'Grabar' },
    { id: 't2', title: 'Grabar video de unboxing cosméticos', brand: 'Aurelia', status: 'pendiente', category: 'Grabar' },
    { id: 't3', title: 'Revisar contrato de patrocinio', brand: 'Loto Spa', status: 'completada', category: 'Manual' }
  ]);

  useEffect(() => {
    const localUser = localStorage.getItem('creatordesk_user');

    if (localUser) {
      try {
        const parsed = JSON.parse(localUser);
        setUser(parsed);

        const createdTime = parsed.created_at ? new Date(parsed.created_at) : new Date();
        const expiresTime = new Date(createdTime.getTime() + 7 * 24 * 60 * 60 * 1000);

        const now = new Date();
        const diffMs = expiresTime.getTime() - now.getTime();
        const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

        setDaysRemaining(days);
        if (days <= 0) {
          setIsExpired(true);
        }
      } catch (e) {
        setUser({ email: 'Creador Activo', slug: params?.creatorSlug || 'creador' });
      }
    } else {
      window.location.href = '/login';
      return;
    }

    setLoading(false);
  }, [params?.creatorSlug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080811] flex items-center justify-center text-white text-sm">
        Cargando CreatorDesk...
      </div>
    );
  }

  // Guardián de expiración
  if (isExpired) {
    return (
      <div className="min-h-screen bg-[#080811] flex items-center justify-center p-4">
        <div className="bg-[#0d0d1b] border border-rose-900/50 p-8 rounded-3xl max-w-md w-full text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/30 rounded-2xl mx-auto flex items-center justify-center text-3xl">
            🔒
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-bold text-white">Periodo de Prueba Vencido</h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tu periodo de prueba de 7 días ha finalizado. Por favor ponte en contacto para renovar tu suscripción a <strong className="text-purple-400">CreatorDesk</strong>.
            </p>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('creatordesk_user');
              window.location.href = '/login';
            }}
            className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl transition"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080811] text-slate-100 pb-28">
      {/* Barra Superior Header */}
      <header className="sticky top-0 z-40 bg-[#080811]/80 backdrop-blur-xl border-b border-purple-900/20 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-xl flex items-center justify-center font-black text-white text-sm shadow-md shadow-purple-900/40">
              CD
            </div>
            <div>
              <h1 className="text-base font-bold text-white tracking-tight">CreatorDesk</h1>
              <p className="text-[11px] text-purple-300/80">Espacio de {user?.slug || 'Creador'}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span className="hidden sm:inline-block px-3 py-1 bg-purple-950/80 border border-purple-800/60 text-purple-300 text-[11px] font-bold rounded-lg uppercase">
              {daysRemaining > 0 ? `Prueba (${daysRemaining} Días)` : 'Plan Activo'}
            </span>
            <button
              onClick={() => {
                localStorage.removeItem('creatordesk_user');
                window.location.href = '/login';
              }}
              className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-semibold rounded-xl text-slate-300 transition"
            >
              Salir
            </button>
          </div>
        </div>
      </header>

      {/* Contenido Principal según Pestaña Activa */}
      <main className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
        
        {/* 1. VISTA HOME */}
        {activeTab === 'home' && (
          <div className="space-y-6 animate-fade-in">
            {/* Saludo y Resumen */}
            <div className="bg-gradient-to-r from-purple-900/40 via-indigo-900/30 to-pink-900/20 border border-purple-800/40 p-6 rounded-3xl space-y-2">
              <h2 className="text-2xl font-black text-white">¡Hola, Creador! 👋</h2>
              <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                Aquí tienes el resumen de tu contenido, colaboraciones activas y métricas financieras de este mes.
              </p>
            </div>

            {/* Módulos Financieros Rápidos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-[#0d0d1b] border border-slate-800/80 p-5 rounded-2xl space-y-2 shadow-lg">
                <span className="text-xs text-slate-400 font-medium">💰 Total Cobrado (Este Mes)</span>
                <div className="text-2xl font-black text-emerald-400">$ 2,200.00</div>
                <p className="text-[10px] text-slate-500">1 pago procesado</p>
              </div>

              <div className="bg-[#0d0d1b] border border-slate-800/80 p-5 rounded-2xl space-y-2 shadow-lg">
                <span className="text-xs text-slate-400 font-medium">⏳ Pendiente por Cobrar</span>
                <div className="text-2xl font-black text-amber-400">$ 2,300.00</div>
                <p className="text-[10px] text-slate-500">2 campañas pendientes</p>
              </div>

              <div className="bg-[#0d0d1b] border border-slate-800/80 p-5 rounded-2xl space-y-2 shadow-lg sm:col-span-2 lg:col-span-1">
                <span className="text-xs text-slate-400 font-medium">📊 Colaboraciones Activas</span>
                <div className="text-2xl font-black text-purple-400">3 Marcas</div>
                <p className="text-[10px] text-purple-300">Adidas, Aurelia, Cúspide</p>
              </div>
            </div>

            {/* Tareas del Día */}
            <div className="bg-[#0d0d1b] border border-slate-800/80 p-6 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>✅</span> Tareas Prioritarias de Hoy
                </h3>
                <button
                  onClick={() => setActiveTab('tasks')}
                  className="text-xs text-purple-400 font-semibold hover:underline"
                >
                  Ver todas
                </button>
              </div>

              <div className="space-y-2">
                {tasks.map((t) => (
                  <div key={t.id} className="flex items-center justify-between p-3 bg-slate-900/60 border border-slate-800 rounded-xl text-xs">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={t.status === 'completada'}
                        onChange={() => {
                          setTasks(tasks.map(x => x.id === t.id ? { ...x, status: x.status === 'completada' ? 'pendiente' : 'completada' } : x));
                        }}
                        className="rounded border-slate-700 bg-slate-800 text-purple-600 focus:ring-0"
                      />
                      <span className={t.status === 'completada' ? 'line-through text-slate-500' : 'text-slate-200 font-medium'}>
                        {t.title}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 bg-purple-950/80 border border-purple-800/60 text-purple-300 text-[10px] rounded-md font-mono">
                      {t.brand}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. VISTA COLABS */}
        {activeTab === 'colabs' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">Gestión de Colaboraciones</h2>
                <p className="text-xs text-slate-400">Controla tus acuerdos, pautas y fechas con las marcas.</p>
              </div>
              <button
                onClick={() => {
                  const brand = prompt('Nombre de la marca:');
                  const amount = prompt('Monto del contrato ($):');
                  if (brand && amount) {
                    setColabs([...colabs, {
                      id: String(Date.now()),
                      brand: brand,
                      status: 'Activa',
                      amount: Number(amount),
                      type: 'Contenido personalizado',
                      dueDate: 'Pendiente'
                    }]);
                  }
                }}
                className="px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-xs rounded-xl shadow-md shadow-purple-950 transition"
              >
                + Nueva Colaboración
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {colabs.map((c) => (
                <div key={c.id} className="bg-[#0d0d1b] border border-slate-800/80 p-5 rounded-2xl space-y-4 shadow-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{c.brand}</span>
                    <span className="px-2.5 py-1 bg-purple-950 border border-purple-800/60 text-purple-300 rounded-lg text-[10px] font-bold">
                      {c.status}
                    </span>
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="text-slate-400">Entregables: <span className="text-slate-200">{c.type}</span></div>
                    <div className="text-slate-400">Monto: <span className="text-emerald-400 font-bold">${c.amount}</span></div>
                    <div className="text-slate-400">Fecha entrega: <span className="text-slate-300 font-mono">{c.dueDate}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. VISTA CALENDARIO */}
        {activeTab === 'calendar' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-xl font-bold text-white">Calendario de Contenidos</h2>
              <p className="text-xs text-slate-400">Programa fechas de grabación, envíos a marcas y fechas de publicación.</p>
            </div>

            <div className="bg-[#0d0d1b] border border-slate-800/80 p-6 rounded-2xl space-y-4 text-center">
              <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/30 rounded-2xl mx-auto flex items-center justify-center text-2xl">
                📅
              </div>
              <h3 className="text-sm font-bold text-white">Sincronización con Google Calendar</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Conecta tu cuenta para ver automáticamente tus grabaciones y alertas de entrega en tu agenda.
              </p>
              <button
                onClick={() => alert('Sincronización con Google Calendar activada exitosamente.')}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-purple-300 font-semibold text-xs rounded-xl border border-purple-800/50 transition"
              >
                Conectar Google Calendar
              </button>
            </div>
          </div>
        )}

        {/* 4. VISTA TAREAS */}
        {activeTab === 'tasks' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Lista de Tareas (To-Do List)</h2>
                <p className="text-xs text-slate-400">Organiza tus pendientes diarios para que no olvides subir ningún video.</p>
              </div>
              <button
                onClick={() => {
                  const t = prompt('Descripción de la tarea:');
                  if (t) {
                    setTasks([...tasks, { id: String(Date.now()), title: t, brand: 'General', status: 'pendiente', category: 'Manual' }]);
                  }
                }}
                className="px-3.5 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl transition"
              >
                + Agregar Tarea
              </button>
            </div>

            <div className="bg-[#0d0d1b] border border-slate-800/80 p-6 rounded-2xl space-y-3">
              {tasks.map((t) => (
                <div key={t.id} className="flex items-center justify-between p-3.5 bg-slate-900/80 border border-slate-800 rounded-xl text-xs">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={t.status === 'completada'}
                      onChange={() => {
                        setTasks(tasks.map(x => x.id === t.id ? { ...x, status: x.status === 'completada' ? 'pendiente' : 'completada' } : x));
                      }}
                      className="rounded border-slate-700 bg-slate-800 text-purple-600 focus:ring-0"
                    />
                    <span className={t.status === 'completada' ? 'line-through text-slate-500' : 'text-slate-200 font-medium'}>
                      {t.title}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 bg-slate-800 text-slate-400 text-[10px] rounded-lg">
                    {t.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. VISTA INGRESOS */}
        {activeTab === 'income' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-xl font-bold text-white">Control de Ingresos y Facturación</h2>
              <p className="text-xs text-slate-400">Visualiza exactamente cuánto ganas por cada marca y qué montos están pendientes.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#0d0d1b] border border-slate-800/80 p-6 rounded-2xl space-y-3">
                <span className="text-xs text-slate-400 font-medium">Ingresos Registrados</span>
                <div className="text-3xl font-black text-emerald-400">$ 4,500.00</div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="w-[60%] h-full bg-emerald-500"></div>
                </div>
                <p className="text-[11px] text-slate-400">60% Cobrado - 40% Pendiente</p>
              </div>

              <div className="bg-[#0d0d1b] border border-slate-800/80 p-6 rounded-2xl space-y-3">
                <span className="text-xs text-slate-400 font-medium">Top Marcas Principales</span>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-200"><span>Cúspide Relojes</span><span className="font-bold text-purple-400">$2,200</span></div>
                  <div className="flex justify-between text-slate-200"><span>Adidas</span><span className="font-bold text-purple-400">$1,500</span></div>
                  <div className="flex justify-between text-slate-200"><span>Aurelia Cosmetics</span><span className="font-bold text-purple-400">$800</span></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. VISTA MEDIA KIT */}
        {activeTab === 'mediakit' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-xl font-bold text-white">Media Kit Profesional</h2>
              <p className="text-xs text-slate-400">Tu presentación para negociar y enviar a las marcas.</p>
            </div>

            <div className="bg-[#0d0d1b] border border-slate-800/80 p-6 rounded-2xl space-y-4">
              <div className="flex items-center space-x-4 border-b border-slate-800 pb-4">
                <div className="w-16 h-16 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-xl font-black text-white">
                  {user?.slug ? user.slug[0].toUpperCase() : 'C'}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{user?.slug || 'Creador de Contenido'}</h3>
                  <p className="text-xs text-purple-400">Lifestyle • Fitness • Tecnología</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800"><span className="text-xs text-slate-400">Instagram</span><p className="text-sm font-bold text-white">182K</p></div>
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800"><span className="text-xs text-slate-400">TikTok</span><p className="text-sm font-bold text-white">240K</p></div>
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800"><span className="text-xs text-slate-400">Engagement</span><p className="text-sm font-bold text-purple-400">4.8%</p></div>
                <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800"><span className="text-xs text-slate-400">Audiencia</span><p className="text-sm font-bold text-pink-400">LATAM</p></div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Menú Flotante de Navegación Inferior (Nuestra versión propia pastel/oscuridad) */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-[#0d0d1b]/90 backdrop-blur-2xl border border-purple-900/40 px-3 py-2 rounded-2xl shadow-2xl flex items-center space-x-1 sm:space-x-2 z-50">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center px-3 py-1.5 rounded-xl transition text-[11px] font-medium ${
            activeTab === 'home' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <span className="text-sm">🏠</span>
          <span>Inicio</span>
        </button>

        <button
          onClick={() => setActiveTab('colabs')}
          className={`flex flex-col items-center px-3 py-1.5 rounded-xl transition text-[11px] font-medium ${
            activeTab === 'colabs' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <span className="text-sm">🤝</span>
          <span>Colabs</span>
        </button>

        <button
          onClick={() => setActiveTab('calendar')}
          className={`flex flex-col items-center px-3 py-1.5 rounded-xl transition text-[11px] font-medium ${
            activeTab === 'calendar' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <span className="text-sm">📅</span>
          <span>Agenda</span>
        </button>

        <button
          onClick={() => setActiveTab('tasks')}
          className={`flex flex-col items-center px-3 py-1.5 rounded-xl transition text-[11px] font-medium ${
            activeTab === 'tasks' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <span className="text-sm">📝</span>
          <span>Tareas</span>
        </button>

        <button
          onClick={() => setActiveTab('income')}
          className={`flex flex-col items-center px-3 py-1.5 rounded-xl transition text-[11px] font-medium ${
            activeTab === 'income' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <span className="text-sm">💰</span>
          <span>Ingresos</span>
        </button>

        <button
          onClick={() => setActiveTab('mediakit')}
          className={`flex flex-col items-center px-3 py-1.5 rounded-xl transition text-[11px] font-medium ${
            activeTab === 'mediakit' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
          }`}
        >
          <span className="text-sm">📁</span>
          <span>MediaKit</span>
        </button>
      </nav>
    </div>
  );
}