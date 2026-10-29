'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';

// Iconos Vectoriales
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

export const MAIN_LINEAL_SEQUENCE = [
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
  { stage: 'Negociación', icon: '📬', statuses: ['Campaña Recibida', 'Campaña Aceptada', 'Campaña Cancelada'] },
  { stage: 'Pre-Producción', icon: '📝', statuses: ['Brief Recibido', 'Guión Enviado', 'Guión Aprobado', 'Guión Observado'] },
  { stage: 'Producción & Entrega', icon: '🎬', statuses: ['En Grabación', 'En Edición', 'Video Entregado', 'Video Aprobado', 'Video Observado', 'Video Publicado'] },
  { stage: 'Facturación & Cobro', icon: '💵', statuses: ['Factura Enviada', 'Factura por Cobrar', 'Factura Cobrada'] }
];

export default function CreatorDeskAppPage({ params }: { params: { creatorSlug?: string } }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [displayName, setDisplayName] = useState<string>('');
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
  const [usageRightsDays, setUsageRightsDays] = useState('30 Días de Uso en Pauta');
  const [includesRawFootage, setIncludesRawFootage] = useState(false);
  const [allowAdsUsage, setAllowAdsUsage] = useState(true);
  const [categoryExclusivity, setCategoryExclusivity] = useState('Sin Exclusividad');
  const [deliveryFormat, setDeliveryFormat] = useState('Vertical 9:16 (Reels/TikTok)');
  const [deliverableError, setDeliverableError] = useState('');

  const [pendingTask, setPendingTask] = useState<any>(null);
  const [showTaskConfirmModal, setShowTaskConfirmModal] = useState(false);

  // NAVEGACIÓN Y ESTADOS DEL CALENDARIO
  const [currentDate, setCurrentDate] = useState(new Date(2026, 9, 29)); // Octubre 2026
  const [selectedDay, setSelectedDay] = useState<number>(29);
  const [calendarFilter, setCalendarFilter] = useState<'todos' | 'grabacion' | 'entrega' | 'reunion' | 'pago' | 'google'>('todos');
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);

  const [createTitle, setCreateTitle] = useState('');
  const [createBrand, setCreateBrand] = useState('');
  const [createDate, setCreateDate] = useState('2026-10-29');
  const [createTime, setCreateTime] = useState('10:00');
  const [createCategory, setCreateCategory] = useState<'grabacion' | 'entrega' | 'reunion' | 'pago'>('grabacion');

  const [isGoogleConnected, setIsGoogleConnected] = useState(false);

  const [calendarEvents, setCalendarEvents] = useState<any[]>([
    { id: 'e1', title: 'Grabar Reel para Adidas', brand: 'Adidas', date: '2026-10-28', time: '10:00 hs', category: 'grabacion', source: 'creator' },
    { id: 'e3', title: 'Fecha Estimada de Cobro Factura', brand: 'Adidas', date: '2026-11-05', time: '09:00 hs', category: 'pago', source: 'creator' }
  ]);

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
      status: 'Guión Aprobado',
      isUgc: false,
      deliverables: [
        { type: 'instagram', label: '2 Reels' },
        { type: 'instagram', label: '3 Stories' },
        { type: 'evento', label: '1 Evento' }
      ],
      statusHistory: { 'Campaña Recibida': '20/10/2026, 10:15 hs', 'Guión Aprobado': '28/10/2026, 23:10 hs' }
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
      ugcDetails: { usageRightsDays: '30 Días de Uso en Pauta', includesRawFootage: true, allowAdsUsage: true, categoryExclusivity: 'Sin Exclusividad', deliveryFormat: 'Vertical 9:16 (Reels/TikTok)' },
      deliverables: [
        { type: 'tiktok', label: '1 TikTok UGC' },
        { type: 'facebook', label: '1 Post' }
      ],
      statusHistory: { 'Campaña Recibida': '22/10/2026, 09:00 hs', 'En Grabación': '27/10/2026, 16:45 hs' }
    }
  ]);

  const fetchGoogleCalendarEvents = async (token: string) => {
    try {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const startOfMonth = new Date(year, month, 1).toISOString();
      const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59).toISOString();

      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?singleEvents=true&orderBy=startTime&timeMin=${startOfMonth}&timeMax=${endOfMonth}`,
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
          const timeStr = startDateTime.includes('T') ? startDateTime.substring(11, 16) + ' hs' : 'Todo el día';

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

        setCalendarEvents(prev => {
          const localOnly = prev.filter(localEvt => {
            if (localEvt.source === 'google') return false;
            return !fetchedEvents.some((gEvt: any) => 
              gEvt.date === localEvt.date &&
              gEvt.title.toLowerCase().includes(localEvt.title.toLowerCase().trim())
            );
          });
          return [...localOnly, ...fetchedEvents];
        });
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
  }, [currentDate]);

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
        const days = Math.ceil((expiresTime.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        setDaysRemaining(days);
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

  const EXCHANGE_RATE_PEN_TO_USD = 3.75;
  const pendingColabs = colabs.filter(c => c.status !== 'Factura Cobrada' && c.status !== 'Campaña Cancelada' && c.dealType === 'Pago');
  const paidColabs = colabs.filter(c => c.status === 'Factura Cobrada' && c.dealType === 'Pago');

  const totalPendingUsdConverted = pendingColabs.reduce((acc, c) => acc + (c.currency === 'USD' ? c.amount : c.amount / EXCHANGE_RATE_PEN_TO_USD), 0);
  const totalPaidUsdConverted = paidColabs.reduce((acc, c) => acc + (c.currency === 'USD' ? c.amount : c.amount / EXCHANGE_RATE_PEN_TO_USD), 0);
  const activeBrandsNames = colabs.filter(c => c.status !== 'Campaña Cancelada').map(c => c.brand).join(', ');

  const pendingUsdTotal = pendingColabs.filter(c => c.currency === 'USD').reduce((acc, c) => acc + c.amount, 0);
  const pendingPenTotal = pendingColabs.filter(c => c.currency === 'PEN').reduce((acc, c) => acc + c.amount, 0);

  let pendingBreakdownText = '';
  if (pendingUsdTotal > 0 && pendingPenTotal > 0) {
    pendingBreakdownText = `($ ${pendingUsdTotal.toLocaleString()} + S/ ${pendingPenTotal.toLocaleString()})`;
  } else if (pendingUsdTotal > 0) {
    pendingBreakdownText = `($ ${pendingUsdTotal.toLocaleString()})`;
  } else if (pendingPenTotal > 0) {
    pendingBreakdownText = `(S/ ${pendingPenTotal.toLocaleString()})`;
  } else {
    pendingBreakdownText = 'Sin cobros pendientes';
  }

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

  // NAVEGACIÓN DE MESES
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // CÁLCULO DINÁMICO DE DÍAS DEL MES
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handleCreateEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createTitle) return;

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
            description: `Evento creado desde CreatorDesk.`,
            start: { dateTime: startDateTime, timeZone: 'America/Lima' },
            end: { dateTime: endDateTime, timeZone: 'America/Lima' }
          })
        });

        fetchGoogleCalendarEvents(googleToken);
      } catch (err) {
        console.error('Error enviando evento a Google:', err);
      }
    }

    const newEvt = {
      id: String(Date.now()),
      title: createTitle,
      brand: createBrand || 'General',
      date: createDate,
      time: `${createTime} hs`,
      category: createCategory,
      source: 'creator'
    };

    setCalendarEvents(prev => [...prev, newEvt]);
    setShowCreateEventModal(false);
    setCreateTitle('');
    setCreateBrand('');
  };

  const handleDeleteEvent = (eventId: string) => {
    setCalendarEvents(calendarEvents.filter(e => e.id !== eventId));
  };

  const handleTaskCheckboxClick = (task: any) => {
    if (task.status === 'completada') return;
    setPendingTask(task);
    setShowTaskConfirmModal(true);
  };

  const confirmCompleteTask = () => {
    if (!pendingTask) return;
    setTasks(tasks.map(t => t.id === pendingTask.id ? { ...t, status: 'completada' } : t));
    setShowTaskConfirmModal(false);
    setPendingTask(null);
  };

  const totalDeliverablesCount = deliverables.reels + deliverables.tiktoks + deliverables.stories + deliverables.facebook + deliverables.youtube + deliverables.evento;

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
    if (deliverables.reels > 0) delivArray.push({ type: 'instagram', label: `${deliverables.reels} Instagram Reel` });
    if (deliverables.stories > 0) delivArray.push({ type: 'instagram', label: `${deliverables.stories} IG Stories` });
    if (deliverables.tiktoks > 0) delivArray.push({ type: 'tiktok', label: `${deliverables.tiktoks} TikTok` });
    if (deliverables.facebook > 0) delivArray.push({ type: 'facebook', label: `${deliverables.facebook} Facebook` });
    if (deliverables.youtube > 0) delivArray.push({ type: 'youtube', label: `${deliverables.youtube} YouTube` });
    if (deliverables.evento > 0) delivArray.push({ type: 'evento', label: `${deliverables.evento} Evento` });

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
      statusHistory: { 'Campaña Recibida': getExactNowTimestamp() }
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

  const handleStrictStatusChange = (colab: any, targetStatus: string) => {
    setStatusErrorMsg('');
    const currentStatus = colab.status;

    if (currentStatus === targetStatus) return;

    if (currentStatus === 'Campaña Cancelada') {
      setStatusErrorMsg('La campaña está cancelada. No es posible cambiar a otros estados.');
      return;
    }

    if (targetStatus === 'Campaña Cancelada') {
      if (currentStatus === 'Factura Cobrada') {
        setStatusErrorMsg('No se puede cancelar una campaña que ya ha sido totalmente cobrada.');
        return;
      }
      applyStatusUpdate(colab.id, targetStatus);
      return;
    }

    if (currentStatus === 'Guión Observado') {
      const allowedFromGuionObservado = ['Guión Enviado', 'Guión Aprobado', 'Campaña Cancelada'];
      if (!allowedFromGuionObservado.includes(targetStatus)) {
        setStatusErrorMsg('El guión está observado. Debes corregirlo ("Guión Enviado") o aprobarlo ("Guión Aprobado") antes de avanzar a Producción.');
        return;
      }
    }

    if (currentStatus === 'Video Observado') {
      const allowedFromVideoObservado = ['En Edición', 'Video Entregado', 'Video Aprobado', 'Campaña Cancelada'];
      if (!allowedFromVideoObservado.includes(targetStatus)) {
        setStatusErrorMsg('El video está observado. Debes corregir la edición o aprobarlo ("Video Aprobado") antes de publicar o facturar.');
        return;
      }
    }

    const currentIdx = MAIN_LINEAL_SEQUENCE.indexOf(currentStatus);
    const targetIdx = MAIN_LINEAL_SEQUENCE.indexOf(targetStatus);

    if (currentIdx !== -1 && targetIdx !== -1) {
      if (targetIdx > currentIdx + 1) {
        const nextRequiredStatus = MAIN_LINEAL_SEQUENCE[currentIdx + 1];
        setStatusErrorMsg(`No puedes saltar directo a "${targetStatus}". El siguiente paso obligatorio es "${nextRequiredStatus}".`);
        return;
      }
    }

    applyStatusUpdate(colab.id, targetStatus);
  };

  const applyStatusUpdate = (colabId: string, newStatus: string) => {
    const nowTimestamp = getExactNowTimestamp();
    setColabs(colabs.map(c => {
      if (c.id === colabId) {
        return { ...c, status: newStatus, statusHistory: { ...c.statusHistory, [newStatus]: nowTimestamp } };
      }
      return c;
    }));

    if (statusModalColab && statusModalColab.id === colabId) {
      setStatusModalColab({ ...statusModalColab, status: newStatus, statusHistory: { ...statusModalColab.statusHistory, [newStatus]: nowTimestamp } });
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

  const monthFormatted = month + 1 < 10 ? `0${month + 1}` : `${month + 1}`;
  const dayFormatted = selectedDay < 10 ? `0${selectedDay}` : `${selectedDay}`;
  const selectedDateStr = `${year}-${monthFormatted}-${dayFormatted}`;
  const dayEvents = calendarEvents.filter(e => e.date === selectedDateStr && (calendarFilter === 'todos' || e.category === calendarFilter));

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 text-slate-800 pb-28">
      <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-xl border-b border-purple-100/60 px-6 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-xl flex items-center justify-center font-black text-white text-sm shadow-md">
              CD
            </div>
            <h1 className="text-base font-extrabold text-slate-800 tracking-tight">CreatorDesk</h1>
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
                <span className="text-xs text-slate-500 font-semibold block">💰 Total Cobrado</span>
                <div className="text-2xl font-black text-emerald-600">
                  $ {totalPaidUsdConverted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <p className="text-[10px] text-slate-400">{paidColabs.length} campañas cobradas</p>
              </div>

              <div className="bg-white/80 backdrop-blur-xl border border-white/60 p-5 rounded-2xl space-y-2 shadow-lg shadow-purple-100/30">
                <span className="text-xs text-slate-500 font-semibold block">⏳ Pendiente por Cobrar</span>
                <div className="text-2xl font-black text-amber-500">
                  $ {totalPendingUsdConverted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <p className="text-[10px] text-slate-400 font-medium">
                  {pendingColabs.length} campañas en proceso {pendingBreakdownText}
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-xl border border-white/60 p-5 rounded-2xl space-y-2 shadow-lg shadow-purple-100/30 sm:col-span-2 lg:col-span-1">
                <span className="text-xs text-slate-500 font-semibold block">📊 Colaboraciones Activas</span>
                <div className="text-2xl font-black text-purple-600">{colabs.filter(c => c.status !== 'Campaña Cancelada').length} Marcas</div>
                <p className="text-[10px] text-purple-500 font-medium truncate">{activeBrandsNames || 'Sin campañas activas'}</p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-xl border border-white/60 p-6 rounded-2xl space-y-4 shadow-xl shadow-purple-100/40">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <span className="text-emerald-500 text-sm">✅</span>
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
                {tasks.map((t) => {
                  const isCompleted = t.status === 'completada';
                  return (
                    <div key={t.id} className="flex items-center justify-between p-3.5 bg-slate-50/80 border border-slate-200/80 rounded-2xl text-xs">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={isCompleted}
                          disabled={isCompleted}
                          onChange={() => handleTaskCheckboxClick(t)}
                          className="w-4 h-4 rounded border-slate-300 text-purple-600 focus:ring-purple-400 cursor-pointer disabled:cursor-not-allowed"
                        />
                        <span className={isCompleted ? 'line-through text-slate-400 font-medium' : 'text-slate-800 font-medium'}>
                          {t.title}
                        </span>
                      </div>
                      <span className="px-2.5 py-1 bg-purple-50 border border-purple-200 text-purple-700 text-[10px] rounded-lg font-bold">
                        {t.brand}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* COLABS */}
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {filteredColabs.map((c) => {
                const currentStageIdx = getStageIndex(c.status);
                const lastDateWithTime = c.statusHistory?.[c.status] || getExactNowTimestamp();

                return (
                  <div
                    key={c.id}
                    className="bg-white/80 backdrop-blur-xl border border-white/60 p-6 rounded-3xl space-y-4 shadow-xl shadow-purple-100/30 hover:border-purple-300 transition relative"
                  >
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
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-1.5">
                        {c.deliverables?.map((d: any, idx: number) => (
                          <span key={idx} className="px-2.5 py-1 bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-[11px] rounded-lg flex items-center gap-1.5 shadow-2xs">
                            {renderSocialIcon(d.type)}
                            <span>{d.label}</span>
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => setInfoModalColab(c)}
                        className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs rounded-xl border border-purple-200 transition whitespace-nowrap flex items-center gap-1"
                      >
                        👁️ Info
                      </button>
                    </div>

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

        {/* AGENDA & GOOGLE CALENDAR REDISEÑADO CON NAVEGACIÓN Y TAMAÑO AMPLIADO */}
        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Agenda & Google Calendar</h2>
                <p className="text-xs text-slate-500">Gestión unificada de eventos, tareas y citas sincronizadas en tiempo real.</p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={handleGoogleAuthConnect}
                  className={`px-3.5 py-2.5 rounded-2xl text-xs font-bold transition flex items-center gap-2 border shadow-sm ${
                    isGoogleConnected ? 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <GoogleIcon />
                  <span>{isGoogleConnected ? '✓ Google Conectado' : 'Conectar Google'}</span>
                </button>

                <button
                  onClick={() => {
                    setCreateDate(`${year}-${monthFormatted}-${dayFormatted}`);
                    setShowCreateEventModal(true);
                  }}
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-extrabold text-xs rounded-2xl shadow-lg transition flex items-center gap-2"
                >
                  <span className="text-base font-black">+</span>
                  <span>Crear Evento</span>
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2 bg-white/80 p-1.5 rounded-2xl border border-white/60 shadow-sm overflow-x-auto">
              {[
                { key: 'todos', label: 'Todos los Eventos' },
                { key: 'grabacion', label: '🎥 Grabaciones' },
                { key: 'entrega', label: '📤 Entregas / Borradores' },
                { key: 'reunion', label: '👥 Reuniones' },
                { key: 'pago', label: '💵 Pagos & Facturas' },
                { key: 'google', label: '🌐 Google Calendar' }
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setCalendarFilter(f.key as any)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                    calendarFilter === f.key ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl border border-white/60 p-6 rounded-3xl space-y-4 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={handlePrevMonth}
                        className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-purple-100 text-slate-600 hover:text-purple-700 font-black text-sm flex items-center justify-center transition"
                      >
                        ◄
                      </button>
                      <h3 className="font-black text-slate-800 text-base capitalize">{monthName}</h3>
                      <button
                        onClick={handleNextMonth}
                        className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-purple-100 text-slate-600 hover:text-purple-700 font-black text-sm flex items-center justify-center transition"
                      >
                        ►
                      </button>
                    </div>

                    <button
                      onClick={() => setCurrentDate(new Date(2026, 9, 29))}
                      className="text-xs font-bold text-purple-600 bg-purple-50 hover:bg-purple-100 px-3 py-1 rounded-xl border border-purple-100 transition"
                    >
                      Hoy: 29 Oct
                    </button>
                  </div>

                  <div className="grid grid-cols-7 text-center text-[11px] font-bold text-slate-400 py-2">
                    <span>Dom</span><span>Lun</span><span>Mar</span><span>Mié</span><span>Jue</span><span>Vie</span><span>Sáb</span>
                  </div>

                  {/* GRID AMPLIADO PARA OCUPAR EL ESPACIO VERTICAL */}
                  <div className="grid grid-cols-7 gap-2">
                    {[...Array(firstDayOfMonth)].map((_, i) => (
                      <div key={`empty-${i}`} className="h-16 sm:h-20 rounded-2xl bg-slate-50/20 opacity-20"></div>
                    ))}

                    {[...Array(daysInMonth)].map((_, i) => {
                      const dayNum = i + 1;
                      const dayStr = dayNum < 10 ? `0${dayNum}` : `${dayNum}`;
                      const dateStr = `${year}-${monthFormatted}-${dayStr}`;
                      const dayEvts = calendarEvents.filter(e => e.date === dateStr);
                      const isSelected = selectedDay === dayNum;

                      return (
                        <button
                          key={dayNum}
                          onClick={() => setSelectedDay(dayNum)}
                          className={`h-16 sm:h-20 rounded-2xl flex flex-col items-center justify-between p-2 text-xs font-bold border transition-all ${
                            isSelected
                              ? 'bg-gradient-to-tr from-purple-500 to-pink-500 text-white border-transparent shadow-lg ring-2 ring-purple-300'
                              : 'bg-white/70 border-slate-100 text-slate-700 hover:bg-purple-50/60'
                          }`}
                        >
                          <span className="text-xs font-black">{dayNum}</span>
                          {dayEvts.length > 0 && (
                            <div className="flex items-center gap-1">
                              {dayEvts.some(e => e.source === 'google') && <span className="w-2 h-2 rounded-full bg-sky-400"></span>}
                              {dayEvts.some(e => e.source === 'creator') && <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-white' : 'bg-pink-500'}`}></span>}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-xl border border-white/60 p-6 rounded-3xl space-y-4 shadow-xl flex flex-col justify-between h-full">
                <div className="space-y-4">
                  <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                    <div>
                      <h3 className="font-extrabold text-slate-800 text-base">Día {selectedDay} de {monthName}</h3>
                      <p className="text-[11px] text-slate-400 font-medium">{dayEvents.length} eventos programados</p>
                    </div>
                    <span className="text-xl">📅</span>
                  </div>

                  <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
                    {dayEvents.length === 0 ? (
                      <div className="p-12 text-center space-y-2">
                        <span className="text-3xl block">☕</span>
                        <p className="text-xs text-slate-400 font-medium">No hay eventos para este día.</p>
                      </div>
                    ) : (
                      dayEvents.map((evt) => (
                        <div key={evt.id} className="p-3.5 bg-slate-50/90 border border-slate-200/80 rounded-2xl space-y-2 relative">
                          <div className="flex items-start justify-between">
                            <div className="space-y-0.5">
                              {getCategoryBadge(evt.category)}
                              <h4 className="font-bold text-slate-800 text-xs pt-1">{evt.title}</h4>
                            </div>
                            {evt.source !== 'google' && (
                              <button onClick={() => handleDeleteEvent(evt.id)} className="text-slate-300 hover:text-rose-500 text-xs p-1">✕</button>
                            )}
                          </div>
                          <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold pt-1 border-t border-slate-100">
                            <span>🏷️ Marca: <strong className="text-purple-600">{evt.brand}</strong></span>
                            <span>🕒 {evt.time}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAREAS */}
        {activeTab === 'tasks' && (
          <div className="bg-white/80 p-6 rounded-2xl space-y-3 shadow-xl">
            <h2 className="text-lg font-bold text-slate-800">Lista de Tareas Completa</h2>
            <div className="space-y-2">
              {tasks.map((t) => {
                const isCompleted = t.status === 'completada';
                return (
                  <div key={t.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl text-xs">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={isCompleted}
                        disabled={isCompleted}
                        onChange={() => handleTaskCheckboxClick(t)}
                        className="rounded text-purple-600 disabled:cursor-not-allowed"
                      />
                      <span className={isCompleted ? 'line-through text-slate-400' : 'text-slate-800 font-medium'}>
                        {t.title}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* INGRESOS */}
        {activeTab === 'income' && (
          <div className="bg-white/80 p-6 rounded-2xl space-y-3 shadow-xl">
            <h2 className="text-lg font-bold text-slate-800">Control de Ingresos</h2>
            <div className="text-2xl font-black text-emerald-600">
              $ {totalPaidUsdConverted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
        )}

        {/* MEDIAKIT */}
        {activeTab === 'mediakit' && (
          <div className="bg-white/80 p-6 rounded-2xl space-y-3 shadow-xl">
            <h2 className="text-lg font-bold text-slate-800">Media Kit Profesional</h2>
            <p className="text-xs text-slate-500">Perfil público de {displayName}</p>
          </div>
        )}

      </main>

      {/* MODAL UNIFICADO Y ESTILIZADO DE CREAR EVENTO */}
      {showCreateEventModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-3xl max-w-md w-full space-y-4 shadow-2xl border border-purple-100 relative">
            <button
              onClick={() => setShowCreateEventModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 text-base font-bold"
            >
              ✕
            </button>

            <h2 className="text-base font-black text-slate-800 flex items-center gap-2">
              <span>📅</span> <span>Crear Nuevo Evento</span>
            </h2>

            <form onSubmit={handleCreateEventSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Título del Evento *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Grabar Reel Unboxing..."
                  value={createTitle}
                  onChange={(e) => setCreateTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs font-semibold outline-none focus:border-purple-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Marca / Proyecto</label>
                <input
                  type="text"
                  placeholder="Ej: Adidas, Personal..."
                  value={createBrand}
                  onChange={(e) => setCreateBrand(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs font-semibold outline-none focus:border-purple-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Fecha</label>
                  <input
                    type="date"
                    required
                    value={createDate}
                    onChange={(e) => setCreateDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Hora</label>
                  <input
                    type="time"
                    required
                    value={createTime}
                    onChange={(e) => setCreateTime(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Categoría de Evento</label>
                <select
                  value={createCategory}
                  onChange={(e) => setCreateCategory(e.target.value as any)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold outline-none"
                >
                  <option value="grabacion">🎥 Grabación</option>
                  <option value="entrega">📤 Entrega / Borrador</option>
                  <option value="reunion">👥 Reunión</option>
                  <option value="pago">💵 Pago & Facturación</option>
                </select>
              </div>

              {isGoogleConnected && (
                <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 pt-1">
                  ✓ Sincronización activa: El evento se guardará en tu Google Calendar automáticamente.
                </p>
              )}

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateEventModal(false)}
                  className="px-4 py-2.5 bg-slate-100 text-slate-600 font-bold text-xs rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-extrabold text-xs rounded-xl shadow-md transition"
                >
                  Guardar Evento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL CONFIRMACIÓN TAREA */}
      {showTaskConfirmModal && pendingTask && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-3xl max-w-sm w-full text-center space-y-4 shadow-2xl border border-purple-100">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto text-emerald-600 font-bold text-xl">
              ✓
            </div>

            <div className="space-y-1.5">
              <h3 className="font-black text-slate-800 text-base">¿Marcar Tarea como Realizada?</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Confirmas que has completado la tarea: <strong className="text-slate-800">"{pendingTask.title}"</strong>. Una vez confirmada, quedará registrada como completada en tu panel personal.
              </p>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowTaskConfirmModal(false);
                  setPendingTask(null);
                }}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl transition"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmCompleteTask}
                className="flex-1 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-extrabold text-xs rounded-xl shadow-md transition"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL NUEVA COLABORACIÓN */}
      {showNewColabModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-3xl max-w-lg w-full space-y-4 shadow-2xl border border-purple-100 max-h-[92vh] overflow-y-auto relative">
            <button
              onClick={() => setShowNewColabModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 text-base font-bold"
            >
              ✕
            </button>

            <h2 className="text-base font-black text-slate-800">Nueva Colaboración</h2>

            <form onSubmit={handleCreateColab} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nombre de la Marca *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Nike, Samsung..."
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs font-medium outline-none focus:border-purple-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Persona / Punto de Contacto</label>
                <input
                  type="text"
                  placeholder="Ej: Andrea Badillo (Marketing Manager)"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs font-medium outline-none focus:border-purple-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Tipo de Acuerdo</label>
                <div className="grid grid-cols-2 gap-2 bg-purple-50/40 p-1.5 rounded-2xl border border-purple-100/60">
                  <button
                    type="button"
                    onClick={() => setDealType('Pago')}
                    className={`py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                      dealType === 'Pago' ? 'bg-purple-100/80 text-purple-700 border border-purple-200 shadow-2xs' : 'text-slate-500'
                    }`}
                  >
                    <span>💵</span> <span>Pago</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDealType('Canje')}
                    className={`py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                      dealType === 'Canje' ? 'bg-purple-100/80 text-purple-700 border border-purple-200 shadow-2xs' : 'text-slate-500'
                    }`}
                  >
                    <span>🎁</span> <span>Canje / Producto</span>
                  </button>
                </div>
              </div>

              {dealType === 'Pago' && (
                <div className="space-y-3 p-3 bg-purple-50/30 rounded-2xl border border-purple-100/60">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Moneda de Pago</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setCurrency('USD')}
                        className={`py-2 rounded-xl text-xs font-bold transition ${
                          currency === 'USD' ? 'bg-emerald-100/80 text-emerald-800 border border-emerald-200' : 'bg-white text-slate-600 border border-slate-200'
                        }`}
                      >
                        $ Dólares (USD)
                      </button>
                      <button
                        type="button"
                        onClick={() => setCurrency('PEN')}
                        className={`py-2 rounded-xl text-xs font-bold transition ${
                          currency === 'PEN' ? 'bg-emerald-100/80 text-emerald-800 border border-emerald-200' : 'bg-white text-slate-600 border border-slate-200'
                        }`}
                      >
                        S/ Soles (PEN)
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Monto Total a Cobrar</label>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs font-bold outline-none"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2 pt-1">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-700">Contenidos a Entregar (Mínimo 1) *</label>
                  <span className="text-[10px] text-purple-600 font-bold">Seleccionados: {totalDeliverablesCount}</span>
                </div>
                {deliverableError && <p className="text-[11px] text-rose-500 font-bold">{deliverableError}</p>}

                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Instagram Reel', key: 'reels', icon: <InstagramIcon /> },
                    { label: 'IG Stories', key: 'stories', icon: <InstagramIcon /> },
                    { label: 'TikTok', key: 'tiktoks', icon: <TikTokIcon /> },
                    { label: 'Facebook', key: 'facebook', icon: <FacebookIcon /> },
                    { label: 'YouTube', key: 'youtube', icon: <YoutubeIcon /> },
                    { label: 'Evento', key: 'evento', icon: <EventIcon /> }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between px-3 py-2 bg-slate-50/80 rounded-2xl border border-slate-200/80">
                      <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                        {item.icon} <span>{item.label}</span>
                      </span>
                      <div className="flex items-center space-x-1.5">
                        <button
                          type="button"
                          onClick={() => setDeliverables({ ...deliverables, [item.key]: Math.max(0, (deliverables as any)[item.key] - 1) })}
                          className="w-6 h-6 rounded-md bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center hover:bg-slate-300"
                        >
                          -
                        </button>
                        <span className="text-xs font-black text-slate-800 w-4 text-center">{(deliverables as any)[item.key]}</span>
                        <button
                          type="button"
                          onClick={() => setDeliverables({ ...deliverables, [item.key]: (deliverables as any)[item.key] + 1 })}
                          className="w-6 h-6 rounded-md bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center hover:bg-slate-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-black text-purple-800 flex items-center gap-1">
                    ⚡ ¿Es contenido UGC?
                  </span>
                  <p className="text-[10px] text-slate-400">Contenido creado exclusivamente para uso de la marca</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsUgc(!isUgc)}
                  className={`w-11 h-6 rounded-full transition-colors p-1 flex items-center ${
                    isUgc ? 'bg-purple-600 justify-end' : 'bg-slate-300 justify-start'
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-white shadow-md"></div>
                </button>
              </div>

              {isUgc && (
                <div className="p-3.5 bg-purple-50/50 rounded-2xl border border-purple-100/80 space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 mb-1">Derechos de Uso Comercial (Licencia)</label>
                    <select
                      value={usageRightsDays}
                      onChange={(e) => setUsageRightsDays(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold outline-none"
                    >
                      <option value="30 Días de Uso en Pauta">30 Días de Uso en Pauta</option>
                      <option value="60 Días de Uso en Pauta">60 Días de Uso en Pauta</option>
                      <option value="90 Días de Uso en Pauta">90 Días de Uso en Pauta</option>
                      <option value="Uso Orgánico Indefinido">Uso Orgánico Indefinido</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-1">Formato de Entrega</label>
                      <select
                        value={deliveryFormat}
                        onChange={(e) => setDeliveryFormat(e.target.value)}
                        className="w-full px-2.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold outline-none"
                      >
                        <option value="Vertical 9:16 (Reels/TikTok)">Vertical 9:16 (Reels/TikTok)</option>
                        <option value="Horizontal 16:9 (YouTube/Web)">Horizontal 16:9 (YouTube/Web)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-600 mb-1">Exclusividad de Creador</label>
                      <select
                        value={categoryExclusivity}
                        onChange={(e) => setCategoryExclusivity(e.target.value)}
                        className="w-full px-2.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold outline-none"
                      >
                        <option value="Sin Exclusividad">Sin Exclusividad</option>
                        <option value="15 Días en Categoría">15 Días en Categoría</option>
                        <option value="30 Días en Categoría">30 Días en Categoría</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1.5 pt-1">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includesRawFootage}
                        onChange={(e) => setIncludesRawFootage(e.target.checked)}
                        className="rounded text-purple-600 focus:ring-purple-400"
                      />
                      <span className="text-[11px] font-medium text-slate-700">Incluye Raw Footage (Material sin editar)</span>
                    </label>

                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={allowAdsUsage}
                        onChange={(e) => setAllowAdsUsage(e.target.checked)}
                        className="rounded text-purple-600 focus:ring-purple-400"
                      />
                      <span className="text-[11px] font-medium text-slate-700">Uso para Pauta / Ads (Whitelisting)</span>
                    </label>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewColabModal(false)}
                  className="px-4 py-2.5 bg-slate-100 text-slate-600 font-bold text-xs rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-extrabold text-xs rounded-xl shadow-md transition"
                >
                  Guardar Colaboración
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL CAMBIAR ESTADO */}
      {statusModalColab && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-3xl max-w-md w-full space-y-4 shadow-2xl border border-purple-100 max-h-[88vh] overflow-y-auto relative">
            <button
              onClick={() => setStatusModalColab(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 text-base font-bold"
            >
              ✕
            </button>

            <div>
              <h3 className="font-black text-slate-800 text-base">{statusModalColab.brand}</h3>
              <p className="text-xs font-bold text-purple-600">Estado Actual: {statusModalColab.status}</p>
            </div>

            <p className="text-xs font-bold text-slate-700">Avanzar Estado Paso a Paso:</p>

            {statusErrorMsg && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-2xl font-bold shadow-2xs">
                ⚠️ {statusErrorMsg}
              </div>
            )}

            <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
              {CAMPAIGN_STAGES.map((stg) => (
                <div key={stg.stage} className="space-y-1.5">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs">{stg.icon}</span>
                    <span className="text-xs font-bold text-purple-700">{stg.stage}</span>
                  </div>

                  <div className="grid grid-cols-1 gap-1.5">
                    {stg.statuses.map((st) => {
                      const isCurrent = statusModalColab.status === st;
                      const hasTimestamp = statusModalColab.statusHistory?.[st];

                      return (
                        <button
                          key={st}
                          onClick={() => handleStrictStatusChange(statusModalColab, st)}
                          className={`w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition flex items-center justify-between border ${
                            isCurrent
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent shadow-md font-bold'
                              : 'bg-slate-50/80 hover:bg-purple-50/60 text-slate-700 border-slate-100'
                          }`}
                        >
                          <span>{st}</span>
                          {hasTimestamp && (
                            <span className={`text-[10px] ${isCurrent ? 'text-purple-100 font-bold' : 'text-purple-600 font-semibold'}`}>
                              🕒 {hasTimestamp}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setStatusModalColab(null)}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
            >
              Guardar y Cerrar
            </button>
          </div>
        </div>
      )}

      {/* MODAL INFO DETALLADA */}
      {infoModalColab && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-3xl max-w-md w-full space-y-4 shadow-2xl border border-purple-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-black text-slate-800 text-lg">{infoModalColab.brand}</h3>
                <p className="text-xs text-purple-600 font-semibold">👤 {infoModalColab.contactName}</p>
              </div>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-xl">
                {infoModalColab.dealType}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="font-bold text-slate-700 block">📦 Entregables:</span>
                <div className="flex flex-wrap gap-1 pt-1">
                  {infoModalColab.deliverables?.map((d: any, i: number) => (
                    <span key={i} className="px-2 py-0.5 bg-white border border-slate-200 text-slate-700 font-bold text-[10px] rounded-md">
                      {d.label}
                    </span>
                  ))}
                </div>
              </div>

              {infoModalColab.isUgc && infoModalColab.ugcDetails && (
                <div className="p-3 bg-indigo-50/60 rounded-xl space-y-1 text-indigo-900 border border-indigo-100">
                  <span className="font-bold block">⚡ Términos UGC:</span>
                  <p className="text-[11px]">• Derechos: {infoModalColab.ugcDetails.usageRightsDays}</p>
                  <p className="text-[11px]">• Exclusividad: {infoModalColab.ugcDetails.categoryExclusivity}</p>
                  <p className="text-[11px]">• Formato: {infoModalColab.ugcDetails.deliveryFormat}</p>
                </div>
              )}

              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="font-bold text-slate-700 block">📜 Historial de Cambios:</span>
                {Object.entries(infoModalColab.statusHistory || {}).map(([st, ts]: any) => (
                  <div key={st} className="flex justify-between text-[10px] text-slate-500">
                    <span>{st}</span>
                    <span className="font-semibold text-purple-600">{ts}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setInfoModalColab(null)}
              className="w-full py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* MENÚ FLOTANTE INFERIOR NAVEGABLE */}
      <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-2xl border border-white/80 px-3 py-2 rounded-2xl shadow-2xl shadow-purple-200/60 flex items-center space-x-1 sm:space-x-2 z-30">
        {[
          { key: 'home', label: 'Inicio', icon: '🏠' },
          { key: 'colabs', label: 'Colabs', icon: '🤝' },
          { key: 'calendar', label: 'Agenda', icon: '📅' },
          { key: 'tasks', label: 'Tareas', icon: '📝' },
          { key: 'income', label: 'Ingresos', icon: '💰' },
          { key: 'mediakit', label: 'MediaKit', icon: '📁' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex flex-col items-center px-3 py-1.5 rounded-xl transition text-[11px] font-bold ${
              activeTab === tab.key ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <span className="text-sm">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}