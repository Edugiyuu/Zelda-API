export const ArrowIcon = () => (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export const BackIcon = () => (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export const SearchIcon = () => (
    <svg viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.6" /><path d="M12.5 12.5L16 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
);

export const ChevronIcon = ({ direction = 'right' }: { direction?: 'right' | 'up' | 'down' }) => {
    const path = { right: 'M5 3l4 4-4 4', up: 'M3 9l4-4 4 4', down: 'M3 5l4 4 4-4' }[direction];
    return <svg viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d={path} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
};

export const DiamondIcon = ({ className = '' }: { className?: string }) => (
    <svg className={`diamond ${className}`} viewBox="0 0 12 12" aria-hidden="true"><path d="M6 0l6 6-6 6-6-6z" fill="currentColor" /></svg>
);

export const TriforceIcon = ({ className = '' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 68 60" aria-hidden="true">
        <defs>
            <linearGradient id="triforce-gold" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#F3E2A6" />
                <stop offset="1" stopColor="#A8893F" />
            </linearGradient>
        </defs>
        <path d="M34 0l17 30H17z M17 30l17 30H0z M51 30l17 30H34z" fill="url(#triforce-gold)" />
    </svg>
);
