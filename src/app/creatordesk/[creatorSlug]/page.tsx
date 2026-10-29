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

const GoogleIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
  </svg>
);

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
  const [activeTab, setActiveTab] = useState<'home' | 'colabs' | 'calendar' | 'tasks' | 'income' | 'mediakit'>('calendar');

  const [colabFilter, setColabFilter] = useState<string>('todas');
  const [showNewColabModal, setShowNewColabModal] = useState(false);

  const [infoModalColab, setInfoModalColab] = useState<any>(null);
  const [statusModalColab, setStatusModalColab] = useState<any>(null);

  const [statusErrorMsg, setStatusErrorMsg] = useState('');

  const [brandName, setBrandName] = useState('');
  const [contactName, setContactName] = useState('');
  const [dealType, setDealType] = useState<'Pago' | 'Canje'>('Pago');
  const [currency, setCurrency] = useState<'USD' | 'PEN'>('USD');
  const [amount, setAmount] = useState('');
  const [paymentDays, setPaymentDays] = useState('30');
  const [deliverables, setDeliverables] = useState({ reels: 0, tiktoks: 0, stories: 0, facebook: 0, youtube: 0, evento: 0 });

  const [isUgc, setIsUgc] = useState(false);
  const [usageRightsDays, setUsageRightsDays] = useState('30 días');
  const [includesRawFootage, setIncludesRawFootage] = useState(false);
  const [allowAdsUsage, setAllowAdsUsage] = useState(true);
  const [categoryExclusivity, setCategoryExclusivity] = useState('Sin Exclusividad');
  const [deliveryFormat, setDeliveryFormat] = useState('Vertical 9:16 (Móvil)');

  const [deliverableError, setDeliverableError] = useState('');

  const [pendingTask, setPendingTask] = useState<any>(null);
  const [showTaskConfirmModal, setShowTaskConfirmModal] = useState(false);
  const [colabToDelete, setColabToDelete] = useState<any>(null);

  // ESTADOS DE LA AGENDA Y GOOGLE CALENDAR
  const [selectedDay, setSelectedDay] = useState<number>(30);
  const [calendarFilter, setCalendarFilter] = useState<'todos' | 'grabacion' | 'entrega' | 'reunion' | 'pago' | 'google'>('todos');
  const [showCreateDropdown, setShowCreateDropdown] = useState(false);
  const [createType, setCreateType] = useState<'evento' | 'tarea' | 'citas' | null>(null);

  const [isGoogleConnected, setIsGoogleConnected] = useState(false);

  // Eventos
  const [calendarEvents, setCalendarEvents] = useState<any[]>([
    { id: 'e1', title: 'Grabar Reel para Adidas', brand: 'Adidas', date: '2026-10-28', time: '10:00 hs', category: 'grabacion', source: 'creator' },
    { id: 'e2', title: 'Prueba de calendario desde creatordesk', brand: 'Adidas', date: '2026-10-30', time: '10:00 hs', category: 'entrega', source: 'creator' },
    { id: 'e3', title: 'Fecha Estimada de Cobro Factura', brand: 'Adidas', date: '2026-11-05', time: '09:00 hs', category: 'pago', source: 'creator' }
  ]);

  // CARGAR EVENTOS DESDE GOOGLE CALENDAR API
  const fetchGoogleCalendarEvents = async (token: string) => {
    try {
      const response = await fetch(
        'https://www.googleapis.com/calendar/v3/calendars/primary/events?singleEvents=true&orderBy=startTime&timeMin=2026-10-01T00:00:00Z&timeMax=2026-11-30T23:59:59Z',
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('google_access_token');
          setIsGoogleConnected(false);
        }
        return;
      }

      const data = await response.json();
      if (data.items) {
        const fetchedEvents = data.items.map((item: any) => {
          const startDateTime = item.start?.dateTime || item.start?.date || '';
          const dateStr = startDateTime.substring(0, 10);
          const timeStr = startDateTime.includes('T')
            ? startDateTime.substring(11, 16) + ' hs'
            : 'Todo el día';

          return {
            id: `g_${item.id}`,
            title: item.summary || 'Evento de Google',
            brand: 'Google Calendar',
            date: dateStr,
            time: timeStr,
            category: 'google',
            source: 'google'
          };
        });

        setIsGoogleConnected(true);
        setCalendarEvents(prev => [
          ...prev.filter(e => e.source !== 'google'),
          ...fetchedEvents
        ]);
      }
    } catch (err) {
      console.error('Error fetching Google Calendar events:', err);
    }
  };

  useEffect(() => {
    const googleToken = localStorage.getItem('google_access_token');
    if (googleToken) {
      setIsGoogleConnected(true);
      fetchGoogleCalendarEvents(googleToken);
    }
  }, []);

  const handleGoogleAuthConnect = () => {
    if (isGoogleConnected) {
      localStorage.removeItem('google_access_token');
      setIsGoogleConnected(false);
      setCalendarEvents(calendarEvents.filter(e => e.source !== 'google'));
      return;
    }

    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '780704611551-jiq915ec0qnp95c9t30ptkakblu209l1.apps.googleusercontent.com';
    const redirectUri = typeof window !== 'undefined' ? `${window.location.origin}/api/auth/google/callback` : '';
    const scope = encodeURIComponent('https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar');

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scope}&prompt=consent`;

    window.location.href = authUrl;
  };

  // Formulario
  const [createTitle, setCreateTitle] = useState('');
  const [createBrand, setCreateBrand] = useState('');
  const [createDate, setCreateDate] = useState('2026-10-30');
  const [createTime, setCreateTime] = useState('10:00');
  const [createCategory, setCreateCategory] = useState<'grabacion' | 'entrega' | 'reunion' | 'pago'>('grabacion');

  const [tasks, setTasks] = useState([
    { id: 't1', title: 'Enviar guión para aprobación a Adidas', brand: 'Adidas', status: 'pendiente', category: 'Grabar' },
    { id: 't2', title: 'Grabar video de unboxing cosméticos', brand: 'Aurelia', status: 'pendiente', category: 'Grabar' }
  ]);

  const [colabs, setColabs] = useState<any[]>([]);

  useEffect(() => {
    const localUser = localStorage.getItem('creatordesk_user');
    if (localUser) {
      try {
        const parsed = JSON.parse(localUser);
        setUser(parsed);
        setDisplayName(parsed.full_name || 'Creador');
      } catch (e) {
        setDisplayName('Creador');
      }
    }
    setLoading(false);
  }, []);

  // CREAR EVENTO CON CREACIÓN SIMULTÁNEA EN GOOGLE CALENDAR
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createTitle) return;

    if (createType === 'evento') {
      const newEvt = {
        id: String(Date.now()),
        title: createTitle,
        brand: createBrand || 'Personal',
        date: createDate,
        time: `${createTime} hs`,
        category: createCategory,
        source: 'creator'
      };

      setCalendarEvents(prev => [...prev, newEvt]);

      // SI GOOGLE ESTÁ CONECTADO -> CREAR EN GOOGLE CALENDAR
      const googleToken = localStorage.getItem('google_access_token');
      if (googleToken) {
        try {
          const startDateTime = `${createDate}T${createTime}:00-05:00`;
          const endHour = parseInt(createTime.split(':')[0] || '10') + 1;
          const formattedEndHour = endHour < 10 ? `0${endHour}` : `${endHour}`;
          const endDateTime = `${createDate}T${formattedEndHour}:${createTime.split(':')[1] || '00'}:00-05:00`;

          await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${googleToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              summary: `${createTitle} (${createBrand || 'CreatorDesk'})`,
              description: `Evento creado desde CreatorDesk para la marca ${createBrand || 'General'}.`,
              start: { dateTime: startDateTime, timeZone: 'America/Lima' },
              end: { dateTime: endDateTime, timeZone: 'America/Lima' }
            })
          });

          // Refrescar eventos
          fetchGoogleCalendarEvents(googleToken);
        } catch (err) {
          console.error('Error al sincronizar con Google Calendar:', err);
        }
      }
    } else if (createType === 'tarea') {
      const newTask = {
        id: `t_${Date.now()}`,
        title: createTitle,
        brand: createBrand || 'General',
        status: 'pendiente',
        category: 'Manual'
      };
      setTasks([newTask, ...tasks]);
    }

    setCreateType(null);
    setCreateTitle('');
    setCreateBrand('');
  };

  const handleDeleteEvent = (eventId: string) => {
    setCalendarEvents(calendarEvents.filter(e => e.id !== eventId));
  };

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'grabacion': return <span className="px-2 py-0.5 bg-purple-100 text-purple-700 font-bold text-[10px] rounded-md border border-purple-200">🎥 Grabación</span>;
      case 'entrega': return <span className="px-2 py-0.5 bg-pink-100 text-pink-700 font-bold text-[10px] rounded-md border border-pink-200">📤 Entrega</span>;
      case 'reunion': return <span className="px-2 py-0.5 bg-blue-100 text-blue-700 font-bold text-[10px] rounded-md border border-blue-200">👥 Reunión</span>;
      case 'pago': return <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 font-bold text-[10px] rounded-md border border-emerald-200">💵 Pago</span>;
      case 'google': return <span className="px-2 py-0.5 bg-sky-100 text-sky-800 font-bold text-[10px] rounded-md border border-sky-200 flex items-center gap-1"><GoogleIcon /> Google Calendar</span>;
      default: return <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-bold text-[10px] rounded-md">📌 Evento</span>;
    }
  };

  if (loading) return null;

  const selectedDateStr = `2026-10-${selectedDay < 10 ? '0' + selectedDay : selectedDay}`;
  const dayEvents = calendarEvents.filter(e => e.date === selectedDateStr && (calendarFilter === 'todos' || e.category === calendarFilter));

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 text-slate-800 pb-28">
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-purple-100/60 px-6 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-xl flex items-center justify-center font-black text-white text-sm shadow-md">
              CD
            </div>
            <h1 className="text-base font-extrabold text-slate-800">CreatorDesk</h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Agenda & Google Calendar</h2>
            <p className="text-xs text-slate-500">Sincronización bidireccional activada en tiempo real.</p>
          </div>

          <div className="flex items-center space-x-3 relative">
            <button
              onClick={handleGoogleAuthConnect}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border shadow-sm ${
                isGoogleConnected
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                  : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              <GoogleIcon />
              <span>{isGoogleConnected ? '✓ Google Conectado' : 'Conectar Google'}</span>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowCreateDropdown(!showCreateDropdown)}
                className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-purple-200 transition flex items-center gap-2"
              >
                <span className="text-base font-black">+</span>
                <span>Crear</span>
                <span className="text-[10px]">▼</span>
              </button>

              {showCreateDropdown && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-purple-100 py-2 z-50">
                  <button
                    onClick={() => { setCreateType('evento'); setShowCreateDropdown(false); }}
                    className="w-full text-left px-4 py-2.5 hover:bg-purple-50 text-xs font-bold text-slate-700 flex items-center gap-2.5"
                  >
                    <span className="text-base">📅</span>
                    <div>
                      <div>Evento</div>
                      <p className="text-[10px] text-slate-400 font-normal">Sincroniza con Google Calendar</p>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl border border-white/60 p-6 rounded-3xl space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-800 text-base">October 2026</h3>
            </div>

            <div className="grid grid-cols-7 gap-1.5">
              {[...Array(31)].map((_, i) => {
                const dayNum = i + 1;
                const isSelected = selectedDay === dayNum;
                return (
                  <button
                    key={dayNum}
                    onClick={() => setSelectedDay(dayNum)}
                    className={`h-12 rounded-2xl flex flex-col items-center justify-between p-1.5 text-xs font-bold border ${
                      isSelected
                        ? 'bg-gradient-to-tr from-purple-500 to-pink-500 text-white border-transparent shadow-md'
                        : 'bg-white/60 border-slate-100 text-slate-700'
                    }`}
                  >
                    <span>{dayNum}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl border border-white/60 p-6 rounded-3xl space-y-4 shadow-xl">
            <h3 className="font-extrabold text-slate-800 text-base">Día {selectedDay} de Octubre</h3>
            <div className="space-y-2.5">
              {dayEvents.map((evt) => (
                <div key={evt.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
                  {getCategoryBadge(evt.category)}
                  <h4 className="font-bold text-slate-800 text-xs">{evt.title}</h4>
                  <p className="text-[10px] text-slate-400">🕒 {evt.time}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => setCreateType('evento')}
              className="w-full py-2.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
            >
              + Agregar Evento
            </button>
          </div>
        </div>
      </main>

      {/* MODAL CREAR EVENTO */}
      {createType === 'evento' && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-3xl max-w-md w-full space-y-4 shadow-2xl border border-purple-100">
            <h2 className="text-base font-bold text-slate-800">📅 Crear Evento (Sincroniza con Google)</h2>
            <form onSubmit={handleCreateSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Título del Evento *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Entrega de borrador..."
                  value={createTitle}
                  onChange={(e) => setCreateTitle(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Marca / Proyecto</label>
                <input
                  type="text"
                  placeholder="Ej: Adidas"
                  value={createBrand}
                  onChange={(e) => setCreateBrand(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Fecha</label>
                  <input
                    type="date"
                    value={createDate}
                    onChange={(e) => setCreateDate(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Hora</label>
                  <input
                    type="time"
                    value={createTime}
                    onChange={(e) => setCreateTime(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCreateType(null)}
                  className="px-4 py-2.5 bg-slate-100 text-slate-600 font-bold text-xs rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xs rounded-xl shadow-md shadow-purple-200"
                >
                  Guardar y Sincronizar en Google
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}