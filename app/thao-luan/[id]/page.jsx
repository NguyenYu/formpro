'use client'

import Link from 'next/link'
import { ArrowLeft, Bookmark, Heart, Send, Share2 } from 'lucide-react'
import { useState } from 'react'

const post = {
  author: 'Minh Anh',
  initials: 'MA',
  time: '2 giờ trước',
  title: 'Làm thế nào để xây dựng thói quen làm việc sâu?',
  tags: ['Năng suất', 'Thói quen'],
  paragraphs: [
    'Sau một thời gian làm việc phân tán, mình bắt đầu tìm hiểu về deep work và muốn biến nó thành một thói quen bền vững. Mình đã thử tắt thông báo, chia nhỏ lịch làm việc và để điện thoại ở phòng khác.',
    'Điều hiệu quả nhất với mình là đặt một mục tiêu thật cụ thể cho mỗi phiên 90 phút, thay vì chỉ ghi chung chung là “làm dự án”. Mình rất muốn nghe thêm kinh nghiệm của mọi người: đâu là nghi thức bắt đầu giúp bạn vào guồng nhanh hơn?',
  ],
}

const initialComments = [
  { id: 1, author: 'Bảo Ngọc', initials: 'BN', time: '1 giờ trước', text: 'Mình cũng thấy việc đặt mục tiêu cụ thể giúp bắt đầu dễ hơn rất nhiều.', replies: [] },
  { id: 2, author: 'Đức Minh', initials: 'ĐM', time: '48 phút trước', text: 'Một mẹo nhỏ là tạo một danh sách “không làm” trong lúc deep work.', replies: [{ id: 3, author: 'Minh Anh', initials: 'MA', time: '30 phút trước', text: 'Danh sách “không làm” hay quá, mình sẽ thử ngay hôm nay.', replies: [] }] },
]

function Avatar({ initials, small = false }) {
  return <div className={`flex shrink-0 items-center justify-center rounded-full bg-pink-200 font-bold text-pink-700 ${small ? 'size-9 text-xs' : 'size-10 text-xs'}`} aria-hidden="true">{initials}</div>
}

function Comment({ comment, activeReply, setActiveReply }) {
  const replyOpen = activeReply === comment.id

  return (
    <div>
      <div className="flex gap-3">
        <Avatar initials={comment.initials} small />
        <div className="min-w-0 flex-1">
          <div className="rounded-xl border border-white/30 bg-white/40 p-4 shadow-sm dark:border-white/5 dark:bg-pink-950/30">
            <div className="flex items-start justify-between gap-3">
              <strong className="text-sm">{comment.author}</strong>
              <span className="shrink-0 text-xs text-pink-700/60 dark:text-pink-200/60">{comment.time}</span>
            </div>
            <p className="mt-2 text-sm leading-6 text-pink-950/75 dark:text-pink-50/75">{comment.text}</p>
            <button type="button" onClick={() => setActiveReply(replyOpen ? null : comment.id)} className="mt-3 text-xs font-bold text-pink-700 transition hover:text-pink-500 dark:text-pink-300">Phản hồi</button>
          </div>
          {replyOpen && <form className="mt-3 flex rounded-full bg-white pr-1 shadow-inner dark:bg-pink-950" onSubmit={(event) => { event.preventDefault(); setActiveReply(null) }}><input required className="min-w-0 flex-1 rounded-full bg-transparent px-4 py-2 text-sm outline-none placeholder:text-pink-700/50 dark:placeholder:text-pink-200/50" placeholder={`Phản hồi ${comment.author}...`} aria-label={`Phản hồi ${comment.author}`} /><button type="submit" className="flex size-9 shrink-0 items-center justify-center rounded-full bg-pink-500 text-white transition hover:bg-pink-600" aria-label="Gửi phản hồi"><Send /></button></form>}
        </div>
      </div>
      {comment.replies?.length > 0 && <div className="ml-10 mt-3 flex flex-col gap-3 border-l-4 border-pink-400 pl-4 dark:border-pink-600 md:ml-14">{comment.replies.map((reply) => <Comment key={reply.id} comment={reply} activeReply={activeReply} setActiveReply={setActiveReply} />)}</div>}
    </div>
  )
}

export default function DiscussionDetailPage() {
  const [comments, setComments] = useState(initialComments)
  const [activeReply, setActiveReply] = useState(null)
  const [text, setText] = useState('')
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)

  const submit = (event) => {
    event.preventDefault()
    if (!text.trim()) return
    setComments((current) => [{ id: Date.now(), author: 'Bạn', initials: 'B', time: 'Vừa xong', text: text.trim(), replies: [] }, ...current])
    setText('')
  }

  return <main className="min-h-screen px-4 py-8 text-pink-950 dark:text-pink-50 sm:px-8"><div className="mx-auto max-w-4xl">
    <Link href="/thao-luan" className="mb-6 inline-flex items-center gap-2 rounded-xl bg-white/60 px-4 py-2 text-sm font-semibold text-pink-700 shadow backdrop-blur transition hover:text-pink-500 dark:bg-pink-950/60"><ArrowLeft data-icon="inline-start" /> Quay lại diễn đàn</Link>
    <article className="rounded-3xl border border-white/50 bg-white/50 p-6 shadow-xl backdrop-blur-xl dark:border-pink-800/50 dark:bg-pink-900/60 sm:p-10">
      <div className="flex items-center gap-3"><Avatar initials={post.initials} /><div><strong className="text-sm">{post.author}</strong><p className="text-xs text-pink-700/60 dark:text-pink-200/60">{post.time} · Cộng đồng</p></div></div>
      <h1 className="mt-6 text-3xl font-bold leading-tight sm:text-5xl">{post.title}</h1>
      <div className="mt-5 flex flex-wrap gap-2">{post.tags.map((tag) => <span key={tag} className="rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-700 dark:bg-pink-800/60 dark:text-pink-100">#{tag}</span>)}</div>
      <div className="mt-8 flex flex-col gap-5 text-base leading-8 text-pink-950/80 dark:text-pink-50/80">{post.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      <div className="mt-6 flex flex-wrap gap-3 border-t border-pink-200/50 pt-4 dark:border-pink-800/50"><button type="button" onClick={() => setLiked(!liked)} className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${liked ? 'bg-pink-500 text-white' : 'bg-pink-100 text-pink-700 hover:bg-pink-200 dark:bg-pink-900/50 dark:text-pink-300 dark:hover:bg-pink-800'}`}><Heart fill={liked ? 'currentColor' : 'none'} /> Thích</button><button type="button" onClick={() => setSaved(!saved)} className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${saved ? 'bg-pink-500 text-white' : 'bg-pink-100 text-pink-700 hover:bg-pink-200 dark:bg-pink-900/50 dark:text-pink-300 dark:hover:bg-pink-800'}`}><Bookmark fill={saved ? 'currentColor' : 'none'} /> Lưu</button><button type="button" className="inline-flex items-center gap-2 rounded-full bg-pink-100 px-4 py-2 text-sm font-medium text-pink-700 transition hover:bg-pink-200 dark:bg-pink-900/50 dark:text-pink-300 dark:hover:bg-pink-800"><Share2 /> Chia sẻ</button></div>
      <section><h3 className="mt-10 mb-6 border-b border-pink-200/50 pb-2 text-xl font-bold dark:border-pink-800/50">Bình luận <span className="text-pink-500">({comments.length})</span></h3><form onSubmit={submit} className="mb-8 flex gap-3"><Avatar initials="B" /><div className="flex min-w-0 flex-1 rounded-full bg-white pr-1 shadow-inner dark:bg-pink-950"><input value={text} onChange={(event) => setText(event.target.value)} className="min-w-0 flex-1 rounded-full bg-transparent px-4 py-2 text-sm outline-none placeholder:text-pink-700/50 dark:placeholder:text-pink-200/50" placeholder="Chia sẻ suy nghĩ của bạn..." aria-label="Viết bình luận" /><button type="submit" className="flex size-9 shrink-0 items-center justify-center rounded-full bg-pink-500 text-white transition hover:bg-pink-600" aria-label="Gửi bình luận"><Send /></button></div></form><div className="flex flex-col gap-5">{comments.map((comment) => <Comment key={comment.id} comment={comment} activeReply={activeReply} setActiveReply={setActiveReply} />)}</div></section>
    </article>
  </div></main>
}
