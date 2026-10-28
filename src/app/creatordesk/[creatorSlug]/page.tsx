'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';

export default function CreatorDeskAppPage({ params }: { params: { creatorSlug?: string } }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [displayName, setDisplayName] = useState<string>('');
  const [isExpired, setIsExpired] = useState(false);
  const [daysRemaining, setDaysRemaining] = useState<number>(7);
  const [activeTab, setActiveTab] = useState<'home' | 'colabs' | 'calendar' | 'tasks' | 'income' | 'mediakit'>('colabs');

  // Filtro de Colaboraciones
  const [colabFilter, setColabFilter] = useState<'todas' | 'activas' | 'aprobacion' | 'completadas'>('todas');
  const [showNewColabModal, setShowNewColabModal] = useState(false);

  // Formulario de Nueva Colaboración
  const [brandName, setBrandName] = useState('');
  const [dealType, setDealType] = useState<'Pago' | 'Canje'>('Pago');
  const [currency, setCurrency] = useState<'USD' | 'PEN'>('USD');
  const [amount, setAmount] = useState('');
  const [installments, setInstallments] = useState('1');
  const [paymentDays, setPaymentDays] = useState('30');
  const [deliverables, setDeliverables] = useState({ reels: 1, tiktoks: 0, stories: 2, posts: 0 });

  // Modal para confirmar tarea
  const [pendingTask, setPendingTask] = useState<any>(null);
  const [showTaskConfirmModal, setShowTaskConfirmModal] = useState(false);

  const [tasks, setTasks] = useState([
    { id: 't1', title: 'Enviar guión para aprobación a Adidas', brand: 'Adidas', status: 'pendiente', category: 'Grabar' },
    { id: 't2', title: 'Grabar video de unboxing cosméticos', brand: 'Aurelia', status: 'pendiente', category: 'Grabar' },
    { id: 't3', title: 'Revisar contrato de patrocinio', brand: 'Loto Spa', status: 'completada', category: 'Manual' }
  ]);

  const [colabs, setColabs] = useState([
    {
      id: '1',
      brand: 'Adidas Originals',
      dealType: 'Pago',
      currency: 'USD',
      amount: 1500,
      installments: 1,
      paymentDays: 30,
      status: 'En Aprobación',
      deliverables: '2 Reels, 3 Stories',
      dueDate: '15/11/2026',
      steps: { scriptSent: true, approved: false, published: false, paid: false }
    },
    {
      id: '2',
      brand: 'Aurelia Cosmetics',
      dealType: 'Canje',
      currency: 'PEN',
      amount: 0,
      installments: 1,
      paymentDays: 0,
      status: 'Activa',
      deliverables: '1 TikTok, 1 Post',
      dueDate: '20/11/2026',
      steps: { scriptSent: true, approved: true, published: false, paid: false }
    },
    {
      id: '3',
      brand: 'Cúspide Relojes',
      dealType: 'Pago',
      currency: 'PEN',
      amount: 2200,
      installments: 2,
      paymentDays: 15,
      status: 'Completada',
      deliverables: '1 Reel Unboxing',
      dueDate: '02/11/2026',
      steps: { scriptSent: true, approved: true, published: true, paid: true }
    }
  ]);

  useEffect(() => {
    const localUser = localStorage.getItem('creatordesk_user');

    if (localUser) {
      try {
        const parsed = JSON.parse(localUser);
        setUser(parsed);

        const rawSlug = parsed.slug || params?.creatorSlug || '';
        const formattedName = parsed.full_name || rawSlug.split('.').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        setDisplayName(formattedName || 'Creador');

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
        setDisplayName('Creador');
      }
    } else {
      window.location.href = '/login';
      return;
    }

    setLoading(false);
  }, [params?.creatorSlug]);

  const handleTaskCheckboxClick = (task: any) => {
    if (task.status === 'completada') return;
    setPendingTask(task);
    setShowTaskConfirmModal(true);
  };

  const handleConfirmTaskDone = () => {
    if (!pendingTask) return;
    setTasks(tasks.map(t => t.id === pendingTask.id ? { ...t, status: 'completada' } : t));
    setShowTaskConfirmModal(false);
    setPendingTask(null);
  };

  const handleCreateColab = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName) return;

    const delivArray = [];
    if (deliverables.reels > 0) delivArray.push(`${deliverables.reels} Reels`);
    if (deliverables.tiktoks > 0) delivArray.push(`${deliverables.tiktoks} TikToks`);
    if (deliverables.stories > 0) delivArray.push(`${deliverables.stories} Stories`);
    if (deliverables.posts > 0) delivArray.push(`${deliverables.posts} Posts`);

    const newColabObj = {
      id: String(Date.now()),
      brand: brandName,
      dealType: dealType,
      currency: dealType === 'Pago' ? currency : 'PEN',
      amount: dealType === 'Pago' ? Number(amount) || 0 : 0,
      installments: Number(installments),
      paymentDays: Number(paymentDays),
      status: 'Activa',
      deliverables: delivArray.join(', ') || 'Contenido personalizado',
      dueDate: 'Pendiente',
      steps: { scriptSent: false, approved: false, published: false, paid: false }
    };

    setColabs([newColabObj, ...colabs]);
    setShowNewColabModal(false);
    setBrandName('');
    setAmount('');
  };

  const filteredColabs = colabs.filter(c => {
    if (colabFilter === 'activas') return c.status === 'Activa';
    if (colabFilter === 'aprobacion') return c.status === 'En Aprobación';
    if (colabFilter === 'completadas') return c.status === 'Completada';
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 flex items-center justify-center text-slate-700 text-sm font-semibold">
        Cargando CreatorDesk...
      </div>
    );
  }

  if (isExpired) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-xl border border-white/60 p-8 rounded-3xl max-w-md w-full text-center space-y-6 shadow-xl">
          <div className="w-16 h-16 bg-rose-100 border border-rose-200 text-rose-600 rounded-2xl mx-auto flex items-center justify-center text-3xl">
            🔒
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-bold text-slate-800">Periodo de Prueba Vencido</h1>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tu periodo de prueba de 7 días ha finalizado. Por favor ponte en contacto con administración para renovar tu suscripción a <strong className="text-purple-600">CreatorDesk</strong>.
            </p>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('creatordesk_user');
              window.location.href = '/login';
            }}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xs rounded-xl shadow-md shadow-purple-200"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 text-slate-800 pb-28">
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-purple-100/60 px-6 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-xl flex items-center justify-center font-black text-white text-sm shadow-md shadow-purple-200">
              CD
            </div>
            <div>
              <h1 className="text-base font-extrabold text-slate-800 tracking-tight">CreatorDesk</h1>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span className="hidden sm:inline-block px-3 py-1 bg-purple-100/80 border border-purple-200 text-purple-700 text-[11px] font-bold rounded-lg uppercase">
              {daysRemaining > 0 ? `Prueba (${daysRemaining} Días)` : 'Plan Activo'}
            </span>
            <button
              onClick={() => {
                localStorage.removeItem('creatordesk_user');
                window.location.href = '/login';
              }}
              className="px-3.5 py-1.5 bg-white/80 hover:bg-white border border-slate-200 text-xs font-semibold rounded-xl text-slate-700 transition shadow-sm"
            >
              Salir
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
        
        {/* PESTAÑA HOME */}
        {activeTab === 'home' && (
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-xl border border-white/60 p-6 rounded-3xl space-y-1.5 shadow-xl shadow-purple-100/50">
              <h2 className="text-2xl font-black text-slate-800">¡Hola, {displayName}! 👋</h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                ¡Qué alegría verte de nuevo! Aquí tienes el resumen actualizado de tus colaboraciones, tareas y métricas de este mes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white/80 backdrop-blur-xl border border-white/60 p-5 rounded-2xl space-y-2 shadow-lg shadow-purple-100/30">
                <span className="text-xs text-slate-500 font-semibold">💰 Total Cobrado (Este Mes)</span>
                <div className="text-2xl font-black text-emerald-600">$ 2,200.00</div>
                <p className="text-[10px] text-slate-400">1 pago procesado</p>
              </div>

              <div className="bg-white/80 backdrop-blur-xl border border-white/60 p-5 rounded-2xl space-y-2 shadow-lg shadow-purple-100/30">
                <span className="text-xs text-slate-500 font-semibold">⏳ Pendiente por Cobrar</span>
                <div className="text-2xl font-black text-amber-500">$ 2,300.00</div>
                <p className="text-[10px] text-slate-400">2 campañas pendientes</p>
              </div>

              <div className="bg-white/80 backdrop-blur-xl border border-white/60 p-5 rounded-2xl space-y-2 shadow-lg shadow-purple-100/30 sm:col-span-2 lg:col-span-1">
                <span className="text-xs text-slate-500 font-semibold">📊 Colaboraciones Activas</span>
                <div className="text-2xl font-black text-purple-600">3 Marcas</div>
                <p className="text-[10px] text-purple-500 font-medium">Adidas, Aurelia, Cúspide</p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-xl border border-white/60 p-6 rounded-2xl space-y-4 shadow-xl shadow-purple-100/40">
              <div className="flex items-center justify-between px-3.5">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-3">
                  <span className="text-sm leading-none">✅</span>
                  <span>Tareas Prioritarias de Hoy</span>
                </h3>
                <button
                  onClick={() => setActiveTab('tasks')}
                  className="text-xs text-purple-600 font-bold hover:underline"
                >
                  Ver todas
                </button>
              </div>

              <div className="space-y-2">
                {tasks.map((t) => (
                  <div key={t.id} className="flex items-center justify-between p-3.5 bg-slate-50/80 border border-slate-200/80 rounded-xl text-xs">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={t.status === 'completada'}
                        disabled={t.status === 'completada'}
                        onChange={() => handleTaskCheckboxClick(t)}
                        className="rounded border-slate-300 text-purple-600 focus:ring-purple-400 cursor-pointer disabled:cursor-not-allowed"
                      />
                      <span className={t.status === 'completada' ? 'line-through text-slate-400 font-medium' : 'text-slate-800 font-medium'}>
                        {t.title}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 bg-purple-100 border border-purple-200 text-purple-700 text-[10px] rounded-md font-semibold">
                      {t.brand}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PESTAÑA COLABS COMPLETA */}
        {activeTab === 'colabs' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Gestión de Colaboraciones</h2>
                <p className="text-xs text-slate-500">Administra todos tus acuerdos comerciales con marcas en un solo lugar.</p>
              </div>
              <button
                onClick={() => setShowNewColabModal(true)}
                className="px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-xs rounded-xl shadow-md shadow-purple-200 transition"
              >
                + Nueva Colaboración
              </button>
            </div>

            {/* Filtros de estado */}
            <div className="flex items-center space-x-2 bg-white/80 p-1.5 rounded-2xl border border-white/60 shadow-sm w-fit">
              {(['todas', 'activas', 'aprobacion', 'completadas'] as const).map((filterKey) => (
                <button
                  key={filterKey}
                  onClick={() => setColabFilter(filterKey)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition capitalize ${
                    colabFilter === filterKey
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {filterKey === 'aprobacion' ? 'En Aprobación' : filterKey}
                </button>
              ))}
            </div>

            {/* Lista de tarjetas de colaboración */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredColabs.map((c) => (
                <div key={c.id} className="bg-white/80 backdrop-blur-xl border border-white/60 p-5 rounded-2xl space-y-4 shadow-xl shadow-purple-100/30">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="font-extrabold text-slate-800 text-sm">{c.brand}</span>
                    <span className="px-2.5 py-1 bg-purple-100 border border-purple-200 text-purple-700 rounded-lg text-[10px] font-bold">
                      {c.status}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Tipo de Acuerdo:</span>
                      <strong className={c.dealType === 'Canje' ? 'text-pink-600' : 'text-purple-600'}>
                        {c.dealType}
                      </strong>
                    </div>

                    {c.dealType === 'Pago' && (
                      <div className="flex justify-between">
                        <span className="text-slate-500">Monto del Contrato:</span>
                        <strong className="text-emerald-600 font-extrabold">
                          {c.currency === 'USD' ? `$ ${c.amount}` : `S/ ${c.amount}`}
                        </strong>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="text-slate-500">Entregables:</span>
                      <span className="text-slate-800 font-medium">{c.deliverables}</span>
                    </div>

                    {c.dealType === 'Pago' && (
                      <div className="flex justify-between">
                        <span className="text-slate-500">Plazo de Pago:</span>
                        <span className="text-slate-700 font-mono">{c.paymentDays} Días ({c.installments} cuota/s)</span>
                      </div>
                    )}
                  </div>

                  {/* Pasos de avance */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                    <span className={c.steps?.scriptSent ? 'text-emerald-600 font-bold' : ''}>1. Guión</span>
                    <span className={c.steps?.approved ? 'text-emerald-600 font-bold' : ''}>2. Aprobado</span>
                    <span className={c.steps?.published ? 'text-emerald-600 font-bold' : ''}>3. Publicado</span>
                    <span className={c.steps?.paid ? 'text-emerald-600 font-bold' : ''}>4. Cobrado</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* OTRAS PESTAÑAS */}
        {activeTab === 'calendar' && (
          <div className="bg-white/80 p-8 rounded-2xl text-center space-y-3 shadow-xl">
            <h2 className="text-lg font-bold text-slate-800">Calendario de Contenidos</h2>
            <p className="text-xs text-slate-500">Agenda tus fechas de grabación y publicaciones oficiales.</p>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="bg-white/80 p-6 rounded-2xl space-y-3 shadow-xl">
            <h2 className="text-lg font-bold text-slate-800">Lista de Tareas Completa</h2>
            <div className="space-y-2">
              {tasks.map((t) => (
                <div key={t.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl text-xs">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={t.status === 'completada'}
                      disabled={t.status === 'completada'}
                      onChange={() => handleTaskCheckboxClick(t)}
                      className="rounded border-slate-300 text-purple-600"
                    />
                    <span className={t.status === 'completada' ? 'line-through text-slate-400' : 'text-slate-800 font-medium'}>
                      {t.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'income' && (
          <div className="bg-white/80 p-6 rounded-2xl space-y-3 shadow-xl">
            <h2 className="text-lg font-bold text-slate-800">Control de Ingresos</h2>
            <div className="text-2xl font-black text-emerald-600">$ 4,500.00</div>
          </div>
        )}

        {activeTab === 'mediakit' && (
          <div className="bg-white/80 p-6 rounded-2xl space-y-3 shadow-xl">
            <h2 className="text-lg font-bold text-slate-800">Media Kit Profesional</h2>
            <p className="text-xs text-slate-500">Perfil público de {displayName}</p>
          </div>
        )}

      </main>

      {/* Modal para Crear Nueva Colaboración */}
      {showNewColabModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white p-6 rounded-3xl max-w-md w-full space-y-5 shadow-2xl border border-purple-100 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-800">Nueva Colaboración</h2>
              <button onClick={() => setShowNewColabModal(false)} className="text-slate-400 hover:text-slate-600 text-xs font-bold">✕</button>
            </div>

            <form onSubmit={handleCreateColab} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Nombre de la Marca</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Nike, Samsung..."
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-purple-400"
                />
              </div>

              {/* Tipo de Acuerdo: Pago o Canje */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Tipo de Acuerdo</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDealType('Pago')}
                    className={`py-2 rounded-xl text-xs font-bold transition border ${
                      dealType === 'Pago'
                        ? 'bg-purple-100 border-purple-300 text-purple-700'
                        : 'bg-slate-50 border-slate-200 text-slate-500'
                    }`}
                  >
                    💵 Pago
                  </button>
                  <button
                    type="button"
                    onClick={() => setDealType('Canje')}
                    className={`py-2 rounded-xl text-xs font-bold transition border ${
                      dealType === 'Canje'
                        ? 'bg-pink-100 border-pink-300 text-pink-700'
                        : 'bg-slate-50 border-slate-200 text-slate-500'
                    }`}
                  >
                    🎁 Canje / Producto
                  </button>
                </div>
              </div>

              {/* Opciones de Pago (Moneda y Monto) */}
              {dealType === 'Pago' && (
                <div className="space-y-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Moneda de Pago</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setCurrency('USD')}
                        className={`py-1.5 rounded-lg text-xs font-bold transition border ${
                          currency === 'USD'
                            ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                            : 'bg-white border-slate-200 text-slate-500'
                        }`}
                      >
                        $ Dólares (USD)
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrency('PEN')}
                        className={`py-1.5 rounded-lg text-xs font-bold transition border ${
                          currency === 'PEN'
                            ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                            : 'bg-white border-slate-200 text-slate-500'
                        }`}
                      >
                        S/ Soles (PEN)
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Monto Total a Cobrar</label>
                    <input
                      type="number"
                      required
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Días de Pago Acordados</label>
                    <div className="flex items-center gap-1.5">
                      {['15', '30', '45', '60', '90'].map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setPaymentDays(d)}
                          className={`flex-1 py-1 rounded-lg text-[11px] font-bold transition border ${
                            paymentDays === d
                              ? 'bg-purple-600 text-white border-purple-600'
                              : 'bg-white text-slate-600 border-slate-200'
                          }`}
                        >
                          {d}d
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Entregables */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2">Contenidos a Entregar</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center justify-between p-2 bg-slate-50 rounded-xl border border-slate-200">
                    <span>🎬 Reels</span>
                    <div className="flex items-center space-x-1">
                      <button type="button" onClick={() => setDeliverables({ ...deliverables, reels: Math.max(0, deliverables.reels - 1) })} className="px-2 py-0.5 bg-slate-200 rounded font-bold">-</button>
                      <span className="font-bold px-1">{deliverables.reels}</span>
                      <button type="button" onClick={() => setDeliverables({ ...deliverables, reels: deliverables.reels + 1 })} className="px-2 py-0.5 bg-slate-200 rounded font-bold">+</button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2 bg-slate-50 rounded-xl border border-slate-200">
                    <span>🎵 TikToks</span>
                    <div className="flex items-center space-x-1">
                      <button type="button" onClick={() => setDeliverables({ ...deliverables, tiktoks: Math.max(0, deliverables.tiktoks - 1) })} className="px-2 py-0.5 bg-slate-200 rounded font-bold">-</button>
                      <span className="font-bold px-1">{deliverables.tiktoks}</span>
                      <button type="button" onClick={() => setDeliverables({ ...deliverables, tiktoks: deliverables.tiktoks + 1 })} className="px-2 py-0.5 bg-slate-200 rounded font-bold">+</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewColabModal(false)}
                  className="px-4 py-2.5 bg-slate-100 text-slate-600 font-bold text-xs rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xs rounded-xl shadow-md shadow-purple-200"
                >
                  Guardar Colaboración
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Pop-up de Confirmación de Tarea */}
      {showTaskConfirmModal && pendingTask && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-3xl max-w-sm w-full text-center space-y-4 shadow-2xl border border-purple-100">
            <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl mx-auto flex items-center justify-center text-2xl">
              ✅
            </div>
            <div className="space-y-1">
              <h2 className="text-base font-bold text-slate-800">¿Marcar Tarea como Realizada?</h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                Confirmas que has completado la tarea: <strong className="text-slate-700">"{pendingTask.title}"</strong>. Una vez confirmada, quedará registrada como completada en tu panel personal.
              </p>
            </div>
            <div className="flex items-center justify-center space-x-2 pt-1">
              <button
                onClick={() => { setShowTaskConfirmModal(false); setPendingTask(null); }}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-xl transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmTaskDone}
                className="w-full py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-xs rounded-xl transition shadow-md shadow-purple-200"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Menú Flotante Inferior */}
      <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-2xl border border-white/80 px-3 py-2 rounded-2xl shadow-2xl shadow-purple-200/60 flex items-center space-x-1 sm:space-x-2 z-50">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center px-3 py-1.5 rounded-xl transition text-[11px] font-bold ${
            activeTab === 'home' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md shadow-purple-200' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span className="text-sm">🏠</span>
          <span>Inicio</span>
        </button>

        <button
          onClick={() => setActiveTab('colabs')}
          className={`flex flex-col items-center px-3 py-1.5 rounded-xl transition text-[11px] font-bold ${
            activeTab === 'colabs' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md shadow-purple-200' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span className="text-sm">🤝</span>
          <span>Colabs</span>
        </button>

        <button
          onClick={() => setActiveTab('calendar')}
          className={`flex flex-col items-center px-3 py-1.5 rounded-xl transition text-[11px] font-bold ${
            activeTab === 'calendar' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md shadow-purple-200' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span className="text-sm">📅</span>
          <span>Agenda</span>
        </button>

        <button
          onClick={() => setActiveTab('tasks')}
          className={`flex flex-col items-center px-3 py-1.5 rounded-xl transition text-[11px] font-bold ${
            activeTab === 'tasks' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md shadow-purple-200' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span className="text-sm">📝</span>
          <span>Tareas</span>
        </button>

        <button
          onClick={() => setActiveTab('income')}
          className={`flex flex-col items-center px-3 py-1.5 rounded-xl transition text-[11px] font-bold ${
            activeTab === 'income' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md shadow-purple-200' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span className="text-sm">💰</span>
          <span>Ingresos</span>
        </button>

        <button
          onClick={() => setActiveTab('mediakit')}
          className={`flex flex-col items-center px-3 py-1.5 rounded-xl transition text-[11px] font-bold ${
            activeTab === 'mediakit' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md shadow-purple-200' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span className="text-sm">📁</span>
          <span>MediaKit</span>
        </button>
      </nav>
    </div>
  );
}