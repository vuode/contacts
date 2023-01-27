import { useCallback, useEffect, useMemo, useState } from "react"

export const useSlowLoad = <T>(data: T[], count: number) => {
  const [openCount, setOpenCount] = useState(count)

  const openData = useMemo(() => data.slice(0, openCount), [openCount, data])

  const reachedEnd = useMemo(() => data.length <= openCount, [openCount, data])

  const loadMore = useCallback(
    () => setOpenCount((previous) => reachedEnd ? previous : previous + count),
    [setOpenCount, reachedEnd]
  )

  useEffect(() => {
    setOpenCount(count)
  }, [data, count])

  return [openData, loadMore, reachedEnd] as const
}
