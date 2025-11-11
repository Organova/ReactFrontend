export const GUEST_ROLES = [
    'Gast',
    'VIP',
    'Sponsor',
    'Arbeiter'
] as const;

export const GUEST_STATUSES = [
    'Zugesagt',
    'Abgesagt',
    'Ausstehend'
] as const;

export const ROLE_COLORS = {
    Gast: '#10b981',
    VIP: '#f59e0b',
    Sponsor: '#8b5cf6',
    Presenter: '#3b82f6',
    Arbeiter: '#ef4444'
};

export const STATUS_COLORS = {
    Zugesagt: '#10b981',
    Abgesagt: '#ef4444',
    Ausstehend: '#f59e0b'
};