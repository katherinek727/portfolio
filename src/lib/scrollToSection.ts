import type { MouseEvent } from 'react';

const NAV_SCROLL_GAP = 16;

export function getNavOffset(): number {
  const nav = document.querySelector('.navbar-dark-custom');
  return (nav?.getBoundingClientRect().height ?? 72) + NAV_SCROLL_GAP;
}

export function scrollToSection(id: string): boolean {
  const el = document.getElementById(id);
  if (!el) return false;

  const top = el.getBoundingClientRect().top + window.scrollY - getNavOffset();
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  return true;
}

export function getSectionIdFromHref(href: string): string {
  return href.replace(/^#/, '');
}

export function handleSectionNavClick(
  event: MouseEvent<HTMLElement>,
  href: string,
  onAfterScroll?: (sectionId: string) => void,
): void {
  event.preventDefault();
  const sectionId = getSectionIdFromHref(href);
  if (scrollToSection(sectionId)) {
    onAfterScroll?.(sectionId);
  }
}
