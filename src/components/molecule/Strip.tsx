import { useLayoutEffect, useRef, useState, useMemo, useCallback } from "react";

const BASE_ITEMS = ["Designer", "Freelancer"] as const;
const ANIMATION_SPEED_PX_PER_SEC = 80;
const MIN_ANIMATION_DURATION = 6;
const DURATION_CHANGE_THRESHOLD = 0.05;
const DISTANCE_CHANGE_THRESHOLD = 1;
const STRIP_ROTATION_DEG = 1.5;
const STRIP_ROTATION_DEG_MOBILE = 2.5;
const STRIP_VERTICAL_PADDING = "py-3.5";
const ITEM_HORIZONTAL_PADDING = "px-5.5";
const ITEM_TEXT_SIZE = "text-lg";

interface MarqueeConfig {
    repeats: number;
    duration: number;
    distance: number;
}

interface MarqueeStyleProps extends React.CSSProperties {
    '--marquee-duration': string;
    '--marquee-distance': string;
}

export default function Strip() {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const measureRef = useRef<HTMLDivElement | null>(null);

    const [config, setConfig] = useState<MarqueeConfig>(() => ({
        repeats: 2,
        duration: 14,
        distance: 0
    }));

    const calculateMarqueeConfig = useCallback((
        containerWidth: number,
        groupWidth: number
    ): MarqueeConfig | null => {
        if (groupWidth === 0) return null;

        const repeatsNeeded = Math.max(1, Math.ceil(containerWidth / groupWidth) + 1);
        const distanceToScroll = groupWidth * repeatsNeeded;
        const computedDuration = Math.max(
            MIN_ANIMATION_DURATION,
            Math.round((distanceToScroll / ANIMATION_SPEED_PX_PER_SEC) * 10) / 10
        );

        return {
            repeats: repeatsNeeded,
            duration: computedDuration,
            distance: distanceToScroll
        };
    }, []);

    const shouldUpdateConfig = useCallback((
        prev: MarqueeConfig,
        next: MarqueeConfig
    ): boolean => {
        return (
            prev.repeats !== next.repeats ||
            Math.abs(prev.duration - next.duration) > DURATION_CHANGE_THRESHOLD ||
            Math.abs(prev.distance - next.distance) > DISTANCE_CHANGE_THRESHOLD
        );
    }, []);

    const [wrapperHeight, setWrapperHeight] = useState<number | undefined>(undefined);

    useLayoutEffect(() => {
        const container = containerRef.current;
        const measure = measureRef.current;

        const updateConfig = () => {
            const currentContainer = containerRef.current ?? container;
            const currentMeasure = measureRef.current ?? measure;
            
            if (!currentContainer || !currentMeasure) return;

            const containerWidth = Math.round(currentContainer.getBoundingClientRect().width);
            const groupWidth = currentMeasure.scrollWidth;
            
            const newConfig = calculateMarqueeConfig(containerWidth, groupWidth);
            if (!newConfig) return;

            setConfig(prev => shouldUpdateConfig(prev, newConfig) ? newConfig : prev);

            // Ajusta a altura da caixa pai para caber o elemento rotacionado
            // getBoundingClientRect inclui transformações (rotations), então
            // usamos sua altura para ajustar o wrapper externo.
            const wrapperRect = currentContainer.getBoundingClientRect();
            setWrapperHeight(Math.ceil(wrapperRect.height));
        };

        let resizeObserver: ResizeObserver | null = null;

        if (typeof ResizeObserver !== "undefined") {
            resizeObserver = new ResizeObserver(updateConfig);
            if (containerRef.current) resizeObserver.observe(containerRef.current);
            if (measureRef.current) resizeObserver.observe(measureRef.current);
        } else {
            window.addEventListener("resize", updateConfig);
        }

        updateConfig();

        return () => {
            if (resizeObserver) {
                resizeObserver.disconnect();
            } else {
                window.removeEventListener("resize", updateConfig);
            }
        };
    }, [calculateMarqueeConfig, shouldUpdateConfig]);

    const repeatedItems = useMemo(
        () => Array.from({ length: config.repeats }, () => BASE_ITEMS).flat(),
        [config.repeats]
    );

    const trackStyle: MarqueeStyleProps = {
        '--marquee-duration': `${config.duration}s`,
        '--marquee-distance': `${config.distance}px`
    };

    const renderStripItem = (text: string, keyPrefix: string, index: number) => (
        <span
            key={`${keyPrefix}-${index}`}
            className={`strip-item inline-block text-primary ${ITEM_TEXT_SIZE} ${ITEM_HORIZONTAL_PADDING} whitespace-nowrap`}
        >
            {text}
        </span>
    );

    return (
        <div
            ref={wrapperRef}
            className="w-full overflow-hidden my-8"
            style={{ height: wrapperHeight ? `${wrapperHeight}px` : undefined }}
        >
            <div
                className={`w-full bg-accent font-title ${STRIP_VERTICAL_PADDING} strip-tilt strip-expand`}
                ref={containerRef}
                role="presentation"
            >
            <p className="sr-only" aria-hidden={false}>
                {BASE_ITEMS.join(", ")}
            </p>

            <div
                style={{ position: "absolute", visibility: "hidden", height: 0, overflow: "hidden" }}
                aria-hidden="true"
            >
                <div ref={measureRef} className="strip-group flex items-center">
                    {BASE_ITEMS.map((text, i) => renderStripItem(text, "m", i))}
                </div>
            </div>

            <div
                className="strip-viewport overflow-hidden"
                tabIndex={0}
                aria-label="Marquee de títulos"
                role="group"
            >
                <div
                    className="strip-track flex items-center"
                    role="presentation"
                    aria-hidden="true"
                    style={trackStyle}
                >
                    <div className="strip-inner flex items-center" aria-hidden="true">
                        {repeatedItems.map((text, i) => renderStripItem(text, "r1", i))}
                    </div>
                    <div className="strip-inner flex items-center" aria-hidden="true">
                        {repeatedItems.map((text, i) => renderStripItem(text, "r2", i))}
                    </div>
                </div>
            </div>

            <style>{`
                .strip-expand {
                    width: calc(100% + 4rem);
                    margin-left: -2rem;
                    margin-right: -2rem;
                }

                .strip-tilt {
                    transform: rotate(${STRIP_ROTATION_DEG}deg);
                    transform-origin: left center;
                    overflow: hidden;
                }

                @media (max-width: 1024px) {
                    .strip-tilt {
                        transform: rotate(${STRIP_ROTATION_DEG_MOBILE}deg);
                    }
                }

                .strip-track {
                    animation: marquee var(--marquee-duration, 14s) linear infinite;
                    will-change: transform;
                }

                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-1 * var(--marquee-distance, 0px))); }
                }

                .strip-viewport:focus {
                    outline: none;
                }

                @media (prefers-reduced-motion: reduce) {
                    .strip-track {
                        animation: none !important;
                    }
                }
            `}</style>
            </div>
        </div>
    );
}
