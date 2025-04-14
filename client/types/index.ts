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


export interface IResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface IUser {
  id: string;
  name?: string;
  email: string;
}
