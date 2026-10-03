import Link from 'next/link'
import { ArrowUpRight, BriefcaseBusiness, FileSignature, GraduationCap, Landmark, UserRound, WalletCards } from 'lucide-react'

const icons = { briefcase: BriefcaseBusiness, landmark: Landmark, 'file-signature': FileSignature, 'wallet-cards': WalletCards, 'user-round': UserRound, 'graduation-cap': GraduationCap }

export function CategoryCard({ category }) {
  const Icon = icons[category.icon] || FileSignature
  return <Link href={`/templates/${category.id}`} className="group flex min-h-52 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100">
    <div className="flex items-start justify-between"><span className="flex size-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition-colors group-hover:bg-blue-50 group-hover:text-blue-700"><Icon size={21} strokeWidth={1.8} /></span><ArrowUpRight size={18} className="text-slate-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-slate-700" /></div>
    <div className="mt-auto"><h3 className="text-base font-semibold tracking-tight text-slate-900">{category.title}</h3><p className="mt-1.5 max-w-[250px] text-sm leading-5 text-slate-500">{category.description}</p><p className="mt-4 text-xs font-medium text-slate-400">{category.count} biểu mẫu</p></div>
  </Link>
}
