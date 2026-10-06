'use client'

import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowUp,
  Check,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Send,
  Share2,
  Tag,
  X,
} from 'lucide-react'

const posts = [
  {
    id: 1,
    author: 'Minh Anh',
    initials: 'MA',
    tone: 'bg-rose-200 text-rose-700',
    time: '2 giờ trước',
    title: 'Làm thế nào để xây dựng thói quen làm việc sâu?',
    excerpt: 'Mình đang thử nhiều phương pháp để tập trung hơn trong ngày. Mọi người thường bắt đầu một phiên làm việc sâu như thế nào?',
    content: 'Sau một thời gian làm việc phân tán, mình bắt đầu tìm hiểu về deep work và muốn biến nó thành một thói quen bền vững. Mình đã thử tắt thông báo, chia nhỏ lịch làm việc và để điện thoại ở phòng khác.\n\nĐiều hiệu quả nhất với mình là đặt một mục tiêu thật cụ thể cho mỗi phiên 90 phút, thay vì chỉ ghi chung chung là “làm dự án”. Mình rất muốn nghe thêm kinh nghiệm của mọi người: đâu là nghi thức bắt đầu giúp bạn vào guồng nhanh hơn?',
    tags: ['Năng suất', 'Thói quen'],
    votes: 128,
    comments: 24,
  },
  {
    id: 2,
    author: 'Quang Huy',
    initials: 'QH',
    tone: 'bg-violet-200 text-violet-700',
    time: '5 giờ trước',
    title: 'Công cụ nào giúp bạn quản lý dự án cá nhân?',
    excerpt: 'Mình đang tìm một cách đơn giản để theo dõi các dự án nhỏ mà không biến việc quản lý thành một dự án khác.',
    content: 'Mình thường có từ ba đến bốn dự án cá nhân cùng lúc, nhưng việc chuyển qua lại giữa các công cụ khiến mình mất khá nhiều năng lượng. Gần đây mình quay về với một bảng đơn giản gồm ba cột: Việc cần làm, Đang thực hiện và Hoàn thành.\n\nCách này đủ trực quan để mình duy trì mỗi ngày. Tuy nhiên, mình vẫn muốn biết cộng đồng đang dùng công cụ nào cho những dự án dài hơi hơn.',
    tags: ['Công cụ', 'Quản lý'],
    votes: 86,
    comments: 16,
  },
  {
    id: 3,
    author: 'Thu Hà',
    initials: 'TH',
    tone: 'bg-amber-200 text-amber-800',
    time: 'Hôm qua',
    title: 'Chia sẻ góc làm việc nhỏ nhưng nhiều cảm hứng',
    excerpt: 'Không gian không cần quá lớn. Đây là vài thay đổi nhỏ giúp góc làm việc của mình sáng sủa và dễ tập trung hơn.',
    content: 'Góc làm việc của mình chỉ rộng khoảng một mét vuông, nhưng sau vài thay đổi nhỏ, mình thấy muốn ngồi vào bàn hơn rất nhiều. Mình dọn hết những món không sử dụng, thêm một chiếc đèn ánh sáng ấm và đặt một chậu cây nhỏ bên cạnh màn hình.\n\nMình nhận ra cảm giác dễ chịu của không gian ảnh hưởng khá rõ đến cách mình bắt đầu ngày mới. Nếu bạn cũng có một góc làm việc yêu thích, hãy chia sẻ ảnh hoặc mẹo nhỏ nhé.',
    tags: ['Không gian', 'Cảm hứng'],
    votes: 64,
    comments: 9,
  },
]

const initialComments = [
  { id: 1, author: 'Bảo Ngọc', initials: 'BN', tone: 'bg-sky-200 text-sky-700', time: '1 giờ trước', text: 'Mình cũng thấy việc đặt mục tiêu cụ thể giúp bắt đầu dễ hơn rất nhiều. Mỗi sáng mình thường viết đúng một câu mô tả kết quả cần đạt được.', likes: 12 },
  { id: 2, author: 'Đức Minh', initials: 'ĐM', tone: 'bg-emerald-200 text-emerald-700', time: '48 phút trước', text: 'Một mẹo nhỏ của mình là tạo một danh sách “không làm” trong lúc deep work. Những việc phát sinh sẽ được ghi lại để xử lý sau.', likes: 8, replies: [{ id: 3, author: 'Minh Anh', initials: 'MA', tone: 'bg-rose-200 text-rose-700', time: '30 phút trước', text: 'Danh sách “không làm” hay quá, mình sẽ thử ngay hôm nay. Cảm ơn bạn đã chia sẻ!', likes: 4 }] },
]

function Avatar({ initials, tone, className = '' }) {
  return <div className={`flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-bold ${tone} ${className}`} aria-hidden="true">{initials}</div>
}

function Glass({ children, className = '' }) {
  return <div className={`bg-white/40 dark:bg-pink-900/40 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-2xl rounded-3xl ${className}`}>{children}</div>
}

function PostCard({ post, onOpen }) {
  return <button type="button" onClick={() => onOpen(post)} className="group w-full text-left rounded-2xl bg-white/60 dark:bg-pink-950/40 border border-white/50 dark:border-white/20 p-5 transition hover:-translate-y-0.5 hover:border-pink-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 sm:p-6">
    <div className="flex items-start gap-3"><Avatar initials={post.initials} tone={post.tone} /><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-pink-950 dark:text-pink-50"><span>{post.author}</span><span className="text-xs font-normal text-pink-700/60 dark:text-pink-200/60">{post.time}</span></div><h3 className="mt-2 text-lg font-bold tracking-tight text-pink-950 transition group-hover:text-pink-600 dark:text-white dark:group-hover:text-pink-300">{post.title}</h3></div><MoreHorizontal className="text-pink-700/50" aria-label="Thêm tùy chọn" /></div>
    <p className="mt-3 line-clamp-2 text-sm leading-6 text-pink-950/65 dark:text-pink-100/65">{post.excerpt}</p>
    <div className="mt-5 flex flex-wrap items-center gap-2"><div className="flex flex-1 flex-wrap gap-2">{post.tags.map((tag) => <span key={tag} className="rounded-full bg-pink-100/80 px-3 py-1 text-xs font-semibold text-pink-700 dark:bg-pink-800/60 dark:text-pink-100"><Tag className="mr-1 inline size-3" />{tag}</span>)}</div><span className="text-xs font-medium text-pink-700/60 dark:text-pink-100/60"><ArrowUp className="mr-1 inline size-4" />{post.votes}</span><span className="text-xs font-medium text-pink-700/60 dark:text-pink-100/60"><MessageCircle className="mr-1 inline size-4" />{post.comments}</span></div>
  </button>
}

function CreatePostDialog({ onClose }) {
  const [submitted, setSubmitted] = useState(false)
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-pink-950/40 p-4 backdrop-blur-sm" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><div role="dialog" aria-modal="true" aria-labelledby="create-title" className="w-full max-w-xl rounded-3xl border border-white/50 bg-pink-50/95 p-6 shadow-2xl dark:border-white/10 dark:bg-pink-950/95 sm:p-8"><div className="flex items-start justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-pink-500">Bài viết mới</p><h2 id="create-title" className="mt-2 text-2xl font-bold text-pink-950 dark:text-white">Chia sẻ với cộng đồng</h2></div><button type="button" onClick={onClose} className="rounded-full p-2 text-pink-700 hover:bg-pink-200/70" aria-label="Đóng"><X /></button></div>{submitted ? <div className="flex flex-col items-center gap-3 py-12 text-center"><div className="flex size-14 items-center justify-center rounded-full bg-pink-500 text-white"><Check /></div><h3 className="text-lg font-bold text-pink-950 dark:text-white">Bài viết đã được tạo</h3><p className="text-sm text-pink-900/60 dark:text-pink-100/60">Cảm ơn bạn đã đóng góp cho cuộc trò chuyện.</p><button type="button" onClick={onClose} className="mt-3 rounded-xl bg-pink-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-pink-600">Đóng</button></div> : <form onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }} className="mt-7 flex flex-col gap-5"><label className="flex flex-col gap-2 text-sm font-semibold text-pink-950 dark:text-pink-50">Tiêu đề<input required placeholder="Bạn muốn thảo luận điều gì?" className="rounded-xl border border-white/50 bg-white/60 px-4 py-3 font-normal outline-none placeholder:text-pink-900/40 focus:ring-2 focus:ring-pink-400 dark:border-white/20 dark:bg-pink-950/40 dark:text-white" /></label><label className="flex flex-col gap-2 text-sm font-semibold text-pink-950 dark:text-pink-50">Nội dung<textarea required rows={5} placeholder="Viết suy nghĩ của bạn..." className="resize-none rounded-xl border border-white/50 bg-white/60 px-4 py-3 font-normal outline-none placeholder:text-pink-900/40 focus:ring-2 focus:ring-pink-400 dark:border-white/20 dark:bg-pink-950/40 dark:text-white" /></label><label className="flex flex-col gap-2 text-sm font-semibold text-pink-950 dark:text-pink-50">Thẻ<input placeholder="Ví dụ: Năng suất, Công cụ" className="rounded-xl border border-white/50 bg-white/60 px-4 py-3 font-normal outline-none placeholder:text-pink-900/40 focus:ring-2 focus:ring-pink-400 dark:border-white/20 dark:bg-pink-950/40 dark:text-white" /></label><button type="submit" className="rounded-xl bg-pink-500 py-3 font-semibold text-white hover:bg-pink-600">Đăng bài</button></form>}</div></div>
}

function Comment({ comment, onLike }) {
  return <div><div className="flex gap-3"><Avatar initials={comment.initials} tone={comment.tone} className="size-9" /><div className="min-w-0 flex-1"><div className="rounded-2xl bg-white/60 px-4 py-3 dark:bg-pink-950/40"><div className="flex items-center justify-between gap-3"><span className="text-sm font-bold text-pink-950 dark:text-pink-50">{comment.author}</span><span className="text-xs text-pink-700/50 dark:text-pink-100/50">{comment.time}</span></div><p className="mt-1 text-sm leading-6 text-pink-950/75 dark:text-pink-50/75">{comment.text}</p></div><div className="mt-1 flex items-center gap-4 px-3 text-xs font-semibold text-pink-700/65 dark:text-pink-100/60"><button type="button" onClick={() => onLike(comment.id)} className="hover:text-pink-600">Thích {comment.likes ? `· ${comment.likes}` : ''}</button><button type="button" className="hover:text-pink-600">Phản hồi</button></div></div></div>{comment.replies?.length ? <div className="ml-5 mt-4 flex flex-col gap-4 border-l-2 border-pink-300 pl-4 dark:border-pink-700">{comment.replies.map((reply) => <Comment key={reply.id} comment={reply} onLike={onLike} />)}</div> : null}</div>
}

export function DiscussionForum() {
  const [view, setView] = useState('index')
  const [selectedPost, setSelectedPost] = useState(posts[0])
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [comments, setComments] = useState(initialComments)
  const [newComment, setNewComment] = useState('')
  const [liked, setLiked] = useState(false)
  const totalComments = useMemo(() => selectedPost.comments + (newComment ? 0 : 0), [selectedPost.comments, newComment])
  const openPost = (post) => { setSelectedPost(post); setLiked(false); setView('detail') }
  const submitComment = (event) => { event.preventDefault(); if (!newComment.trim()) return; setComments((current) => [{ id: Date.now(), author: 'Bạn', initials: 'B', tone: 'bg-pink-200 text-pink-700', time: 'Vừa xong', text: newComment.trim(), likes: 0 }, ...current]); setNewComment('') }

  return <div className="min-h-screen px-4 pb-20 pt-8 text-pink-950 dark:text-pink-50 sm:px-8 sm:pt-12"><div className="mx-auto max-w-5xl">{view === 'index' ? <><header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-pink-500">Formly community</p><h1 className="text-4xl font-bold tracking-[-0.04em] sm:text-5xl">Cộng đồng thảo luận</h1><p className="mt-3 max-w-xl text-sm leading-6 text-pink-900/60 dark:text-pink-100/60">Nơi những ý tưởng tốt được chia sẻ, phản biện và cùng nhau phát triển.</p></div><button type="button" onClick={() => setIsCreateOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-pink-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-500/20 hover:bg-pink-600"><Plus /> Đăng bài</button></header><Glass className="p-3 sm:p-4"><div className="mb-3 flex items-center justify-between px-2"><h2 className="text-sm font-bold">Bài viết mới nhất</h2><span className="text-xs text-pink-700/60 dark:text-pink-100/60">{posts.length} cuộc thảo luận</span></div><div className="flex flex-col gap-3">{posts.map((post) => <PostCard key={post.id} post={post} onOpen={openPost} />)}</div></Glass></> : <><button type="button" onClick={() => setView('index')} className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-pink-700 hover:text-pink-500 dark:text-pink-200"><ArrowLeft /> Quay lại diễn đàn</button><Glass className="p-5 sm:p-9"><article><div className="flex items-center gap-3"><Avatar initials={selectedPost.initials} tone={selectedPost.tone} /><div><p className="text-sm font-bold">{selectedPost.author}</p><p className="text-xs text-pink-700/60 dark:text-pink-100/60">{selectedPost.time} · Đã đăng trong Cộng đồng</p></div></div><h1 className="mt-6 text-3xl font-bold leading-tight tracking-[-0.03em] sm:text-4xl">{selectedPost.title}</h1><div className="mt-5 flex flex-wrap gap-2">{selectedPost.tags.map((tag) => <span key={tag} className="rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-700 dark:bg-pink-800/60 dark:text-pink-100">{tag}</span>)}</div><div className="mt-7 whitespace-pre-line text-base leading-8 text-pink-950/75 dark:text-pink-50/75">{selectedPost.content}</div><div className="mt-8 flex flex-wrap gap-3 border-t border-white/40 pt-5 dark:border-white/10"><button type="button" onClick={() => setLiked(!liked)} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${liked ? 'bg-pink-500 text-white' : 'bg-white/60 text-pink-700 hover:bg-pink-100 dark:bg-pink-950/40 dark:text-pink-100'}`}><ArrowUp /> {liked ? 'Đã thích' : 'Ủng hộ'} · {selectedPost.votes + (liked ? 1 : 0)}</button><button type="button" className="inline-flex items-center gap-2 rounded-xl bg-white/60 px-4 py-2.5 text-sm font-semibold text-pink-700 hover:bg-pink-100 dark:bg-pink-950/40 dark:text-pink-100"><Share2 /> Chia sẻ</button></div></article><section className="mt-10 border-t border-white/40 pt-8 dark:border-white/10"><div className="flex items-center justify-between"><h2 className="text-xl font-bold">Bình luận</h2><span className="text-sm text-pink-700/60 dark:text-pink-100/60">{totalComments} phản hồi</span></div><form onSubmit={submitComment} className="mt-5 flex items-center gap-3"><Avatar initials="B" tone="bg-pink-200 text-pink-700" /><input value={newComment} onChange={(event) => setNewComment(event.target.value)} placeholder="Viết bình luận của bạn..." aria-label="Viết bình luận" className="min-w-0 flex-1 rounded-xl border border-white/50 bg-white/60 px-4 py-3 text-sm outline-none placeholder:text-pink-900/40 focus:ring-2 focus:ring-pink-400 dark:border-white/20 dark:bg-pink-950/40 dark:text-white" /><button type="submit" aria-label="Gửi bình luận" className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-pink-500 text-white hover:bg-pink-600"><Send /></button></form><div className="mt-7 flex flex-col gap-6">{comments.map((comment) => <Comment key={comment.id} comment={comment} onLike={() => {}} />)}</div></section></Glass></>}{isCreateOpen ? <CreatePostDialog onClose={() => setIsCreateOpen(false)} /> : null}</div></div>
}

export default DiscussionForum
