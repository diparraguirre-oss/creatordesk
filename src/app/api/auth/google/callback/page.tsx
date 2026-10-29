'use client';

import { useEffect } from 'react';

export default function GoogleCallbackPage() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash) {
        const params = new URLSearchParams(hash.replace('#', '?'));
        const accessToken = params.get('access_token');

        if (accessToken) {
          localStorage.setItem('google_access_token', accessToken);
        }
      }

      window.location.href = '/creatordesk/creador';
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center space-y-3 text-xs font-semibold text-slate-600">
      <div className="w-8 h-8 border-3 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      <p>Sincronizando tus eventos de Google Calendar...</p>
    </div>
  );
}