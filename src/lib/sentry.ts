import * as Sentry from "@sentry/react";

export function initSentry() {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,

    environment: import.meta.env.MODE,

    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],

    tracesSampleRate: 1.0,

    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,

    beforeSend(event) {
      if (event.exception?.values?.[0]?.value?.includes('Network Error')) {
        return null;
      }
      return event;
    },

    initialScope: {
      tags: {
        app: "asmae-elgasmi-platform",
        company: "ASMAE EL GASMI.e.U"
      }
    }
  });
}

export const SentryErrorBoundary = Sentry.ErrorBoundary;

export function captureError(error: Error, context?: Record<string, any>) {
  Sentry.captureException(error, { extra: context });
}

export function captureEvent(name: string, data?: Record<string, any>) {
  Sentry.captureMessage(name, {
    level: 'info',
    extra: data
  });
}

export function trackPayment(status: 'started' | 'success' | 'failed', data: any) {
  Sentry.addBreadcrumb({
    category: 'payment',
    message: `Payment ${status}`,
    level: status === 'failed' ? 'error' : 'info',
    data
  });

  if (status === 'failed') {
    captureError(new Error(`Payment failed: ${data.error}`), data);
  }
}
