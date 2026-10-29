'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';

// Componentes SVG vectoriales
const InstagramIcon = () => (
  <svg className="w-4 h-4 text-pink-600 inline-block" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg className="w-4 h-4 text-slate-900 inline-block" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.98-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.57-1.31 1.56-1.3 2.56.02.94.51 1.86 1.28 2.4.95.68 2.22.78 3.24.28 1.05-.5 1.7-1.58 1.73-2.73.02-3.21.01-6.42.01-9.63V.02z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-4 h-4 text-blue-600 inline-block" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-4 h-4 text-red-600 inline-block" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const EventIcon = () => (
  <svg className="w-4 h-4 text-purple-600 inline-block" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5z"/>
  </svg>
);

const TrashIcon = () => (
  <svg className="w-4 h-4 text-rose-500 hover:text-rose-700 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

// Flujo ordenado secuencial estricto de las 13 fases
export const STATUS_SEQUENCE = [
  'Campaña Recibida',
  'Campaña Aceptada',
  'Brief Recibido',
  'Guión Enviado',
  'Guión Aprobado',
  'En Grabación',
  'En Edición',
  'Video Entregado',
  'Video Aprobado',
  'Video Publicado',
  'Factura Enviada',
  'Factura por Cobrar',
  'Factura Cobrada'
];

export const CAMPAIGN_STAGES = [
  {
    stage: 'Negociación',
    icon: '📬',
    statuses: ['Campaña Recibida', 'Campaña Aceptada', 'Campaña Cancelada']
  },
  {
    stage: 'Pre-Producción',
    icon: '📝',
    statuses: ['Brief Recibido', 'Guión Enviado', 'Guión Aprobado', 'Guión Observado']
  },
  {
    stage: 'Producción & Entrega',
    icon: '🎬',
    statuses: ['En Grabación', 'En Edición', 'Video Entregado', 'Video Aprobado', 'Video Observado', 'Video Publicado']
  },
  {
    stage: 'Facturación & Cobro',
    icon: '💵',
    statuses: ['Factura Enviada', 'Factura por Cobrar', 'Factura Cobrada']
  }
];

export default function CreatorDeskAppPage({ params }: { params: { creatorSlug?: string } }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [displayName, setDisplayName] = useState<string>('');
  const [isExpired, setIsExpired] = useState(false);
  const [daysRemaining, setDaysRemaining] = useState<number>(7);
  const [activeTab, setActiveTab] = useState<'home' | 'colabs' | 'calendar' | 'tasks' | 'income' | 'mediakit'>('colabs');

  // Filtros de Colabs
  const [colabFilter, setColabFilter] = useState<string>('todas');
  const [showNewColabModal, setShowNewColabModal] = useState(false);

  // Modales independientes para Información vs Gestión de Estado
  const [infoModalColab, setInfoModalColab] = useState<any>(null);
  const [statusModalColab, setStatusModalColab] = useState<any>(null);

  // Alerta de validación de estado
  const [statusErrorMsg, setStatusErrorMsg] = useState('');

  // Formulario Nueva Colaboración
  const [brandName, setBrandName] = useState('');
  const [contactName, setContactName] = useState('');
  const [dealType, setDealType] = useState<'Pago' | 'Canje'>('Pago');
  const [currency, setCurrency] = useState<'USD' | 'PEN'>('USD');
  const [amount, setAmount] = useState('');
  const [paymentDays, setPaymentDays] = useState('30');
  const [deliverables, setDeliverables] = useState({ reels: 0, tiktoks: 0, stories: 0, facebook: 0, youtube: 0, evento: 0 });

  // Campos UGC
  const [isUgc, setIsUgc] = useState(false);
  const [usageRightsDays, setUsageRightsDays] = useState('30 días');
  const [includesRawFootage, setIncludesRawFootage] = useState(false);
  const [allowAdsUsage, setAllowAdsUsage] = useState(true);
  const [categoryExclusivity, setCategoryExclusivity] = useState('Sin Exclusividad');
  const [deliveryFormat, setDeliveryFormat] = useState('Vertical 9:16 (Móvil)');

  const [deliverableError, setDeliverableError] = useState('');

  // Modal confirmación tareas y borrado
  const [pendingTask, setPendingTask] = useState<any>(null);
  const [showTaskConfirmModal, setShowTaskConfirmModal] = useState(false);
  const [colabToDelete, setColabToDelete] = useState<any>(null);

  const [tasks, setTasks] = useState([
    { id: 't1', title: 'Enviar guión para aprobación a Adidas', brand: 'Adidas', status: 'pendiente', category: 'Grabar' },
    { id: 't2', title: 'Grabar video de unboxing cosméticos', brand: 'Aurelia', status: 'pendiente', category: 'Grabar' },
    { id: 't3', title: 'Revisar contrato de patrocinio', brand: 'Loto Spa', status: 'completada', category: 'Manual' }
  ]);

  const [colabs, setColabs] = useState([
    {
      id: '1',
      brand: 'Adidas Originals',
      contactName: 'Carlos Mendoza (Brand Manager)',
      dealType: 'Pago',
      currency: 'USD',
      amount: 1500,
      paymentDays: 30,
      status: 'Guión Enviado',
      isUgc: false,
      deliverables: [
        { type: 'instagram', label: '2 Reels' },
        { type: 'instagram', label: '3 Stories' },
        { type: 'evento', label: '1 Evento' }
      ],
      statusHistory: {
        'Campaña Recibida': '20/10/2026, 10:15 hs',
        'Guión Enviado': '25/10/2026, 14:30 hs'
      }
    },
    {
      id: '2',
      brand: 'Aurelia Cosmetics',
      contactName: 'Valeria Silva (PR Lead)',
      dealType: 'Canje',
      currency: 'PEN',
      amount: 0,
      paymentDays: 0,
      status: 'En Grabación',
      isUgc: true,
      ugcDetails: {
        usageRightsDays: '60 días',
        includesRawFootage: true,
        allowAdsUsage: true,
        categoryExclusivity: '30 días en Cosméticos',
        deliveryFormat: 'Vertical 9:16 (Móvil)'
      },
      deliverables: [
        { type: 'tiktok', label: '1 TikTok UGC' },
        { type: 'facebook', label: '1 Post' }
      ],
      statusHistory: {
        'Campaña Recibida': '22/10/2026, 09:00 hs',
        'En Grabación': '27/10/2026, 16:45 hs'
      }
    },
    {
      id: '3',
      brand: 'Yolu',
      contactName: 'Yordy Picon',
      dealType: 'Pago',
      currency: 'PEN',
      amount: 500,
      paymentDays: 30,
      status: 'Campaña Recibida',
      isUgc: true,
      ugcDetails: {
        usageRightsDays: '30 días',
        includesRawFootage: false,
        allowAdsUsage: true,
        categoryExclusivity: 'Sin Exclusividad',
        deliveryFormat: 'Vertical 9:16 (Móvil)'
      },
      deliverables: [
        { type: 'instagram', label: '1 Reels' },
        { type: 'tiktok', label: '1 TikToks' }
      ],
      statusHistory: {
        'Campaña Recibida': '28/10/2026, 11:20 hs'
      }
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

  const handleDeleteColab = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setColabs(colabs.filter(c => c.id !== id));
    setColabToDelete(null);
  };

  const totalDeliverablesCount = deliverables.reels + deliverables.tiktoks + deliverables.stories + deliverables.facebook + deliverables.youtube + deliverables.evento;

  // Genera fecha y hora exacta
  const getExactNowTimestamp = () => {
    const now = new Date();
    const dateStr = now.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    return `${dateStr}, ${timeStr} hs`;
  };

  const handleCreateColab = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (totalDeliverablesCount === 0) {
      setDeliverableError('Debe seleccionar al menos 1 contenido a entregar.');
      return;
    }
    setDeliverableError('');

    if (!brandName) return;

    const delivArray = [];
    if (deliverables.reels > 0) delivArray.push({ type: 'instagram', label: `${deliverables.reels} Reels` });
    if (deliverables.stories > 0) delivArray.push({ type: 'instagram', label: `${deliverables.stories} Stories` });
    if (deliverables.tiktoks > 0) delivArray.push({ type: 'tiktok', label: `${deliverables.tiktoks} TikToks` });
    if (deliverables.facebook > 0) delivArray.push({ type: 'facebook', label: `${deliverables.facebook} Facebook` });
    if (deliverables.youtube > 0) delivArray.push({ type: 'youtube', label: `${deliverables.youtube} YouTube` });
    if (deliverables.evento > 0) delivArray.push({ type: 'evento', label: `${deliverables.evento} Eventos` });

    const nowTimestamp = getExactNowTimestamp();

    const newColabObj = {
      id: String(Date.now()),
      brand: brandName,
      contactName: contactName || 'Contacto directo',
      dealType: dealType,
      currency: dealType === 'Pago' ? currency : 'PEN',
      amount: dealType === 'Pago' ? Number(amount) || 0 : 0,
      paymentDays: Number(paymentDays),
      status: 'Campaña Recibida',
      isUgc: isUgc,
      ugcDetails: isUgc ? { usageRightsDays, includesRawFootage, allowAdsUsage, categoryExclusivity, deliveryFormat } : null,
      deliverables: delivArray,
      statusHistory: {
        'Campaña Recibida': nowTimestamp
      }
    };

    setColabs([newColabObj, ...colabs]);
    setShowNewColabModal(false);
    setBrandName('');
    setContactName('');
    setAmount('');
    setIsUgc(false);
    setDeliverables({ reels: 0, tiktoks: 0, stories: 0, facebook: 0, youtube: 0, evento: 0 });
  };

  const getStageIndex = (status: string) => {
    if (CAMPAIGN_STAGES[0].statuses.includes(status)) return 0;
    if (CAMPAIGN_STAGES[1].statuses.includes(status)) return 1;
    if (CAMPAIGN_STAGES[2].statuses.includes(status)) return 2;
    if (CAMPAIGN_STAGES[3].statuses.includes(status)) return 3;
    return 0;
  };

  // Lógica Estricta de Avance de Estado
  const handleStrictStatusChange = (colab: any, targetStatus: string) => {
    setStatusErrorMsg('');

    const currentStatus = colab.status;

    if (currentStatus === 'Campaña Cancelada' && targetStatus !== 'Campaña Cancelada') {
      setStatusErrorMsg('La campaña está cancelada. No es posible avanzar a otras etapas.');
      return;
    }

    if (targetStatus === 'Campaña Cancelada') {
      applyStatusUpdate(colab.id, targetStatus);
      return;
    }

    if (currentStatus === 'Guión Observado' && targetStatus !== 'Guión Aprobado' && targetStatus !== 'Guión Enviado') {
      setStatusErrorMsg('El guión está observado. Debes corregirlo y aprobarlo ("Guión Aprobado") antes de pasar a producción.');
      return;
    }

    if (currentStatus === 'Video Observado' && targetStatus !== 'Video Aprobado' && targetStatus !== 'En Edición') {
      setStatusErrorMsg('El video está observado. Debes aprobarlo ("Video Aprobado") antes de poder publicarlo o facturar.');
      return;
    }

    if (targetStatus === 'Guión Observado' || targetStatus === 'Video Observado') {
      applyStatusUpdate(colab.id, targetStatus);
      return;
    }

    const currentIdx = STATUS_SEQUENCE.indexOf(currentStatus);
    const targetIdx = STATUS_SEQUENCE.indexOf(targetStatus);

    if (currentIdx !== -1 && targetIdx !== -1) {
      if (targetIdx > currentIdx + 1) {
        setStatusErrorMsg(`No puedes saltar de "${currentStatus}" a "${targetStatus}". El flujo debe ser paso a paso: ${STATUS_SEQUENCE[currentIdx + 1]}.`);
        return;
      }
    }

    applyStatusUpdate(colab.id, targetStatus);
  };

  const applyStatusUpdate = (colabId: string, newStatus: string) => {
    const nowTimestamp = getExactNowTimestamp();

    setColabs(colabs.map(c => {
      if (c.id === colabId) {
        const updatedHistory = { ...c.statusHistory, [newStatus]: nowTimestamp };
        return { ...c, status: newStatus, statusHistory: updatedHistory };
      }
      return c;
    }));

    if (statusModalColab && statusModalColab.id === colabId) {
      const updatedHistory = { ...statusModalColab.statusHistory, [newStatus]: nowTimestamp };
      setStatusModalColab({ ...statusModalColab, status: newStatus, statusHistory: updatedHistory });
    }
  };

  const filteredColabs = colabs.filter(c => {
    if (colabFilter === 'todas') return true;
    const stageIdx = getStageIndex(c.status);
    if (colabFilter === 'negociacion') return stageIdx === 0;
    if (colabFilter === 'preprod') return stageIdx === 1;
    if (colabFilter === 'prod') return stageIdx === 2;
    if (colabFilter === 'cobro') return stageIdx === 3;
    return true;
  });

  const renderSocialIcon = (type: string) => {
    switch (type) {
      case 'instagram': return <InstagramIcon />;
      case 'tiktok': return <TikTokIcon />;
      case 'facebook': return <FacebookIcon />;
      case 'youtube': return <YoutubeIcon />;
      case 'evento': return <EventIcon />;
      default: return <InstagramIcon />;
    }
  };

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
        
        {/* HOME */}
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

        {/* PESTAÑA COLABS CON UNIFICACIÓN DE BOTÓN Y HORA EXACTA */}
        {activeTab === 'colabs' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Gestión de Colaboraciones</h2>
                <p className="text-xs text-slate-500">Supervisa el flujo de tus campañas y redes sociales en tiempo real.</p>
              </div>
              <button
                onClick={() => {
                  setDeliverableError('');
                  setShowNewColabModal(true);
                }}
                className="px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-xs rounded-xl shadow-md shadow-purple-200 transition"
              >
                + Nueva Colaboración
              </button>
            </div>

            {/* Filtros por las 4 Etapas Reales */}
            <div className="flex items-center space-x-2 bg-white/80 p-1.5 rounded-2xl border border-white/60 shadow-sm overflow-x-auto">
              {[
                { key: 'todas', label: 'Todas' },
                { key: 'negociacion', label: '📬 Negociación' },
                { key: 'preprod', label: '📝 Pre-Producción' },
                { key: 'prod', label: '🎬 Producción & Entrega' },
                { key: 'cobro', label: '💵 Facturación & Cobro' }
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setColabFilter(f.key)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                    colabFilter === f.key
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Tarjetas Rediseñadas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {filteredColabs.map((c) => {
                const currentStageIdx = getStageIndex(c.status);
                const lastDateWithTime = c.statusHistory?.[c.status] || getExactNowTimestamp();
                const isNegociacion = currentStageIdx === 0;

                return (
                  <div
                    key={c.id}
                    className="bg-white/80 backdrop-blur-xl border border-white/60 p-6 rounded-3xl space-y-4 shadow-xl shadow-purple-100/30 hover:border-purple-300 transition relative"
                  >
                    {/* Encabezado Principal */}
                    <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-black text-slate-800 text-lg">{c.brand}</h3>
                          <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-extrabold border ${
                            c.dealType === 'Canje'
                              ? 'bg-pink-50 border-pink-200 text-pink-600'
                              : 'bg-purple-50 border-purple-200 text-purple-600'
                          }`}>
                            {c.dealType}
                          </span>
                          {c.isUgc && (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-indigo-100 border border-indigo-200 text-indigo-700">
                              ⚡ UGC
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-semibold text-purple-600 flex items-center gap-1">
                          👤 <span>{c.contactName || 'Sin contacto asignado'}</span>
                        </p>
                      </div>

                      {/* Caja Destacada de Precio HERO */}
                      <div className="flex items-center space-x-2">
                        {c.dealType === 'Pago' ? (
                          <div className="px-3.5 py-1.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-700 font-black text-base shadow-2xs">
                            {c.currency === 'USD' ? `$ ${c.amount}` : `S/ ${c.amount}`}
                          </div>
                        ) : (
                          <div className="px-3 py-1 bg-pink-50 border border-pink-200 rounded-xl text-xs font-black text-pink-600">
                            Canje Directo
                          </div>
                        )}

                        {isNegociacion && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setColabToDelete(c);
                            }}
                            className="p-1.5 bg-rose-50 hover:bg-rose-100 rounded-xl border border-rose-200 transition"
                            title="Borrar colaboración (Solo en Negociación)"
                          >
                            <TrashIcon />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Fila de Entregables e Ícono de Información */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-1.5">
                        {c.deliverables?.map((d: any, idx: number) => (
                          <span key={idx} className="px-2.5 py-1 bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-[11px] rounded-lg flex items-center gap-1.5 shadow-2xs">
                            {renderSocialIcon(d.type)}
                            <span>{d.label}</span>
                          </span>
                        ))}
                      </div>

                      {/* Botón Ojito para Ver Información */}
                      <button
                        onClick={() => setInfoModalColab(c)}
                        className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs rounded-xl border border-purple-200 transition whitespace-nowrap flex items-center gap-1"
                      >
                        👁️ Info
                      </button>
                    </div>

                    {/* Timeline Informativo (Sin evento onClick duplicado) */}
                    <div className="space-y-2 pt-2 p-3 rounded-2xl bg-slate-50/60 border border-slate-100">
                      <div className="flex justify-between items-center text-[10px] font-semibold">
                        <span className="text-purple-700 font-bold flex items-center gap-1">
                          📌 Estado Actual: <span>{c.status}</span>
                        </span>
                        <span className="text-slate-400">Último cambio: <strong className="text-purple-600 font-bold">{lastDateWithTime}</strong></span>
                      </div>

                      <div className="relative flex items-center justify-between pt-1">
                        <div className="absolute top-1/2 left-2 right-2 -translate-y-1/2 h-0.5 bg-slate-200 -z-0"></div>
                        <div
                          className="absolute top-1/2 left-2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 -z-0"
                          style={{ width: `${(currentStageIdx / 3) * 100}%` }}
                        ></div>

                        {CAMPAIGN_STAGES.map((stg, idx) => {
                          const isCompleted = idx <= currentStageIdx;
                          return (
                            <div key={stg.stage} className="relative z-10 flex flex-col items-center">
                              <div
                                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                                  isCompleted
                                    ? 'bg-gradient-to-tr from-purple-500 to-pink-500 text-white shadow-md shadow-purple-200 ring-2 ring-white'
                                    : 'bg-slate-100 text-slate-400 border border-slate-300'
                                }`}
                              >
                                {isCompleted ? '✓' : idx + 1}
                              </div>
                              <span className={`text-[10px] mt-1 font-semibold ${
                                isCompleted ? 'text-purple-700 font-bold' : 'text-slate-400'
                              }`}>
                                {stg.stage}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400">
                      <span>{c.paymentDays > 0 ? `Plazo: ${c.paymentDays} Días` : 'Entrega sin factura'}</span>
                      {/* ÚNICO BOTÓN PARA AVANZAR ESTADO */}
                      <button
                        onClick={() => {
                          setStatusErrorMsg('');
                          setStatusModalColab(c);
                        }}
                        className="px-3.5 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-xs rounded-xl shadow-md shadow-purple-200 transition flex items-center gap-1"
                      >
                        ⚙️ Avanzar Estado
                      </button>
                    </div>
                  </div>
                );
              })}
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

      {/* POP-UP 1: MODAL DE INFORMACIÓN COMPLETA */}
      {infoModalColab && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white p-6 rounded-3xl max-w-md w-full space-y-5 shadow-2xl border border-purple-100 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-lg font-black text-slate-800">{infoModalColab.brand}</h2>
                  <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-extrabold border ${
                    infoModalColab.dealType === 'Canje'
                      ? 'bg-pink-50 border-pink-200 text-pink-600'
                      : 'bg-purple-50 border-purple-200 text-purple-600'
                  }`}>
                    {infoModalColab.dealType}
                  </span>
                  {infoModalColab.isUgc && (
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-indigo-100 border border-indigo-200 text-indigo-700">
                      ⚡ UGC
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500">👤 Contacto: {infoModalColab.contactName}</p>
              </div>
              <button
                onClick={() => setInfoModalColab(null)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            {/* Datos Económicos */}
            <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 font-semibold block text-[10px]">Monto del Acuerdo</span>
                <span className="font-bold text-emerald-600 text-sm">
                  {infoModalColab.dealType === 'Pago' 
                    ? `${infoModalColab.currency === 'USD' ? '$' : 'S/'} ${infoModalColab.amount}` 
                    : 'Canje Directo'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block text-[10px]">Plazo de Pago</span>
                <span className="font-bold text-slate-700">
                  {infoModalColab.paymentDays > 0 ? `${infoModalColab.paymentDays} Días` : 'Inmediato / Sin Factura'}
                </span>
              </div>
            </div>

            {/* Entregables */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">Entregables Acordados:</label>
              <div className="flex flex-wrap gap-1.5">
                {infoModalColab.deliverables?.map((d: any, idx: number) => (
                  <span key={idx} className="px-3 py-1 bg-purple-50 border border-purple-200 text-purple-700 font-bold text-xs rounded-xl flex items-center gap-1.5">
                    {renderSocialIcon(d.type)}
                    <span>{d.label}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Detalle UGC Si Aplica */}
            {infoModalColab.isUgc && infoModalColab.ugcDetails && (
              <div className="p-3.5 bg-indigo-50/60 border border-indigo-100 rounded-2xl space-y-2 text-xs">
                <span className="font-bold text-indigo-900 block flex items-center gap-1 text-[11px]">
                  ⚡ Términos de Licencia UGC:
                </span>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-700">
                  <div>• Licencia: <strong>{infoModalColab.ugcDetails.usageRightsDays}</strong></div>
                  <div>• Formato: <strong>{infoModalColab.ugcDetails.deliveryFormat}</strong></div>
                  <div>• Raw Footage: <strong>{infoModalColab.ugcDetails.includesRawFootage ? 'Sí Incluye' : 'No Incluye'}</strong></div>
                  <div>• Pauta/Ads: <strong>{infoModalColab.ugcDetails.allowAdsUsage ? 'Permitido' : 'No Permitido'}</strong></div>
                  <div className="col-span-2">• Exclusividad: <strong>{infoModalColab.ugcDetails.categoryExclusivity}</strong></div>
                </div>
              </div>
            )}

            <button
              onClick={() => setInfoModalColab(null)}
              className="w-full py-2.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200 transition"
            >
              Cerrar Información
            </button>
          </div>
        </div>
      )}

      {/* POP-UP 2: MODAL DE GESTIÓN DE ESTADO CON FECHA Y HORA EXACTAS */}
      {statusModalColab && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white p-6 rounded-3xl max-w-md w-full space-y-4 shadow-2xl border border-purple-100 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-800">{statusModalColab.brand}</h2>
                <p className="text-xs text-purple-600 font-semibold">Estado Actual: {statusModalColab.status}</p>
              </div>
              <button
                onClick={() => setStatusModalColab(null)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            {statusErrorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-2xl leading-relaxed">
                ⚠️ {statusErrorMsg}
              </div>
            )}

            <div className="space-y-3">
              <label className="block text-xs font-bold text-slate-700">Avanzar Estado Paso a Paso:</label>
              <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                {CAMPAIGN_STAGES.map((stg) => (
                  <div key={stg.stage} className="space-y-1">
                    <span className="text-[11px] font-bold text-purple-600 flex items-center gap-1">
                      <span>{stg.icon}</span>
                      <span>{stg.stage}</span>
                    </span>
                    <div className="grid grid-cols-1 gap-1 pl-2">
                      {stg.statuses.map((st) => {
                        const dateLoggedWithTime = statusModalColab.statusHistory?.[st];
                        const isSelected = statusModalColab.status === st;

                        return (
                          <button
                            key={st}
                            type="button"
                            onClick={() => handleStrictStatusChange(statusModalColab, st)}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition border ${
                              isSelected
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold border-transparent shadow-sm'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <span>{st}</span>
                            {dateLoggedWithTime && (
                              <span className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-purple-600 font-medium'}`}>
                                🕒 {dateLoggedWithTime}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setStatusModalColab(null)}
              className="w-full py-2.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200 transition"
            >
              Guardar y Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Modal Nueva Colaboración */}
      {showNewColabModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white p-6 rounded-3xl max-w-md w-full space-y-4 shadow-2xl border border-purple-100 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-800">Nueva Colaboración</h2>
              <button onClick={() => setShowNewColabModal(false)} className="text-slate-400 hover:text-slate-600 text-xs font-bold">✕</button>
            </div>

            <form onSubmit={handleCreateColab} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Nombre de la Marca *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Nike, Samsung..."
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Persona / Punto de Contacto</label>
                <input
                  type="text"
                  placeholder="Ej: Andrea Badillo (Marketing Manager)"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-purple-400"
                />
              </div>

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

              {dealType === 'Pago' && (
                <div className="space-y-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
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
                </div>
              )}

              {/* Selección de Entregables OBLIGATORIA */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-600">Contenidos a Entregar (Mínimo 1) *</label>
                  <span className="text-[10px] font-bold text-purple-600">Seleccionados: {totalDeliverablesCount}</span>
                </div>

                {deliverableError && (
                  <p className="text-[11px] font-bold text-rose-500 bg-rose-50 p-2 rounded-lg border border-rose-200 mb-2">
                    ⚠️ {deliverableError}
                  </p>
                )}

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center justify-between p-2 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="font-medium flex items-center gap-1.5">
                      <InstagramIcon /> Instagram Reel
                    </span>
                    <div className="flex items-center space-x-1">
                      <button type="button" onClick={() => setDeliverables({ ...deliverables, reels: Math.max(0, deliverables.reels - 1) })} className="px-2 py-0.5 bg-slate-200 rounded font-bold">-</button>
                      <span className="font-bold px-1">{deliverables.reels}</span>
                      <button type="button" onClick={() => { setDeliverables({ ...deliverables, reels: deliverables.reels + 1 }); setDeliverableError(''); }} className="px-2 py-0.5 bg-slate-200 rounded font-bold">+</button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="font-medium flex items-center gap-1.5">
                      <InstagramIcon /> IG Stories
                    </span>
                    <div className="flex items-center space-x-1">
                      <button type="button" onClick={() => setDeliverables({ ...deliverables, stories: Math.max(0, deliverables.stories - 1) })} className="px-2 py-0.5 bg-slate-200 rounded font-bold">-</button>
                      <span className="font-bold px-1">{deliverables.stories}</span>
                      <button type="button" onClick={() => { setDeliverables({ ...deliverables, stories: deliverables.stories + 1 }); setDeliverableError(''); }} className="px-2 py-0.5 bg-slate-200 rounded font-bold">+</button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="font-medium flex items-center gap-1.5">
                      <TikTokIcon /> TikTok
                    </span>
                    <div className="flex items-center space-x-1">
                      <button type="button" onClick={() => setDeliverables({ ...deliverables, tiktoks: Math.max(0, deliverables.tiktoks - 1) })} className="px-2 py-0.5 bg-slate-200 rounded font-bold">-</button>
                      <span className="font-bold px-1">{deliverables.tiktoks}</span>
                      <button type="button" onClick={() => { setDeliverables({ ...deliverables, tiktoks: deliverables.tiktoks + 1 }); setDeliverableError(''); }} className="px-2 py-0.5 bg-slate-200 rounded font-bold">+</button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="font-medium flex items-center gap-1.5">
                      <FacebookIcon /> Facebook
                    </span>
                    <div className="flex items-center space-x-1">
                      <button type="button" onClick={() => setDeliverables({ ...deliverables, facebook: Math.max(0, deliverables.facebook - 1) })} className="px-2 py-0.5 bg-slate-200 rounded font-bold">-</button>
                      <span className="font-bold px-1">{deliverables.facebook}</span>
                      <button type="button" onClick={() => { setDeliverables({ ...deliverables, facebook: deliverables.facebook + 1 }); setDeliverableError(''); }} className="px-2 py-0.5 bg-slate-200 rounded font-bold">+</button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="font-medium flex items-center gap-1.5">
                      <YoutubeIcon /> YouTube
                    </span>
                    <div className="flex items-center space-x-1">
                      <button type="button" onClick={() => setDeliverables({ ...deliverables, youtube: Math.max(0, deliverables.youtube - 1) })} className="px-2 py-0.5 bg-slate-200 rounded font-bold">-</button>
                      <span className="font-bold px-1">{deliverables.youtube}</span>
                      <button type="button" onClick={() => { setDeliverables({ ...deliverables, youtube: deliverables.youtube + 1 }); setDeliverableError(''); }} className="px-2 py-0.5 bg-slate-200 rounded font-bold">+</button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="font-medium flex items-center gap-1.5">
                      <EventIcon /> Evento
                    </span>
                    <div className="flex items-center space-x-1">
                      <button type="button" onClick={() => setDeliverables({ ...deliverables, evento: Math.max(0, deliverables.evento - 1) })} className="px-2 py-0.5 bg-slate-200 rounded font-bold">-</button>
                      <span className="font-bold px-1">{deliverables.evento}</span>
                      <button type="button" onClick={() => { setDeliverables({ ...deliverables, evento: deliverables.evento + 1 }); setDeliverableError(''); }} className="px-2 py-0.5 bg-slate-200 rounded font-bold">+</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* SWITCH Y OPCIONES UGC */}
              <div className="p-3 bg-purple-50/60 rounded-2xl border border-purple-100 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      ⚡ ¿Es contenido UGC?
                    </span>
                    <p className="text-[10px] text-slate-500">Contenido creado exclusivamente para uso de la marca.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsUgc(!isUgc)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      isUgc ? 'bg-purple-600' : 'bg-slate-300'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        isUgc ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {isUgc && (
                  <div className="pt-2 border-t border-purple-100 space-y-2.5 text-xs">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Derechos de Uso Comercial (Licencia):
                      </label>
                      <select
                        value={usageRightsDays}
                        onChange={(e) => setUsageRightsDays(e.target.value)}
                        className="w-full px-3 py-1.5 bg-white border border-purple-200 rounded-xl text-xs text-slate-800 focus:outline-none"
                      >
                        <option value="30 días">30 Días de Uso en Pauta</option>
                        <option value="60 días">60 Días de Uso en Pauta</option>
                        <option value="90 días">90 Días de Uso en Pauta</option>
                        <option value="1 año">1 Año de Licencia</option>
                        <option value="Perpetuo / Indefinido">Perpetuo / Indefinido</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">Formato de Entrega:</label>
                        <select
                          value={deliveryFormat}
                          onChange={(e) => setDeliveryFormat(e.target.value)}
                          className="w-full px-3 py-1.5 bg-white border border-purple-200 rounded-xl text-xs text-slate-800 focus:outline-none"
                        >
                          <option value="Vertical 9:16 (Móvil)">Vertical 9:16 (Reels/TikTok)</option>
                          <option value="Horizontal 16:9 (Desktop)">Horizontal 16:9 (YouTube)</option>
                          <option value="Ambos Formatos">Ambos Formatos (9:16 y 16:9)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">Exclusividad de Creador:</label>
                        <select
                          value={categoryExclusivity}
                          onChange={(e) => setCategoryExclusivity(e.target.value)}
                          className="w-full px-3 py-1.5 bg-white border border-purple-200 rounded-xl text-xs text-slate-800 focus:outline-none"
                        >
                          <option value="Sin Exclusividad">Sin Exclusividad</option>
                          <option value="15 Días">15 Días en la Categoría</option>
                          <option value="30 Días">30 Días en la Categoría</option>
                          <option value="60 Días">60 Días en la Categoría</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <label className="flex items-center space-x-2 p-2 bg-white border border-purple-200 rounded-xl cursor-pointer">
                        <input
                          type="checkbox"
                          checked={includesRawFootage}
                          onChange={(e) => setIncludesRawFootage(e.target.checked)}
                          className="rounded text-purple-600 focus:ring-purple-400"
                        />
                        <span className="text-[10px] font-semibold text-slate-700">Incluye Raw Footage (Clips sueltos)</span>
                      </label>

                      <label className="flex items-center space-x-2 p-2 bg-white border border-purple-200 rounded-xl cursor-pointer">
                        <input
                          type="checkbox"
                          checked={allowAdsUsage}
                          onChange={(e) => setAllowAdsUsage(e.target.checked)}
                          className="rounded text-purple-600 focus:ring-purple-400"
                        />
                        <span className="text-[10px] font-semibold text-slate-700">Uso para Pauta / Ads (Whitelisting)</span>
                      </label>
                    </div>
                  </div>
                )}
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

      {/* Pop-up de Confirmación de Borrado */}
      {colabToDelete && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-3xl max-w-sm w-full text-center space-y-4 shadow-2xl border border-rose-100">
            <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-2xl mx-auto flex items-center justify-center text-2xl">
              🗑️
            </div>
            <div className="space-y-1">
              <h2 className="text-base font-bold text-slate-800">¿Eliminar Colaboración?</h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                ¿Estás seguro de eliminar la campaña con <strong className="text-slate-700">"{colabToDelete.brand}"</strong>? Esta acción no se puede deshacer.
              </p>
            </div>
            <div className="flex items-center justify-center space-x-2 pt-1">
              <button
                onClick={() => setColabToDelete(null)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-xl transition"
              >
                Cancelar
              </button>
              <button
                onClick={(e) => handleDeleteColab(colabToDelete.id, e)}
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition shadow-md shadow-rose-200"
              >
                Eliminar
              </button>
            </div>
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
      <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-2xl border border-white/80 px-3 py-2 rounded-2xl shadow-2xl shadow-purple-200/60 flex items-center space-x-1 sm:space-x-2 z-30">
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