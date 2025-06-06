export function isMobile() {
  // Enhanced mobile detection using sm: breakpoint (640px) and touch capability
  if (typeof globalThis === 'undefined' || !globalThis.innerWidth) {
    return false;
  }
  
  const isMobileWidth = globalThis.innerWidth < 640;
  const isTouchDevice = 'ontouchstart' in globalThis || navigator.maxTouchPoints > 0;
  
  return isMobileWidth || (isTouchDevice && globalThis.innerWidth < 768);
}

export function isTablet() {
  // Tablet detection for medium screens (768px - 1024px)
  if (typeof globalThis === 'undefined' || !globalThis.innerWidth) {
    return false;
  }
  
  return globalThis.innerWidth >= 768 && globalThis.innerWidth < 1024;
}

export function isDesktop() {
  // Desktop detection for large screens (1024px+)
  if (typeof globalThis === 'undefined' || !globalThis.innerWidth) {
    return true; // Default to desktop for SSR
  }
  
  return globalThis.innerWidth >= 1024;
}

export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (isMobile()) return 'mobile';
  if (isTablet()) return 'tablet';
  return 'desktop';
}
