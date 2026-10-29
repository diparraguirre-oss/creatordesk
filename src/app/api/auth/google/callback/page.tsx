'use client';

import { useEffect } from 'react';

export default function GoogleCallbackPage() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.replace('#', '?'));
      const accessToken = params.get('access_token');

      if (accessToken) {
        localStorage.setItem('google_access_token', accessToken);
      }

      // Redirigir de regreso al panel
      window.location.href = '/creatordesk/creador';
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center text-xs font-semibold text-slate-600">
      Conectando con Google Calendar...
    </div>
  );
}