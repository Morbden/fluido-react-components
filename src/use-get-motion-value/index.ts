import { MotionValue } from 'framer-motion'
import { useEffect, useState } from 'react'

interface UseGetMotionValueType<T = any> {
  (mv: MotionValue<T>, cast?: (value: T) => T): T
}

const useGetMotionValue: UseGetMotionValueType = (mv, cast) => {
  const [value, setValue] = useState(mv.get())

  useEffect(() => {
    return mv.onChange((v) => {
      if (cast) setValue(cast(v))
      else setValue(v)
    })
  }, [!!mv])

  return value
}

export default useGetMotionValue