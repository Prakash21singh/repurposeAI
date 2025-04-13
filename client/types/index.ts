// # Types for the Sidebar nav
export interface ISidebarNav {
  navMain: {
    title: string;
    url?: string;
    items: {
      title: string;
      url?: string;
    }[];
  }[];
}
