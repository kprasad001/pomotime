import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTimerOptions {
    durationSeconds: number;
    onComplete?: () => void;
}

export default function useTimer({ durationSeconds, onComplete }: UseTimerOptions) {
    const [secondsLeft, setSecondsLeft] = useState(durationSeconds);
    const [isRunning, setIsRunning] = useState(false);
    const endTimeRef = useRef<number | null>(null);

    // Tick every second while running
    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            if (endTimeRef.current === null) return;

            const remaining = Math.round((endTimeRef.current - Date.now()) / 1000);

            if (remaining <= 0) {
                setSecondsLeft(0);
                setIsRunning(false);
                onComplete?.();
            } else {
                setSecondsLeft(remaining);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isRunning, onComplete]);

    const start = useCallback(() => {
        endTimeRef.current = Date.now() + secondsLeft * 1000;
        setIsRunning(true);
    }, [secondsLeft]);

    const pause = useCallback(() => {
        if (endTimeRef.current !== null) {
        const remaining = Math.round((endTimeRef.current - Date.now()) / 1000);
        setSecondsLeft(Math.max(remaining, 0));
        }
        setIsRunning(false);
    }, []);

    const reset = useCallback((newDuration: number = durationSeconds) => {
        setIsRunning(false);
        endTimeRef.current = null;
        setSecondsLeft(newDuration);
    }, [durationSeconds]);

    return { secondsLeft, isRunning, start, pause, reset };
}