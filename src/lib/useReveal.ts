import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Adds the `in` class to every `.reveal` element as it scrolls into view.
 * threshold 0 → works for very tall sections (long card lists on phones),
 * and a fallback reveals everything if the observer never fires (some in-app / embedded browsers).
 */
export function useReveal() {
  const { pathname } = useLocation()
  useEffect(() => {
    const showAll = () => document.querySelectorAll<HTMLElement>('.reveal:not(.in)').forEach((e) => e.classList.add('in'))
    if (!('IntersectionObserver' in window)) { showAll(); return }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } })
    }, { threshold: 0, rootMargin: '0px 0px -24px 0px' })
    const watch = () => document.querySelectorAll<HTMLElement>('.reveal:not(.in)').forEach((e) => io.observe(e))
    watch()
    const mo = new MutationObserver(watch)
    mo.observe(document.body, { childList: true, subtree: true })
    const t = window.setTimeout(showAll, 2500)
    return () => { io.disconnect(); mo.disconnect(); clearTimeout(t) }
  }, [pathname])
}
