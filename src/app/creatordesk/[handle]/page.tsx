'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import ColabsView from '@/components/ColabsView';
import CampaignModal from '@/components/CampaignModal';
import HomeView from '@/components/HomeView';
import AgendaView from '@/components/AgendaView';
import TasksView from '@/components/TasksView';
import FinancesView from '@/components/FinancesView';
import MediaKitPreview from '@/components/MediaKitPreview';
import GiorgiaModal from '@/components/GiorgiaModal';
import { 
  Plus, 
  LogOut, 
  Gift, 
  Home, 
  Briefcase, 
  Calendar, 
  CheckSquare, 
  DollarSign, 
  FileText, 
  Sparkles 
} from 'lucide-react';

export default function CreatorDeskDashboard() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'home' | 'colabs' | 'agenda' | 'tasks' | 'finances' | 'mediakit'>('home');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<any>(null);
  const [isGiorgiaOpen, setIsGiorgiaOpen] = useState(false);

  useEffect(() => {
    loadUserDataAndCampaigns();
  }, [params.handle]);

  const loadUserDataAndCampaigns = async () => {
    setLoading(true);
    try {
      const handleParam = params.handle as string;
      const cleanHandle = `@${handleParam}`;

      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push('/login');
        return;
      }

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('main_handle', cleanHandle)
        .maybeSingle();

      if (profileData) {
        setProfile(profileData);
        await fetchCampaigns(profileData.id);
      } else {
        await fetchCampaigns(session.user.id);
      }
    } catch (err) {
      console.error('Error al cargar datos:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCampaigns = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const normalizedData = (data || []).map((c: any) => ({
        ...c,
        brand_name: c.brand_name || c.brand || 'Marca sin nombre',
        payment_days: c.payment_days !== undefined ? c.payment_days : c.paymentDays !== undefined ? c.paymentDays : 30,
      }));

      setCampaigns(normalizedData);
    } catch (err: any) {
      console.error('Error cargando colaboraciones:', err);
    }
  };

  const handleSaveCampaign = async (payload: any, paymentDays: number) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.id) return;

      const activeUserId = session.user.id;
      const campaignData: any = {
        user_id: activeUserId,
        brand_name: payload.brand_name,
        brand: payload.brand_name,
        contact_person: payload.contact_person,
        agreement_type: payload.agreement_type,
        currency: payload.currency,
        amount: payload.amount,
        payment_days: paymentDays,
        status: payload.status || 'EN PLANIFICACIÓN',
        deliverables: payload.deliverables || [],
      };

      if (editingCampaign) {
        await supabase.from('campaigns').update(campaignData).eq('id', editingCampaign.id);
      } else {
        await supabase.from('campaigns').insert([campaignData]);
      }

      await fetchCampaigns(activeUserId);
    } catch (err: any) {
      alert('Error al guardar: ' + err.message);
    }
  };

  const handleEditCampaign = (campaign: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingCampaign(campaign);
    setIsModalOpen(true);
  };

  const handleDeleteCampaign = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('¿Eliminar esta colaboración?')) return;
    await supabase.from('campaigns').delete().eq('id', id);
    const { data: { session } } = await supabase.auth.getSession();
    if (session) fetchCampaigns(session.user.id);
  };

  return (
    <div className="min-h-screen bg-[#FDF8FA] text-[#2A1F35] flex flex-col justify-between pb-24">
      {/* Header Pastel */}
      <header className="border-b border-pink-100 bg-white/90 backdrop-blur-md sticky top-0 z-40 px-4 md:px-8 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-400 to-purple-400 flex items-center justify-center font-black text-white shadow-md shadow-pink-200">
              CD
            </div>
            <div>
              <h1 className="font-black text-[#2A1F35] text-base md:text-lg leading-tight">
                CreatorDesk
              </h1>
              <p className="text-[11px] text-pink-500 font-semibold">Tu Manager Digital</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:flex items-center gap-1.5 bg-pink-50 border border-pink-200 text-pink-600 px-3 py-1.5 rounded-full text-xs font-semibold">
              <Gift size={14} className="text-pink-500" />
              <span>Plan <strong>Prueba Gratuita</strong> • 14 días</span>
            </span>

            <button
              onClick={() => {
                setEditingCampaign(null);
                setIsModalOpen(true);
              }}
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-4 py-2 rounded-xl text-xs transition flex items-center gap-1.5 shadow-md shadow-pink-200"
            >
              <Plus size={16} />
              <span>Nueva Colab</span>
            </button>

            <button
              onClick={async () => {
                await supabase.auth.signOut();
                router.push('/login');
              }}
              className="bg-pink-50 text-pink-700 p-2.5 rounded-xl text-xs border border-pink-200"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Contenido */}
      <main className="max-w-7xl mx-auto w-full px-4 md:px-8 py-8 flex-1">
        {activeTab === 'home' && (
          <HomeView
            profile={profile}
            campaigns={campaigns}
            onConsultGiorgia={() => setIsGiorgiaOpen(true)}
            onNavigateTab={(tab) => setActiveTab(tab as any)}
          />
        )}
        {activeTab === 'colabs' && (
          <ColabsView
            campaigns={campaigns}
            loading={loading}
            onSelectCampaign={() => {}}
            onEditCampaign={handleEditCampaign}
            onDeleteCampaign={handleDeleteCampaign}
          />
        )}
        {activeTab === 'agenda' && <AgendaView campaigns={campaigns} />}
        {activeTab === 'tasks' && <TasksView campaigns={campaigns} />}
        {activeTab === 'finances' && <FinancesView campaigns={campaigns} />}
        {activeTab === 'mediakit' && <MediaKitPreview profile={profile} />}
      </main>

      {/* Botón Flotante GiorgIA Manager */}
      <button
        onClick={() => setIsGiorgiaOpen(true)}
        className="fixed bottom-20 right-6 z-40 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold px-4 py-3 rounded-full text-xs shadow-lg shadow-pink-300 flex items-center gap-2 hover:scale-105 transition"
      >
        <Sparkles size={16} className="text-amber-200" />
        <span>GiorgIA Manager</span>
      </button>

      {/* Navegación Inferior */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 border-t border-pink-100 backdrop-blur-lg z-40 px-2 py-2 shadow-lg">
        <div className="max-w-md mx-auto flex justify-around items-center text-[10px]">
          {[
            { id: 'home', label: 'Inicio', icon: Home },
            { id: 'colabs', label: 'Colabs', icon: Briefcase },
            { id: 'agenda', label: 'Agenda', icon: Calendar },
            { id: 'tasks', label: 'Tareas', icon: CheckSquare },
            { id: 'finances', label: 'Ingresos', icon: DollarSign },
            { id: 'mediakit', label: 'Media Kit', icon: FileText },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`flex flex-col items-center gap-1 p-1.5 transition rounded-xl ${
                  isActive ? 'text-pink-600 font-bold bg-pink-50' : 'text-slate-400'
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <CampaignModal
        isOpen={isModalOpen}
        editingCampaign={editingCampaign}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCampaign(null);
        }}
        onSave={handleSaveCampaign}
      />

      <GiorgiaModal
        isOpen={isGiorgiaOpen}
        onClose={() => setIsGiorgiaOpen(false)}
        campaigns={campaigns}
        profile={profile}
      />
    </div>
  );
}