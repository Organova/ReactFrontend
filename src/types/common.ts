export type SidebarItem = {
    id: string;
    text: string;
    path: string;
    icon: any;
    alert?: boolean;
    active: boolean;
};

export type Event = {
    eventId: string,
    name: string,
    description: string,
    startDate: Date,
    endDate: Date,
    timeZone: string
};

export type PaginatedEventsResponse = {
    data: Event[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
    hasNext: boolean;
    hasPrevious: boolean;
};

export type User = {
    id: string
    username: string
}

export type Login = {
    token: string
    user: User
}

export type Signup = {
    token: string
    user: User
    defaultTenantId: string
}

export type UserInfoSignup = {
    "username": string,
    "password": string,
    "email": string,
    "firstName": string,
    "lastName": string
}

export type UserInfoLogin = {
    "username": string,
    "password": string
}

export type CreateEventDto = {
    name: string;
    type: string;
    description: string;
    estimatedGuests: number;
    startDate: string;   // ISO
    endDate: string;     // ISO
    timeZone: string;
    guestIds?: string[];
};