export type SidebarItem = {
  id: string;
  text: string;
  path: string;
  icon: any;
  alert?: boolean;
  active: boolean;
};

export type Event = {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
};
