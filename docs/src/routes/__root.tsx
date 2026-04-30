import { TanStackDevtools } from '@tanstack/react-devtools';
import { createRootRoute, HeadContent, Navigate, Outlet, Scripts } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { RootProvider } from 'fumadocs-ui/provider/tanstack';
import { TooltipProvider } from '@/components/ui/tooltip';

import '../styles/global.css';
import { GeneralError } from '@/error/general-error';
// import { GoeyToaster } from '@/components/goey-toaster';

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: GeneralError,
  notFoundComponent: () => <Navigate to="/404" />,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <RootProvider
          theme={{
            attribute: 'class',
            defaultTheme: 'system',
            disableTransitionOnChange: true,
            enableSystem: true,
          }}
        >
          <TooltipProvider delayDuration={240}>{children}</TooltipProvider>
          {/* <GoeyToaster duration={5000} position="top-right" /> */}
        </RootProvider>
        {import.meta.env.MODE === 'development' && (
          <TanStackDevtools
            config={{
              position: 'bottom-right',
            }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
        )}
        <Scripts />
      </body>
    </html>
  );
}
