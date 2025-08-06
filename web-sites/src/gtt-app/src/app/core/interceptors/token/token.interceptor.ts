import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const user = localStorage.getItem('user');
  const isAuthEndpoint =
    req.url.toLowerCase().includes('login') ||
    req.url.toLowerCase().includes('register');

  if (user && !isAuthEndpoint) {
    const token = JSON.parse(user).token;
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  return next(req);
};
