// CHÚ Ý CHẤM ĐIỂM - Lab 4 (Bài 1): Sử dụng Interface như là 1 function
// Định nghĩa một function có tham số tùy chọn và không trả về giá trị (void)
export interface RouteHandler {
  (params?: Record<string, string>): void;
}

export interface Route {
  path: string;
  handler: RouteHandler;
}

export class Router {
  private routes: Route[] = [];
  private notFoundHandler?: () => void;

  addRoute(path: string, handler: RouteHandler): Router {
    this.routes.push({ path, handler });
    return this;
  }

  setNotFound(handler: () => void): Router {
    this.notFoundHandler = handler;
    return this;
  }

  navigate(path: string): void {
    window.location.hash = path;
  }

  start(): void {
    window.addEventListener('hashchange', () => this.resolve());
    window.addEventListener('load', () => this.resolve());
    this.resolve();
  }

  private resolve(): void {
    const hash = window.location.hash.slice(1).split('?')[0] || '/';
    
    for (const route of this.routes) {
      const params = this.matchRoute(route.path, hash);
      if (params !== null) {
        // Parse search params if any
        const urlParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
        urlParams.forEach((value, key) => {
          params[key] = value;
        });
        route.handler(params);
        return;
      }
    }

    if (this.notFoundHandler) {
      this.notFoundHandler();
    }
  }

  private matchRoute(routePath: string, actualPath: string): Record<string, string> | null {
    const routeParts = routePath.split('/');
    const actualParts = actualPath.split('/');

    if (routeParts.length !== actualParts.length) return null;

    const params: Record<string, string> = {};

    for (let i = 0; i < routeParts.length; i++) {
      if (routeParts[i].startsWith(':')) {
        params[routeParts[i].slice(1)] = actualParts[i];
      } else if (routeParts[i] !== actualParts[i]) {
        return null;
      }
    }

    return params;
  }
}
