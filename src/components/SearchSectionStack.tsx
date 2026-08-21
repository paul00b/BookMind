import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface SearchSectionStackItem {
    id: string;
    visible: boolean;
    node: ReactNode;
}

interface Props {
    items: SearchSectionStackItem[];
}

export default function SearchSectionStack({ items }: Props) {
    const nodeRefs = useRef(new Map<string, HTMLDivElement>());
    const contentRefs = useRef(new Map<string, HTMLDivElement>());
    const previousPositionsRef = useRef(new Map<string, number>());
    const [contentHeights, setContentHeights] = useState<Record<string, number>>({});

    // ponytail: callers rebuild `items` (new array/objects) on every render, even when
    // order/visibility didn't change. Key off id+visible so the observer/FLIP effects
    // below only redo work when something actually moved — otherwise every unrelated
    // parent re-render (e.g. clicking a card) re-triggers layout reads and a spurious
    // "jump" animation.
    const itemsKey = items.map(i => `${i.id}:${i.visible}`).join('|');

    // 1. Utilisation de ResizeObserver pour mesurer les hauteurs sans bloquer le rendu
    useEffect(() => {
        const observers: ResizeObserver[] = [];

        items.forEach((item) => {
            const element = contentRefs.current.get(item.id);
            if (!element) return;

            const observer = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    const height = entry.contentRect.height;
                    setContentHeights((prev) => {
                        if (prev[item.id] === height) return prev;
                        return { ...prev, [item.id]: height };
                    });
                }
            });

            observer.observe(element);
            observers.push(observer);
        });

        return () => observers.forEach((obs) => obs.disconnect());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemsKey]);

    // 2. Animation FLIP pour les changements de position (inchangée mais avec guard)
    useLayoutEffect(() => {
        const nextPositions = new Map<string, number>();

        items.forEach(item => {
            const node = nodeRefs.current.get(item.id);
            if (!node) return;

            const nextTop = node.getBoundingClientRect().top;
            nextPositions.set(item.id, nextTop);

            const previousTop = previousPositionsRef.current.get(item.id);
            if (previousTop != null) {
                const deltaY = previousTop - nextTop;
                if (Math.abs(deltaY) >= 1) {
                    node.animate(
                        [
                            { transform: `translateY(${deltaY}px)` },
                            { transform: 'translateY(0px)' },
                        ],
                        {
                            duration: 260,
                            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
                        }
                    );
                }
            }
        });

        previousPositionsRef.current = nextPositions;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemsKey]);

    return (
        <div className="w-full max-w-xl md:max-w-3xl">
            {items.map(item => (
                <div
                    key={item.id}
                    ref={node => {
                        if (node) nodeRefs.current.set(item.id, node);
                        else nodeRefs.current.delete(item.id);
                    }}
                    style={{
                        height: item.visible ? (contentHeights[item.id] ?? 'auto') : 0,
                        willChange: 'height, transform, opacity'
                    }}
                    className={`origin-top transform-gpu transition-[height,opacity,transform,margin] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        item.visible
                            ? 'overflow-visible opacity-100 translate-y-0 scale-100 mt-10'
                            : 'overflow-hidden opacity-0 -translate-y-1 scale-[0.99] mt-0 pointer-events-none'
                    }`}
                    aria-hidden={!item.visible}
                >
                    <div
                        ref={node => {
                            if (node) contentRefs.current.set(item.id, node);
                            else contentRefs.current.delete(item.id);
                        }}
                        className={item.visible ? 'transition-opacity duration-200 opacity-100' : 'transition-opacity duration-150 opacity-0'}
                    >
                        {item.node}
                    </div>
                </div>
            ))}
        </div>
    );
}