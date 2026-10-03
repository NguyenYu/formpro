'use client'

import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const saved = window.localStorage.getItem('formly-theme')
    const isDark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
    document.documentElement.classList.toggle('dark', isDark)
    document.documentElement.classList.toggle('light', !isDark)
    setDark(isDark)
  }, [])

  const toggle = () => {
    const next = !dark
    document.documentElement.classList.toggle('dark', next)
    document.documentElement.classList.toggle('light', !next)
    window.localStorage.setItem('formly-theme', next ? 'dark' : 'light')
    setDark(next)
  }

  return <button type="button" onClick={toggle} className="inline-flex size-10 items-center justify-center rounded-xl border border-border bg-background text-muted-foreground transition hover:bg-accent hover:text-foreground" aria-label={dark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'} title={dark ? 'Giao diện sáng' : 'Giao diện tối'}>{dark ? <Sun size={17} /> : <Moon size={17} />}</button>
}
