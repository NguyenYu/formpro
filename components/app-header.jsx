'use client'

import Link from 'next/link'
import { FileText, Search, Sparkles } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'

export function AppHeader({ searchValue = '', onSearch }) {
  return (
    <header className="sticky top-0 z-20 border-b border-border/80 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center gap-4 px-5 sm:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5" aria-label="Formly trang chủ">
          <span className="flex size-9 items-center justify-center rounded-xl bg-slate-950 text-white shadow-sm transition-transform group-hover:-rotate-6"><FileText size={18} /></span>
          <span className="text-lg font-semibold tracking-tight text-slate-950">Formly</span>
        </Link>
        <div className="ml-auto flex max-w-md flex-1 items-center rounded-xl border border-slate-200 bg-slate-50/80 px-3 text-slate-400 transition-colors focus-within:border-slate-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-slate-100">
          <Search size={17} aria-hidden="true" />
          <input value={searchValue} onChange={(event) => onSearch?.(event.target.value)} placeholder="Tìm kiếm biểu mẫu..." className="w-full bg-transparent px-2.5 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400" aria-label="Tìm kiếm biểu mẫu" />
          <kbd className="hidden rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-400 sm:block">⌘ K</kbd>
        </div>
        <div className="hidden items-center gap-2 pl-2 text-xs font-medium text-muted-foreground md:flex"><Sparkles size={15} className="text-primary" /> Soạn thảo thông minh</div>
        <ThemeToggle />
      </div>
    </header>
  )
}

export function PageShell({ children, ...headerProps }) {
  return <div className="min-h-screen bg-slate-50 text-slate-950"><AppHeader {...headerProps} />{children}</div>
}
