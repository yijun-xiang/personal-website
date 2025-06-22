
declare global {
    interface Window {
      gtag: (command: string, targetId: string, config?: Record<string, unknown>) => void;
    }
  }
  
  export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;
  
  export const isAnalyticsEnabled = GA_TRACKING_ID && process.env.NODE_ENV === 'production';
  
  export const pageview = (url: string) => {
    if (!isAnalyticsEnabled) return;
    
    window.gtag('config', GA_TRACKING_ID!, {
      page_path: url,
    });
  };
  
  export const event = ({
    action,
    category,
    label,
    value,
  }: {
    action: string;
    category: string;
    label?: string;
    value?: number;
  }) => {
    if (!isAnalyticsEnabled) return;
    
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  };
  
  export const trackEvent = {
    socialClick: (platform: 'email' | 'linkedin' | 'github') => {
      event({
        action: 'click',
        category: 'social',
        label: platform,
      });
    },
    
    navigationClick: (destination: string) => {
      event({
        action: 'click',
        category: 'navigation',
        label: destination,
      });
    },
    
    chatInteraction: (action: 'send_message' | 'start_chat') => {
      event({
        action: action,
        category: 'chat',
        label: 'ai_assistant',
      });
    },
    
    mapInteraction: (action: 'select_location' | 'view_details') => {
      event({
        action: action,
        category: 'travel_map',
      });
    },
    
    projectView: (projectName: string) => {
      event({
        action: 'view',
        category: 'project',
        label: projectName,
      });
    },
  };