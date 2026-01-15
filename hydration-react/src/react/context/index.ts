import { createContext, createElement, ReactNode } from 'react';

export const Context = createContext<unknown>({});

export const ContextProvider = ({ children, ...props }: { children: ReactNode }) =>
  createElement(Context.Provider, { key: '__CONTEXT__PROVIDER__', value: { ...props } }, children);
