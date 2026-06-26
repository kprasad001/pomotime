// useSpriteWalker.ts
import { useEffect, useRef, useState } from 'react';

interface SpriteWalkerOptions {
    frameCount: number;
    frameWidth: number;
    frameInterval?: number;   // ms per animation frame while walking
    walkSpeed?: number;       // px per tick
    trackWidth: number;
    isRunning: boolean;
    idleChance?: number;      // 0-1, chance to go idle after each walk burst
    minWalkMs?: number;       // min time spent walking before re-rolling
    maxWalkMs?: number;
    minIdleMs?: number;       // min time spent idle
    maxIdleMs?: number;
    idleFrame?: number;       // which frame index represents standing still
}

export default function useSpriteWalker({
    frameCount,
    frameWidth,
    frameInterval = 150,
    walkSpeed = 2,
    trackWidth,
    isRunning,
    idleChance = 0.3,
    minWalkMs = 1500,
    maxWalkMs = 4000,
    minIdleMs = 800,
    maxIdleMs = 2500,
    idleFrame = 0,
}: SpriteWalkerOptions) {
    const [frame, setFrame] = useState(0);
    const [x, setX] = useState(0);
    const [facingLeft, setFacingLeft] = useState(false);
    const [isIdle, setIsIdle] = useState(false);

    const directionRef = useRef(1);
    const isIdleRef = useRef(false);
    const behaviorTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const randomBetween = (min: number, max: number) =>
        Math.floor(Math.random() * (max - min)) + min;

    // Behavior state machine: alternates walk bursts and idle pauses
    useEffect(() => {
        if (!isRunning) return;

        const scheduleNext = () => {
            const goingIdle = Math.random() < idleChance;
            isIdleRef.current = goingIdle;
            setIsIdle(goingIdle);

            if (goingIdle) {
                setFrame(idleFrame);
                const idleDuration = randomBetween(minIdleMs, maxIdleMs);
                behaviorTimeoutRef.current = setTimeout(scheduleNext, idleDuration);
            } else {
                // randomly pick a new direction when resuming walk
                directionRef.current = Math.random() < 0.5 ? 1 : -1;
                setFacingLeft(directionRef.current === -1);
                const walkDuration = randomBetween(minWalkMs, maxWalkMs);
                behaviorTimeoutRef.current = setTimeout(scheduleNext, walkDuration);
            }
        };

        scheduleNext();

        return () => {
            if (behaviorTimeoutRef.current) clearTimeout(behaviorTimeoutRef.current);
        };
    }, [isRunning, idleChance, minWalkMs, maxWalkMs, minIdleMs, maxIdleMs, idleFrame]);

    // Animate sprite frames (only while walking)
    useEffect(() => {
        if (!isRunning) return;
        const id = setInterval(() => {
            if (isIdleRef.current) return;
            setFrame((f) => (f + 1) % frameCount);
        }, frameInterval);
        return () => clearInterval(id);
    }, [isRunning, frameCount, frameInterval]);

    // Animate walking position (only while walking)
    useEffect(() => {
        if (!isRunning) return;
        const id = setInterval(() => {
            if (isIdleRef.current) return;
            setX((prevX) => {
                let next = prevX + walkSpeed * directionRef.current;
                if (next >= trackWidth - frameWidth) {
                    directionRef.current = -1;
                    setFacingLeft(true);
                    next = trackWidth - frameWidth;
                } else if (next <= 0) {
                    directionRef.current = 1;
                    setFacingLeft(false);
                    next = 0;
                }
                return next;
            });
        }, 30);
        return () => clearInterval(id);
    }, [isRunning, walkSpeed, trackWidth, frameWidth]);

    return { frame, x, facingLeft, isIdle };
}