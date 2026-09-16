import type { ReactNode } from 'react';

type AuthTemplateProps = {
  children: ReactNode;
};

/**
 * Template: centered auth column without data fetching.
 * Login/Register pages compose this with form organisms.
 */
export function AuthTemplate({ children }: AuthTemplateProps) {
  return <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-4">{children}</div>;
}
