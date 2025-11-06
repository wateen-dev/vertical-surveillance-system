export interface SubMenuItem {
  title: string;
  icon: string;
  link: string;
}

export interface SidenavItem {
  title: string;
  icon: string;
  submenu: SubMenuItem[];
}
