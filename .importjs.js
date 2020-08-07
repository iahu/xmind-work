module.exports = {
  environments: ['browser'],
  globals: ['Pagckage', 'Npm'],
  namedExports: {
    lodash: ['omit', 'debounce', 'memoize', 'groupBy'],
    react: ['useEffect', 'useState', 'useRef', 'useCallback', 'useMemo'],
    'react-router-dom': ['Link']
  },
  groupImports: true,
  sortImports: true,
  danglingCommas: false,
  stripFileExtensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
  importStatementFormatter({ importStatement }) {
    return importStatement.replace(/;$/, '')
  }
}
