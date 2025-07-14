/**
 * Sistema de Analytics Profissional
 * Google Analytics 4 + Facebook Pixel + Hotjar
 */

// Tipos para eventos customizados
export interface CustomEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  nicho?: string;
  step?: number;
}

export interface ConversionEvent {
  event_name: string;
  currency?: string;
  value?: number;
  items?: Array<{
    item_id: string;
    item_name: string;
    category: string;
    quantity: number;
    price: number;
  }>;
}

class AnalyticsManager {
  private static instance: AnalyticsManager;
  private gaInitialized = false;
  private fbPixelInitialized = false;
  private hotjarInitialized = false;

  public static getInstance(): AnalyticsManager {
    if (!AnalyticsManager.instance) {
      AnalyticsManager.instance = new AnalyticsManager();
    }
    return AnalyticsManager.instance;
  }

  // Inicialização do Google Analytics 4
  public initializeGA4(measurementId: string = 'G-XXXXXXXXXX') {
    if (this.gaInitialized || typeof window === 'undefined') return;

    // Carrega o script do GA4
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    // Inicializa o gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', measurementId, {
      page_title: 'AffiliateFlow Pro - Renda Recorrente IA',
      page_location: window.location.href,
      custom_map: {
        custom_parameter_1: 'nicho',
        custom_parameter_2: 'step'
      }
    });

    this.gaInitialized = true;
    console.log('✅ Google Analytics 4 inicializado');
  }

  // Inicialização do Facebook Pixel
  public initializeFacebookPixel(pixelId: string = '1234567890123456') {
    if (this.fbPixelInitialized || typeof window === 'undefined') return;

    // Facebook Pixel Code
    !function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function() {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    window.fbq('init', pixelId);
    window.fbq('track', 'PageView');

    this.fbPixelInitialized = true;
    console.log('✅ Facebook Pixel inicializado');
  }

  // Inicialização do Hotjar
  public initializeHotjar(hjid: number = 1234567, hjsv: number = 6) {
    if (this.hotjarInitialized || typeof window === 'undefined') return;

    (function(h: any, o: any, t: any, j: any, a?: any, r?: any) {
      h.hj = h.hj || function() {
        (h.hj.q = h.hj.q || []).push(arguments);
      };
      h._hjSettings = { hjid: hjid, hjsv: hjsv };
      a = o.getElementsByTagName('head')[0];
      r = o.createElement('script');
      r.async = 1;
      r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
      a.appendChild(r);
    })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');

    this.hotjarInitialized = true;
    console.log('✅ Hotjar inicializado');
  }

  // Tracking de eventos customizados
  public trackEvent(event: CustomEvent) {
    // Google Analytics 4
    if (this.gaInitialized && window.gtag) {
      window.gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        custom_parameter_1: event.nicho,
        custom_parameter_2: event.step
      });
    }

    // Facebook Pixel
    if (this.fbPixelInitialized && window.fbq) {
      window.fbq('trackCustom', event.action, {
        category: event.category,
        label: event.label,
        value: event.value,
        nicho: event.nicho,
        step: event.step
      });
    }

    console.log('📊 Evento rastreado:', event);
  }

  // Tracking de conversões
  public trackConversion(event: ConversionEvent) {
    // Google Analytics 4
    if (this.gaInitialized && window.gtag) {
      window.gtag('event', event.event_name, {
        currency: event.currency || 'BRL',
        value: event.value || 0,
        items: event.items || []
      });
    }

    // Facebook Pixel
    if (this.fbPixelInitialized && window.fbq) {
      if (event.event_name === 'purchase') {
        window.fbq('track', 'Purchase', {
          currency: event.currency || 'BRL',
          value: event.value || 0
        });
      } else if (event.event_name === 'lead') {
        window.fbq('track', 'Lead');
      } else if (event.event_name === 'complete_registration') {
        window.fbq('track', 'CompleteRegistration');
      }
    }

    console.log('💰 Conversão rastreada:', event);
  }

  // Identificação de usuário
  public identifyUser(userId: string, properties: Record<string, any> = {}) {
    // Google Analytics 4
    if (this.gaInitialized && window.gtag) {
      window.gtag('config', 'G-XXXXXXXXXX', {
        user_id: userId,
        custom_map: properties
      });
    }

    // Hotjar
    if (this.hotjarInitialized && window.hj) {
      window.hj('identify', userId, properties);
    }

    console.log('👤 Usuário identificado:', userId, properties);
  }

  // Tracking de páginas
  public trackPageView(page: string, title?: string) {
    // Google Analytics 4
    if (this.gaInitialized && window.gtag) {
      window.gtag('config', 'G-XXXXXXXXXX', {
        page_title: title || document.title,
        page_location: window.location.href,
        page_path: page
      });
    }

    // Facebook Pixel
    if (this.fbPixelInitialized && window.fbq) {
      window.fbq('track', 'PageView');
    }

    console.log('📄 Página rastreada:', page, title);
  }
}

// Eventos pré-definidos para o AffiliateFlow Pro
export const EVENTS = {
  // Funil de conversão
  LANDING_VIEW: 'landing_page_view',
  CTA_CLICK: 'cta_click',
  STEP_COMPLETE: 'step_complete',
  FORM_SUBMIT: 'form_submit',
  
  // Engajamento
  SCROLL_DEPTH: 'scroll_depth',
  TIME_ON_PAGE: 'time_on_page',
  VIDEO_PLAY: 'video_play',
  
  // Conversões
  LEAD_GENERATED: 'lead',
  REGISTRATION_COMPLETE: 'complete_registration',
  DOWNLOAD_START: 'download_start',
  VERIFICATION_COMPLETE: 'verification_complete',
  
  // Negócios
  AFFILIATE_LINK_CLICK: 'affiliate_link_click',
  MATERIAL_REQUEST: 'material_request',
  SUPPORT_CONTACT: 'support_contact'
} as const;

export default AnalyticsManager;

// Declarações globais para TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
    hj: (...args: any[]) => void;
  }
}