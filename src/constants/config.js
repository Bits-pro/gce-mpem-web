import { UserRole } from "../utils/auth.roles";

export const defaultMenuType = 'menu-default' // 'menu-default', 'menu-sub-hidden', 'menu-hidden';
export const adminRoot = '/app';
export const searchPath = `${adminRoot}/pages/miscellaneous/search`
export const apiUrl = 'https://api.coloredstrategies.com';

export const subHiddenBreakpoint = 1440
export const menuHiddenBreakpoint = 768

export const defaultLocale = 'fr'
export const defaultDirection = 'ltr'
export const localeOptions = [
  { id: 'fr', name: 'Français', direction: 'ltr' },
  { id: 'ar', name: 'العربية', direction: 'rtl' }
]

export const firebaseConfig = {
  apiKey: "AIzaSyB4TSHQkQhAf2XIanFZOZ5KOu16_p1pHHA",
  authDomain: "gce-mpem.firebaseapp.com",
  projectId: "gce-mpem",
  storageBucket: "gce-mpem.appspot.com",
  messagingSenderId: "862509280534",
  appId: "1:862509280534:web:4a906626c4fcecc68e7437",
  measurementId: "G-Z41W2YF9PX"
};




export const currentUser = {
  id: 1,
  title: 'Sarah Kortney',
  img: '/assets/img/profiles/l-1.jpg',
  date: 'Last seen today 15:24',
  role: UserRole.Admin
}

export const isAuthGuardActive = false
export const themeRadiusStorageKey = 'theme_radius'
export const themeSelectedColorStorageKey = 'theme_selected_color'
export const defaultColor = 'light.orangecarrot'
export const colors = ['bluenavy', 'blueyale', 'blueolympic', 'greenmoss', 'greenlime', 'purplemonster', 'orangecarrot', 'redruby', 'yellowgranola', 'greysteel']
