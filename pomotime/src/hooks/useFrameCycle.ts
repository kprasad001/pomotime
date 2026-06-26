// useFrameCycle.ts
import { useEffect, useState } from 'react';

interface FrameCycleOptions {
    frameCount: number;
    frameInterval?: number;
    isRunning?: boolean; // optional: pause when timer pauses, or always animate
}

export default function useFrameCycle({
    frameCount,
    frameInterval = 600,
    isRunning = true,
}: FrameCycleOptions) {
    const [frame, setFrame] = useState(0);

    useEffect(() => {
        if (!isRunning) return;
        const id = setInterval(() => {
            setFrame((f) => (f + 1) % frameCount);
        }, frameInterval);
        return () => clearInterval(id);
    }, [isRunning, frameCount, frameInterval]);

    return frame;
}