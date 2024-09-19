import * as React from 'react';

import { Outlet, createRootRoute } from '@tanstack/react-router';

import { NavBar } from '@/components/layout/nav-bar';

export const Route = createRootRoute({
  component: () => (
    <React.Fragment>
      <NavBar />
      <Outlet />
    </React.Fragment>
  ),
});
