/**
 * Hook personalizado para Analytics
 * Integração com React para tracking automático
 */

import { useEffect, useRef } from 'react';
import AnalyticsManager, { CustomEvent, ConversionEvent, EVENTS } from '../utils/analytics';

interface UseAnalyticsOptions {
  userId?: string;
  nicho?: string;
  autoTrackPageViews?: boolean;
  autoTrackScrollDepth?: boolean;
  autoTrackTimeOnPage?: boolean;
}

export const useAnalytics = (options: UseAnalyticsOptions = {}) => {
  const analyticsManager = AnalyticsManager.getInstance();
  const timeOnPageStart = useRef<number>(Date.now());
  const maxScrollDepth = useRef<number>(0);
  const scrollDepthTracked = useRef<Set<number>>(new Set());

  useEffect(() => {
    // Inicializar analytics
    analyticsManager.initializeGA4();
    analyticsManager.initializeFacebookPixel();
    analyticsManager.initializeHotjar();

    // Identificar usuário se fornecido
    if (options.userId) {
      analyticsManager.identifyUser(options.userId, {
        nicho: options.nicho
      });
    }

    // Auto-track page views
    if (options.autoTrackPageViews !== false) {
      analyticsManager.trackPageView(window.location.pathname, document.title);
    }

    // Auto-track scroll depth
    if (options.autoTrackScrollDepth !== false) {
      const handleScroll = () => {
        const scrollPercent = Math.round(
          (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );
        
        maxScrollDepth.current = Math.max(maxScrollDepth.current, scrollPercent);

        // Track milestones: 25%, 50%, 75%, 90%
        const milestones = [25, 50, 75, 90];
        for (const milestone of milestones) {
          if (scrollPercent >= milestone && !scrollDepthTracked.current.has(milestone)) {
            scrollDepthTracked.current.add(milestone);
            trackEvent({
              action: EVENTS.SCROLL_DEPTH,
              category: 'engagement',
              label: `${milestone}%`,
              value: milestone,
              nicho: options.nicho
            });
          }
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        
        // Track time on page when component unmounts
        if (options.autoTrackTimeOnPage !== false) {
          const timeOnPage = Math.round((Date.now() - timeOnPageStart.current) / 1000);
          trackEvent({
            action: EVENTS.TIME_ON_PAGE,
            category: 'engagement',
            label: 'session_duration',
            value: timeOnPage,
            nicho: options.nicho
          });
        }
      };
    }
  }, [options.userId, options.nicho]);

  const trackEvent = (event: CustomEvent) => {
    analyticsManager.trackEvent(event);
  };

  const trackConversion = (event: ConversionEvent) => {
    analyticsManager.trackConversion(event);
  };

  const trackPageView = (page: string, title?: string) => {
    analyticsManager.trackPageView(page, title);
  };

  // Eventos específicos do AffiliateFlow Pro
  const trackLandingView = (nicho?: string) => {
    trackEvent({
      action: EVENTS.LANDING_VIEW,
      category: 'funnel',
      label: 'landing_page',
      nicho: nicho
    });
  };

  const trackCTAClick = (ctaText: string, position: string, nicho?: string) => {
    trackEvent({
      action: EVENTS.CTA_CLICK,
      category: 'funnel',
      label: `${ctaText}_${position}`,
      nicho: nicho
    });
  };

  const trackStepComplete = (stepNumber: number, stepName: string, nicho?: string) => {
    trackEvent({
      action: EVENTS.STEP_COMPLETE,
      category: 'funnel',
      label: stepName,
      value: stepNumber,
      step: stepNumber,
      nicho: nicho
    });

    // Também track como conversão
    trackConversion({
      event_name: 'step_complete',
      value: stepNumber,
      items: [{
        item_id: `step_${stepNumber}`,
        item_name: stepName,
        category: 'funnel_step',
        quantity: 1,
        price: 0
      }]
    });
  };

  const trackFormSubmit = (formName: string, nicho?: string) => {
    trackEvent({
      action: EVENTS.FORM_SUBMIT,
      category: 'lead_generation',
      label: formName,
      nicho: nicho
    });

    trackConversion({
      event_name: 'lead',
      items: [{
        item_id: formName,
        item_name: 'Lead Form Submission',
        category: 'lead_generation',
        quantity: 1,
        price: 0
      }]
    });
  };

  const trackLeadGenerated = (email: string, nicho?: string, source?: string) => {
    trackEvent({
      action: EVENTS.LEAD_GENERATED,
      category: 'conversion',
      label: source || 'organic',
      nicho: nicho
    });

    trackConversion({
      event_name: 'lead',
      value: 1,
      items: [{
        item_id: 'lead_generation',
        item_name: 'New Lead',
        category: 'conversion',
        quantity: 1,
        price: 0
      }]
    });
  };

  const trackRegistrationComplete = (nicho?: string) => {
    trackEvent({
      action: EVENTS.REGISTRATION_COMPLETE,
      category: 'conversion',
      label: 'registration',
      nicho: nicho
    });

    trackConversion({
      event_name: 'complete_registration',
      value: 1
    });
  };

  const trackDownloadStart = (downloadType: string, nicho?: string) => {
    trackEvent({
      action: EVENTS.DOWNLOAD_START,
      category: 'engagement',
      label: downloadType,
      nicho: nicho
    });
  };

  const trackVerificationComplete = (nicho?: string) => {
    trackEvent({
      action: EVENTS.VERIFICATION_COMPLETE,
      category: 'funnel',
      label: 'verification',
      nicho: nicho
    });
  };

  const trackAffiliateLinkClick = (linkType: string, nicho?: string) => {
    trackEvent({
      action: EVENTS.AFFILIATE_LINK_CLICK,
      category: 'monetization',
      label: linkType,
      nicho: nicho
    });
  };

  const trackMaterialRequest = (materialType: string, nicho?: string) => {
    trackEvent({
      action: EVENTS.MATERIAL_REQUEST,
      category: 'engagement',
      label: materialType,
      nicho: nicho
    });
  };

  const trackVideoPlay = (videoName: string, nicho?: string) => {
    trackEvent({
      action: EVENTS.VIDEO_PLAY,
      category: 'engagement',
      label: videoName,
      nicho: nicho
    });
  };

  const trackSupportContact = (contactType: string, nicho?: string) => {
    trackEvent({
      action: EVENTS.SUPPORT_CONTACT,
      category: 'support',
      label: contactType,
      nicho: nicho
    });
  };

  return {
    // Métodos básicos
    trackEvent,
    trackConversion,
    trackPageView,
    
    // Métodos específicos do AffiliateFlow Pro
    trackLandingView,
    trackCTAClick,
    trackStepComplete,
    trackFormSubmit,
    trackLeadGenerated,
    trackRegistrationComplete,
    trackDownloadStart,
    trackVerificationComplete,
    trackAffiliateLinkClick,
    trackMaterialRequest,
    trackVideoPlay,
    trackSupportContact,
    
    // Dados de sessão
    getMaxScrollDepth: () => maxScrollDepth.current,
    getTimeOnPage: () => Math.round((Date.now() - timeOnPageStart.current) / 1000)
  };
};

// Hook para tracking de formulários
export const useFormTracking = (formName: string, nicho?: string) => {
  const { trackFormSubmit, trackEvent } = useAnalytics({ nicho });

  const trackFormStart = () => {
    trackEvent({
      action: 'form_start',
      category: 'lead_generation',
      label: formName,
      nicho: nicho
    });
  };

  const trackFormFieldFocus = (fieldName: string) => {
    trackEvent({
      action: 'form_field_focus',
      category: 'lead_generation',
      label: `${formName}_${fieldName}`,
      nicho: nicho
    });
  };

  const trackFormError = (errorType: string) => {
    trackEvent({
      action: 'form_error',
      category: 'lead_generation',
      label: `${formName}_${errorType}`,
      nicho: nicho
    });
  };

  const trackFormSubmitSuccess = () => {
    trackFormSubmit(formName, nicho);
  };

  return {
    trackFormStart,
    trackFormFieldFocus,
    trackFormError,
    trackFormSubmitSuccess
  };
};

// Hook para tracking de elementos específicos
export const useElementTracking = (elementName: string, nicho?: string) => {
  const { trackEvent } = useAnalytics({ nicho });

  const trackElementView = () => {
    trackEvent({
      action: 'element_view',
      category: 'engagement',
      label: elementName,
      nicho: nicho
    });
  };

  const trackElementClick = () => {
    trackEvent({
      action: 'element_click',
      category: 'engagement',
      label: elementName,
      nicho: nicho
    });
  };

  const trackElementHover = () => {
    trackEvent({
      action: 'element_hover',
      category: 'engagement',
      label: elementName,
      nicho: nicho
    });
  };

  return {
    trackElementView,
    trackElementClick,
    trackElementHover
  };
};