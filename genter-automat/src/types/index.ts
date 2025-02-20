export interface HeaderProps {
    title: string;
    links: Array<{ name: string; url: string }>;
}

export interface FooterProps {
    copyright: string;
    socialLinks: Array<{ platform: string; url: string }>;
}

export interface AppProps {
    // Define any props that the App component might need
}