export interface Car {
    id: string;
    make: string;
    model: string;
    year: string;
    image: string;
    health: 'All Systems Go' | 'Maintenance Due' | 'In Setup';
  }

  export interface UserStats {
    garageHealth: string;
    totalKm: string;
    communityScore: string;
    maintenanceStatus: 'Good' | 'Warning' | 'Critical';
  }

  export interface UserProfile {
    id: string;
    name: string;
    avatar: string;
    isVerified: boolean;
    location: string;
    memberSince: string;
    garage: Car[];
    stats: UserStats;
  }
