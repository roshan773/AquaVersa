/**
 * Consent-aware Google Analytics 4 Tracking Utility
 */

const CONSENT_KEY = "aquaguide_cookie_consent";

// Helper to check if user has accepted cookies
export function getCookieConsent(): "accepted" | "declined" | null {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem(CONSENT_KEY);
  return value as "accepted" | "declined" | null;
}

// Helper to set cookie consent
export function setCookieConsent(consent: "accepted" | "declined") {
  if (typeof window === "undefined") return;
  localStorage.setItem(CONSENT_KEY, consent);
  
  if (consent === "accepted") {
    // If accepted, initialize GA
    const gaId = process.env.NEXT_PUBLIC_GA_ID;
    if (gaId) {
      initGA(gaId);
    }
  } else {
    // If declined, disable tracking if script was loaded
    if (typeof window !== "undefined") {
      (window as any)[`ga-disable-${process.env.NEXT_PUBLIC_GA_ID}`] = true;
    }
  }
}

// Safe GA initialization
export function initGA(gaId: string) {
  if (typeof window === "undefined" || !gaId) return;

  // If already initialized, don't re-initialize
  if (document.getElementById("google-analytics-script")) return;

  // Double check consent
  if (getCookieConsent() !== "accepted") {
    // Force ga-disable to true just in case
    (window as any)[`ga-disable-${gaId}`] = true;
    return;
  }

  // Set ga-disable to false (enable tracking)
  (window as any)[`ga-disable-${gaId}`] = false;

  // Inject GA library script tag
  const scriptTag = document.createElement("script");
  scriptTag.id = "google-analytics-script";
  scriptTag.async = true;
  scriptTag.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(scriptTag);

  // Set up gtag global function
  const dataLayerScript = document.createElement("script");
  dataLayerScript.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${gaId}', { 'anonymize_ip': true });
  `;
  document.head.appendChild(dataLayerScript);
}

// Generic event tracking helper
export function trackEvent(eventName: string, params: Record<string, any> = {}) {
  if (typeof window === "undefined") return;
  
  // Make sure we have consent before sending events
  if (getCookieConsent() !== "accepted") {
    return;
  }

  const gtag = (window as any).gtag;
  if (typeof gtag === "function") {
    gtag("event", eventName, params);
  }
}

// Contextual track helpers
export function trackGuideOpened(type: "fish" | "plant" | "equipment", slug: string) {
  trackEvent("guide_opened", {
    guide_type: type,
    guide_slug: slug,
  });
}

export function trackSearchUsed(query: string) {
  trackEvent("search", {
    search_term: query,
  });
}

export function trackCtaClicked(ctaName: string, href: string) {
  trackEvent("cta_clicked", {
    cta_name: ctaName,
    destination: href,
  });
}

export function trackCompatibilityToolUsed(fish1: string, fish2: string, result: string) {
  trackEvent("compatibility_check", {
    fish_1: fish1,
    fish_2: fish2,
    compatibility_result: result,
  });
}

export function trackBeginnerGuideStarted() {
  trackEvent("beginner_guide_started");
}
