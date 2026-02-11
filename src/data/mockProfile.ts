import { UserProfile } from '@/types/profile';

export const USER_PROFILE: UserProfile = {
  id: 'u1',
  name: 'Alex "Drift" Morgan',
  avatar: 'https://ui-avatars.com/api/?name=Alex+Morgan&background=d1ff6e&color=000&size=200',
  isVerified: true,
  location: 'Tokyo, Japan',
  memberSince: '2019',
  garage: [
    {
      id: 'c1',
      make: 'Nissan',
      model: 'GT-R R34',
      year: '2002',
      image: 'https://images.unsplash.com/photo-1611859266238-4b98091d9d9b?q=80&w=3363&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      health: 'All Systems Go'
    },
    {
      id: 'c2',
      make: 'Toyota',
      model: 'Supra MK4',
      year: '1998',
      image: 'https://images.unsplash.com/photo-1541348263662-e068662d82af?q=80&w=3387&auto=format&fit=crop',
      health: 'Maintenance Due'
    },
    {
        id: 'c3',
        make: 'Mazda',
        model: 'RX-7 FD',
        year: '1995',
        image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=3540&auto=format&fit=crop',
        health: 'In Setup'
      },
  ],
  stats: {
    garageHealth: 'Excellent',
    totalKm: '12,450',
    communityScore: '98',
    maintenanceStatus: 'Good'
  }
};
