import * as React from 'react';

export interface HeaderProps {
  children: React.ReactNode;
}

export function Header(props: HeaderProps) {
  return <h1>{props.children}</h1>;
}

Header.displayName = 'Header';
