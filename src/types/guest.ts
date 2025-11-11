export interface Guest {
    id: string;
    vorname: string;
    nachname: string;
    email: string;
    rolle: 'Gast' | 'VIP' | 'Sponsor' | 'Arbeiter';
    status: 'Zugesagt' | 'Abgesagt' | 'Ausstehend';
}