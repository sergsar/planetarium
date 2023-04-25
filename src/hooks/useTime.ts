import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { clockSelector } from '../contexts/clockSelectors'

export const useTime = () => {
  const clock = useRecoilValue(clockSelector)
  const [value, setValue] = useState(clock.getTime())

  useEffect(() => {
    const interval = setInterval(() => setValue(clock.getTime()), 100)
    return () => clearInterval(interval)
  }, [])

  return value
}
