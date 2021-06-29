import { useContext, useEffect } from 'react'
import { ThemeContext as StyledThemeContext } from 'styled-components'
import { ThemeContext } from 'contexts/ThemeContext'

const useTheme = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext)

  useEffect(() => {
    const postMsg = {'key': 'IS_DARK', 'value': JSON.stringify(isDark)}
    // @ts-ignore
    postCrossDomainMessage(postMsg)
  }, [isDark])
  const theme = useContext(StyledThemeContext)
  return { isDark, toggleTheme, theme }
}

export default useTheme
