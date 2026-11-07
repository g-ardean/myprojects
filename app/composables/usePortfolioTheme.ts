export type PortfolioTheme = 'dark' | 'light'

export function usePortfolioTheme() {
  const theme = useState<PortfolioTheme>('portfolio-theme', () => 'dark')

  if (import.meta.client) {
    onMounted(() => {
      const savedTheme = window.localStorage.getItem('portfolio-theme')
      if (savedTheme === 'light' || savedTheme === 'dark') {
        theme.value = savedTheme
      }
      document.documentElement.dataset.theme = theme.value
    })

    watch(theme, (value) => {
      document.documentElement.dataset.theme = value
      window.localStorage.setItem('portfolio-theme', value)
    })
  }

  useHead({
    htmlAttrs: {
      'data-theme': theme
    }
  })

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  return { theme, toggleTheme }
}
