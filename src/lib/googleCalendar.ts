// src/lib/googleCalendar.ts
import { supabase } from '@/lib/supabase';

export interface CalendarEventPayload {
  title: string;
  description?: string;
  date: string; // YYYY-MM-DD
}

export async function syncEventToGoogleCalendar(event: CalendarEventPayload) {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    const providerToken = session?.provider_token;

    if (!providerToken) {
      console.log('El usuario inició sesión por email o no tiene token de Google activo.');
      return false;
    }

    const googleEvent = {
      summary: event.title,
      description: event.description || 'Evento programado desde CreatorDesk Manager',
      start: {
        date: event.date, // Evento de todo el día
      },
      end: {
        date: event.date,
      },
    };

    const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${providerToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(googleEvent),
    });

    if (response.ok) {
      console.log('Evento sincronizado con Google Calendar con éxito');
      return true;
    } else {
      const errData = await response.json();
      console.error('Error al sincronizar con Google Calendar:', errData);
      return false;
    }
  } catch (error) {
    console.error('Error de red al conectar con Google API:', error);
    return false;
  }
}