export interface DeliverablePipelineItem {
  id: string;
  type: string;
  title: string;
  status: 'guion_pendiente' | 'guion_enviado' | 'guion_aprobado' | 'borrador_enviado' | 'aprobado' | 'publicado' | 'cobrado' | string;
  published_date?: string;
  expected_payment_date?: string;
}

export interface Campaign {
  id: string;
  brand?: string;
  brand_name?: string;
  brandName?: string;
  contact_person?: string;
  contact?: string;
  deal_type?: 'Pago' | 'Canje' | string;
  type?: 'Pago' | 'Canje' | string;
  agreement_type?: string;
  currency?: 'USD' | 'PEN' | string;
  amount?: number;
  deliverables?: any[];
  status?: string;
  payment_days?: number;
  paymentDays?: number;
  created_at?: string;
  pipeline?: DeliverablePipelineItem[];
}