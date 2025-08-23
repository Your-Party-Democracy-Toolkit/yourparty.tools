export default defineNuxtPlugin(() => {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  const router = useRouter();

  let hasTrackedInitial = false;

  router.afterEach(() => {
    if (!hasTrackedInitial) {
      hasTrackedInitial = true;
      // Skip initial navigation; the script tracks first pageview automatically.
      return;
    }

    // Trigger Vercel Web Analytics pageview on client-side route changes.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - global injected by Vercel Analytics script
    if (typeof window !== 'undefined' && typeof window.va === 'function') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.va('pageview');
    }
  });
});


