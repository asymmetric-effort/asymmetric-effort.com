declare module 'specifyjs-framework' {
  export function createElement(type: any, props: any, ...children: any[]): any;
  export function useState<T>(initial: T | (() => T)): [T, (v: T | ((prev: T) => T)) => void];
  export function useEffect(effect: () => void | (() => void), deps?: any[]): void;
  export function useHead(meta: { title?: string; description?: string }): void;
  export function Router(props: { children?: any }): any;
  export function Route(props: { path: string; component: any; exact?: boolean }): any;
  export function Link(props: { to: string; className?: string; activeClassName?: string; children?: any }): any;
  export function useRouter(): { pathname: string; params: Record<string, string>; navigate: (to: string) => void };
  export function useParams(): Record<string, string>;
  export function useNavigate(): (to: string, options?: { replace?: boolean }) => void;
}

declare module 'specifyjs-framework/dom' {
  export function createRoot(container: Element | null): { render(element: any): void };
}
