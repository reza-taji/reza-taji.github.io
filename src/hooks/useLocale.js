// Re-export barrel. The real implementation lives in useLocale.jsx because it
// contains JSX (<LocaleContext.Provider/>). This .js file stays pure JS so
// esbuild/rollup parse it as JS, while all existing `from './useLocale.js'`
// imports continue to resolve unchanged.
export * from './useLocale.jsx';
