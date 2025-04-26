/** @satisfies {import("prettier").Config} */
const config = {
  trailingComma: 'all',
  singleQuote: true,
  printWidth: undefined,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: ['^react', '^next', '^@/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

export default config;
