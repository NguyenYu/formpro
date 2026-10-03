'use client';

import { useEffect, useState } from 'react';

const createBlob = (quadrant) => ({
    top: `${quadrant === 'top-left' ? Math.random() * 40 : 60 + Math.random() * 40}%`,
    left: `${quadrant === 'top-left' ? Math.random() * 40 : 60 + Math.random() * 40}%`,
    size: `${10 + Math.random() * 10}vw`,
    backgroundColor: `hsl(${320 + Math.random() * 25}, 100%, ${65 + Math.random() * 25}%)`,
});

const createBlobs = () => [createBlob('top-left'), createBlob('bottom-right')];

export function PinkFluidBackground() {
    // Thêm state mounted để kiểm tra xem đã render trên client chưa
    const [mounted, setMounted] = useState(false);

    // Khởi tạo state rỗng ban đầu để tránh lỗi hydration
    const [blobs, setBlobs] = useState([]);

    useEffect(() => {
        // Chỉ khi Component đã mount trên Client, chúng ta mới set true và khởi tạo random
        setMounted(true);
        setBlobs(createBlobs());

        const interval = window.setInterval(() => {
            setBlobs(createBlobs());
        }, 4000);

        return () => window.clearInterval(interval);
    }, []);

    // Nếu chưa mount (đang ở Server SSR), chỉ render nền trơn, KHÔNG render mảng màu random
    if (!mounted) {
        return (
            <div
                className="pink-background fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-pink-50 dark:bg-pink-950"
                aria-hidden="true"
            />
        );
    }

    // Khi đã ở Client, render đầy đủ mảng màu
    return (
        <div
            className="pink-background fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-pink-50 dark:bg-pink-950"
            aria-hidden="true"
        >
            {blobs.map((blob, index) => (
                <div
                    key={index}
                    className="absolute rounded-full filter blur-[60px] opacity-70 transition-all duration-4000 ease-in-out"
                    style={{
                        top: blob.top,
                        left: blob.left,
                        width: blob.size,
                        height: blob.size,
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: blob.backgroundColor,
                    }}
                />
            ))}
        </div>
    );
}

export default PinkFluidBackground;
