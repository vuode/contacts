import {useCallback, useState} from 'react'

const debounce = (callback: VoidFunction, timeout?: number) => {
  let timer: NodeJS.Timeout

  return () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      callback()
    }, timeout ?? Math.round(Math.random() * 1000) + 300)
  }
}

export const useScrollLoad = (loadMore: VoidFunction, reachedEnd: boolean) => {
  const [loading, setLoading] = useState(false)

  const debouncedLoadMore = useCallback(
    debounce(() => {
      loadMore()
      setLoading(false)
    }),
    [loadMore],
  )

  const handler = useCallback(() => {
    setLoading(true)
    debouncedLoadMore()
  }, [debouncedLoadMore])

  const scrollHandler = useCallback(
    (event: React.UIEvent) => {
      const {scrollTop, scrollHeight, clientHeight} = event.currentTarget
      const height = scrollHeight - clientHeight

      const offsetBottom = height - scrollTop

      if (!reachedEnd && offsetBottom < 20) {
        handler()
      }
    },
    [handler],
  )

  return [scrollHandler, loading] as const
}
