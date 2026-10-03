'use client';

import { use, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
    ArrowLeft,
    Download,
    FileText,
    Moon,
    PenLine,
    Sparkles,
    Sun,
    Upload,
} from 'lucide-react';
import { templates } from '@/data/mockData';

function SignaturePad({ onChange }) {
    const canvasRef = useRef(null);
    const drawing = useRef(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.strokeStyle = '#111827';
        context.lineWidth = 2;
        context.lineCap = 'round';
    }, []);

    const point = (event) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        return {
            x: (event.clientX - rect.left) * (canvas.width / rect.width),
            y: (event.clientY - rect.top) * (canvas.height / rect.height),
        };
    };
    const start = (event) => {
        drawing.current = true;
        const p = point(event);
        const context = canvasRef.current.getContext('2d');
        context.beginPath();
        context.moveTo(p.x, p.y);
    };
    const draw = (event) => {
        if (!drawing.current) return;
        const p = point(event);
        const context = canvasRef.current.getContext('2d');
        context.lineTo(p.x, p.y);
        context.stroke();
        onChange(canvasRef.current.toDataURL('image/png'));
    };
    const clear = () => {
        const canvas = canvasRef.current;
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        onChange('');
    };

    return (
        <div className="mt-3 rounded-xl border border-dashed border-pink-300 bg-white/40 p-3 dark:border-pink-500/40 dark:bg-black/10">
            <canvas
                ref={canvasRef}
                width="600"
                height="150"
                onPointerDown={start}
                onPointerMove={draw}
                onPointerUp={() => {
                    drawing.current = false;
                }}
                onPointerLeave={() => {
                    drawing.current = false;
                }}
                className="h-24 w-full touch-none rounded-lg bg-white"
                aria-label="Khung ký tên trực tiếp"
            />
            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>Ký trực tiếp trên khung</span>
                <button
                    type="button"
                    onClick={clear}
                    className="font-medium text-pink-600 hover:underline dark:text-pink-300"
                >
                    Xóa chữ ký
                </button>
            </div>
        </div>
    );
}

export default function DynamicFormPage({ params }) {
    const { templateId } = use(params);

    const template =
        templates.find((item) => item.id === templateId) || templates[0];
    const [values, setValues] = useState(() =>
        Object.fromEntries(template.fields.map((field) => [field.id, ''])),
    );

    const [tone, setTone] = useState('professional');
    const [uses, setUses] = useState(3);
    const [dark, setDark] = useState(false);
    const [signature, setSignature] = useState('');

    useEffect(() => {
        const saved = window.localStorage.getItem('formly-theme');
        const isDark = saved
            ? saved === 'dark'
            : window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.classList.toggle('dark', isDark);
        setDark(isDark);
    }, []);

    const update = (id, value) =>
        setValues((current) => ({ ...current, [id]: value }));

    const reason = useMemo(
        () => values.reason || 'Nội dung lý do sẽ hiển thị tại đây.',
        [values.reason],
    );

    const polish = () => {
        const currentReason = values.reason || '';
        if (!currentReason.trim() || uses < 1) return;

        const endings = {
            professional:
                'Tôi kính mong Ban Giám đốc xem xét và tạo điều kiện hỗ trợ theo quy định.',
            sincere:
                'Tôi rất mong nhận được sự thông cảm và hỗ trợ từ Ban Giám đốc.',
            concise: 'Kính đề nghị Ban Giám đốc xem xét và phê duyệt.',
        };

        update(
            'reason',
            `${currentReason.trim().replace(/[.!?]+$/, '')}. ${endings[tone]}`,
        );
        setUses((current) => current - 1);
    };

    const toggleTheme = () => {
        const next = !dark;
        document.documentElement.classList.toggle('dark', next);
        window.localStorage.setItem('formly-theme', next ? 'dark' : 'light');
        setDark(next);
    };

    const uploadSignature = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => setSignature(reader.result);
        reader.readAsDataURL(file);
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-transparent text-pink-950 transition-colors dark:bg-transparent dark:text-pink-50">
            {/* THÊM KHỐI STYLE IN ẤN A4 CHUẨN TẠI ĐÂY */}
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                @media print {
                    /* Thiết lập khổ giấy A4 thực tế cho máy in / PDF */
                    @page { 
                        size: A4; 
                        margin: 20mm; 
                    }
                    /* Ẩn mọi thứ trên trang ngoại trừ khu vực tờ giấy */
                    body * { 
                        visibility: hidden; 
                    }
                    /* Ép tờ giấy hiển thị rõ ràng, đưa lên góc trái trên cùng */
                    .pdf-paper, .pdf-paper * { 
                        visibility: visible; 
                    }
                    .pdf-paper { 
                        position: absolute; 
                        left: 0; 
                        top: 0; 
                        width: 210mm !important; 
                        height: 297mm !important; 
                        max-width: none !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        box-shadow: none !important;
                        font-size: 14pt !important; /* Phóng to chữ về kích thước chuẩn khi in */
                        line-height: 1.5 !important;
                    }
                    /* Loại bỏ nền tối nếu đang ở chế độ Dark Mode */
                    body {
                        background: white !important;
                    }
                }
            `,
                }}
            />

            <header className="form-toolbar relative z-10 border-b border-white/40 bg-white/30 backdrop-blur-xl dark:border-white/10 dark:bg-pink-950/40">
                <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
                    <Link
                        href={`/templates/${template.categoryId}`}
                        className="flex items-center gap-2 text-sm text-slate-600 transition hover:text-pink-600 dark:text-slate-300"
                    >
                        <ArrowLeft size={17} /> Chọn mẫu khác
                    </Link>
                    <div className="flex items-center gap-2 font-semibold">
                        <span className="flex size-8 items-center justify-center rounded-lg bg-pink-500 text-white">
                            <FileText size={16} />
                        </span>{' '}
                        Formly
                    </div>
                    <button
                        type="button"
                        onClick={toggleTheme}
                        aria-label={
                            dark
                                ? 'Chuyển sang giao diện sáng'
                                : 'Chuyển sang giao diện tối'
                        }
                        className="rounded-xl border border-white/60 bg-white/40 p-2.5 text-pink-700 shadow-sm backdrop-blur hover:bg-white/70 dark:border-white/10 dark:bg-pink-900/40 dark:text-pink-200"
                    >
                        {dark ? <Sun size={17} /> : <Moon size={17} />}
                    </button>
                </div>
            </header>
            <main className="relative z-10 mx-auto max-w-6xl px-5 py-8 sm:px-8">
                <div className="mb-7">
                    <p className="text-sm font-semibold text-pink-600 dark:text-pink-300">
                        Tạo tài liệu với AI
                    </p>
                    <h1 className="mt-1 text-2xl font-bold">
                        {template.title}
                    </h1>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <section className="form-panel rounded-3xl border border-white/40 bg-white/40 p-6 shadow-2xl backdrop-blur-xl sm:p-8 dark:border-white/10 dark:bg-pink-900/40">
                        <h2 className="font-semibold">Thông tin của bạn</h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Điền thông tin, văn bản sẽ cập nhật ngay bên phải.
                        </p>
                        <div className="mt-6 space-y-5">
                            {template.fields.map((field) => (
                                <div key={field.id}>
                                    <label
                                        htmlFor={field.id}
                                        className="mb-2 block text-sm font-medium"
                                    >
                                        {field.label}
                                        {field.required && (
                                            <span className="ml-1 text-pink-600">
                                                *
                                            </span>
                                        )}
                                    </label>

                                    {field.type === 'textarea' ? (
                                        <textarea
                                            id={field.id}
                                            required={field.required}
                                            value={values[field.id] || ''}
                                            onChange={(event) =>
                                                update(
                                                    field.id,
                                                    event.target.value,
                                                )
                                            }
                                            placeholder={
                                                field.placeholder || ''
                                            }
                                            className="min-h-28 w-full resize-y rounded-xl border border-white/60 bg-white/50 px-3 py-3 text-sm outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-300/40 dark:border-white/10 dark:bg-pink-950/40"
                                        />
                                    ) : (
                                        <input
                                            id={field.id}
                                            required={field.required}
                                            type={
                                                field.type === 'date'
                                                    ? 'date'
                                                    : 'text'
                                            }
                                            value={values[field.id] || ''}
                                            onChange={(event) =>
                                                update(
                                                    field.id,
                                                    event.target.value,
                                                )
                                            }
                                            placeholder={
                                                field.placeholder || ''
                                            }
                                            className="h-11 w-full rounded-xl border border-white/60 bg-white/50 px-3 text-sm outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-300/40 dark:border-white/10 dark:bg-pink-950/40"
                                        />
                                    )}

                                    {field.id === 'reason' && (
                                        <div className="mt-3 rounded-2xl border border-pink-300/50 bg-pink-100/40 p-4 dark:border-pink-400/20 dark:bg-pink-950/20">
                                            <div className="flex items-center justify-between text-xs font-semibold">
                                                <span className="flex items-center gap-1 text-pink-600 dark:text-pink-300">
                                                    <Sparkles size={13} /> Hoàn
                                                    thiện lý do bằng AI
                                                </span>
                                                <span className="text-muted-foreground">
                                                    Còn {uses}/3 lượt
                                                </span>
                                            </div>

                                            <div className="mt-3 flex items-center gap-2">
                                                <span className="text-xs text-muted-foreground whitespace-nowrap">
                                                    Gợi ý nhanh:
                                                </span>
                                                <div className="flex flex-wrap gap-2">
                                                    {[
                                                        'Gia đình',
                                                        'Sức khỏe',
                                                        'Công việc cá nhân',
                                                    ].map((suggestion) => (
                                                        <button
                                                            type="button"
                                                            key={suggestion}
                                                            onClick={() =>
                                                                update(
                                                                    'reason',
                                                                    `Tôi cần xin nghỉ vì lý do ${suggestion.toLowerCase()}`,
                                                                )
                                                            }
                                                            className="rounded-full border border-pink-300/50 px-2.5 py-1 text-xs text-pink-700 hover:bg-pink-200 transition-colors dark:text-pink-200 dark:hover:bg-pink-900/50"
                                                        >
                                                            {suggestion}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="mt-4 flex gap-2">
                                                <select
                                                    value={tone}
                                                    onChange={(event) =>
                                                        setTone(
                                                            event.target.value,
                                                        )
                                                    }
                                                    className="h-9 min-w-0 flex-1 rounded-lg border border-white/60 bg-white/60 px-2 text-xs dark:border-white/10 dark:bg-pink-950/40 outline-none focus:ring-2 focus:ring-pink-300/40"
                                                >
                                                    <option value="professional">
                                                        Thần thái chuyên nghiệp
                                                    </option>
                                                    <option value="sincere">
                                                        Nhẹ nhàng, chân thành
                                                    </option>
                                                    <option value="concise">
                                                        Ngắn gọn, cứng rắn
                                                    </option>
                                                </select>
                                                <button
                                                    type="button"
                                                    onClick={polish}
                                                    disabled={
                                                        !values.reason?.trim() ||
                                                        uses < 1
                                                    }
                                                    className="flex h-9 items-center gap-1.5 rounded-lg bg-pink-500 px-3 text-xs font-semibold text-white shadow-sm disabled:opacity-50 transition hover:bg-pink-600"
                                                >
                                                    <Sparkles size={14} />
                                                    Viết lại
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 border-t border-white/40 pt-5 dark:border-white/10">
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="signature-upload"
                                    className="flex items-center gap-2 text-sm font-medium"
                                >
                                    <PenLine
                                        size={16}
                                        className="text-pink-500"
                                    />{' '}
                                    Chữ ký
                                </label>
                                <label
                                    htmlFor="signature-upload"
                                    className="flex cursor-pointer items-center gap-1 text-xs font-semibold text-pink-600 transition hover:text-pink-700 dark:text-pink-300"
                                >
                                    <Upload size={14} /> Tải ảnh lên
                                    <input
                                        id="signature-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={uploadSignature}
                                        className="sr-only"
                                    />
                                </label>
                            </div>
                            <SignaturePad onChange={setSignature} />
                            {signature && (
                                <img
                                    src={signature}
                                    alt="Chữ ký đã tải lên"
                                    className="mt-3 max-h-12 max-w-40 object-contain"
                                />
                            )}
                        </div>
                    </section>
                    <section className="preview-panel md:sticky md:top-6 md:self-start">
                        <div className="overflow-hidden rounded-3xl border border-white/40 bg-white/40 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-pink-900/40">
                            <div className="flex items-center justify-between px-5 py-4 border-b border-white/30 dark:border-white/10">
                                <div>
                                    <h2 className="font-semibold">
                                        Xem trước văn bản
                                    </h2>
                                    <p className="text-xs text-muted-foreground">
                                        Cập nhật theo thời gian thực
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => window.print()}
                                    className="inline-flex items-center gap-2 rounded-xl bg-pink-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-pink-600"
                                >
                                    <Download size={16} /> Tải PDF
                                </button>
                            </div>

                            {/* KHU VỰC CHỨA TỜ GIẤY XEM TRƯỚC ĐÃ ĐƯỢC PHÓNG TO TỐI ĐA */}
                            <div className="p-3 md:p-5 flex justify-center bg-gray-100/30 dark:bg-black/20 overflow-hidden">
                                {/* Tăng max-w lên 720px để chiếm gần như trọn vẹn bề ngang cột */}
                                <article className="pdf-paper relative bg-white w-full max-w-[720px] aspect-[210/297] text-gray-900 shadow-xl p-8 sm:p-14 text-[13px] sm:text-sm leading-relaxed transition-all duration-300">
                                    <h3 className="text-center text-lg sm:text-xl font-bold uppercase mb-6 sm:mb-10">
                                        {template.title}
                                    </h3>

                                    <div className="pdf-paper-content space-y-3 sm:space-y-4">
                                        <p>Kính gửi: Ban Giám đốc Công ty</p>
                                        <p>
                                            Tôi tên là:{' '}
                                            <strong>
                                                {values.name ||
                                                    '...................................................'}
                                            </strong>
                                        </p>
                                        <p>
                                            Chức vụ:{' '}
                                            <strong>
                                                {values.position ||
                                                    '...................................................'}
                                            </strong>
                                        </p>
                                        <p>
                                            Bộ phận:{' '}
                                            <strong>
                                                {values.department ||
                                                    '...................................................'}
                                            </strong>
                                        </p>
                                        <p className="indent-8 mt-6">
                                            Nay tôi làm đơn này kính xin Ban
                                            Giám đốc cho phép tôi được nghỉ việc
                                            kể từ ngày{' '}
                                            <strong>
                                                {values.leaveDate ||
                                                    '........................'}
                                            </strong>{' '}
                                            vì lý do: {reason}
                                        </p>
                                        <p className="indent-8">
                                            Tôi cam kết sẽ hoàn tất việc bàn
                                            giao công việc trước thời điểm nghỉ
                                            việc.
                                        </p>
                                        <p className="indent-8">
                                            Trân trọng cảm ơn sự quan tâm và hỗ
                                            trợ của Ban Giám đốc.
                                        </p>
                                    </div>
                                    <div className="mt-14 flex flex-col items-end text-center">
                                        <p className="mb-2">
                                            Ngày ... tháng ... năm ...
                                        </p>
                                        <p className="font-semibold">
                                            Người làm đơn
                                        </p>
                                        {signature ? (
                                            <img
                                                src={signature}
                                                alt="Chữ ký"
                                                className="h-20 w-36 object-contain mt-2"
                                            />
                                        ) : (
                                            <div className="h-20 mt-2" />
                                        )}
                                        <p className="font-semibold mt-2">
                                            {values.name ||
                                                '................................'}
                                        </p>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
