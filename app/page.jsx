'use client'

import { useMemo, useState } from 'react'
import { ArrowRight, FileCheck2, LayoutGrid } from 'lucide-react'
import { categories } from '@/data/mockData'
import { AppHeader } from '@/components/app-header'
import { CategoryCard } from '@/components/category-card'

export default function HomePage() {
  const [search, setSearch] = useState('')
  const filteredCategories = useMemo(() => categories.filter((category) => `${category.title} ${category.description}`.toLowerCase().includes(search.toLowerCase())), [search])
  return <div className="min-h-screen bg-pink-50/40 text-pink-950"><AppHeader searchValue={search} onSearch={setSearch} /><main className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
    <section className="relative overflow-hidden py-14 sm:py-20"><div className="pointer-events-none absolute -right-32 -top-20 size-80 rounded-full bg-pink-200/70 blur-3xl" /><div className="relative max-w-2xl"><div className="mb-5 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-pink-100 px-3 py-1.5 text-xs font-semibold text-pink-700"><FileCheck2 size={14} /> Tạo tài liệu trong vài phút</div><h1 className="text-4xl font-semibold tracking-[-0.04em] text-pink-950 sm:text-6xl sm:leading-[1.05]">Biểu mẫu chuẩn.<br /><span className="text-pink-300">Công việc nhẹ nhàng.</span></h1><p className="mt-6 max-w-lg text-base leading-7 text-pink-700/70 sm:text-lg">Chọn một danh mục, điền thông tin và nhận ngay tài liệu được trình bày chuyên nghiệp.</p></div></section>
    <section aria-labelledby="category-heading"><div className="mb-5 flex items-end justify-between"><div><div className="flex items-center gap-2 text-sm font-semibold text-slate-900"><LayoutGrid size={17} /> Danh mục biểu mẫu</div><h2 id="category-heading" className="mt-1 text-sm text-pink-700/70">Chọn loại tài liệu bạn đang cần</h2></div><span className="hidden text-xs text-pink-300 sm:block">{filteredCategories.length} danh mục</span></div>{filteredCategories.length ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{filteredCategories.map((category) => <CategoryCard key={category.id} category={category} />)}</div> : <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center text-sm text-pink-700/70">Không tìm thấy danh mục phù hợp. <button onClick={() => setSearch('')} className="font-semibold text-pink-700 hover:underline">Xóa tìm kiếm</button></div>}</section>
    <div className="mt-14 flex items-center justify-between rounded-2xl border border-white/50 bg-pink-900/40 shadow-2xl backdrop-blur-xl px-6 py-5 text-white sm:px-8"><div><p className="text-sm font-semibold">Bạn không tìm thấy mẫu phù hợp?</p><p className="mt-1 text-xs text-pink-300">Mẫu mới được cập nhật thường xuyên.</p></div><ArrowRight size={19} className="text-pink-300" /></div>
  </main></div>
}
