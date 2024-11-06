import { useCallback, useEffect, useMemo } from "react"
import { type NavigateOptions, useSearchParams } from "react-router"

type NewQuery<T> = T | null | undefined // passing null or undefined will remove the query

/**
 * Example `const [ searchQuery, setSearchQuery ] = useQueryParam('search')`
 */
export function useQueryParam<Ret extends string>(
  key: string,
  navigateOpts?: NavigateOptions & { defaultValue?: Ret },
): [Ret | null, (newQuery: NewQuery<unknown>) => void] {
  const [searchParams, setSearchParams] = useSearchParams()

  const paramValue = searchParams.get(key) ?? navigateOpts?.defaultValue
  const value = useMemo(() => paramValue, [paramValue])

  useEffect(
    function updateDefaultValue() {
      if (!searchParams.has(key) && navigateOpts?.defaultValue) {
        searchParams.set(key, navigateOpts?.defaultValue)
        setSearchParams(searchParams)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchParams, navigateOpts?.defaultValue, key],
  )

  const setValue = useCallback(
    (newValue: NewQuery<unknown>) => {
      setSearchParams((newSearchParams) => {
        if (newValue === null || newValue === undefined) {
          newSearchParams.delete(key)
        } else {
          newSearchParams.set(key, String(newValue))
        }
        return newSearchParams
      }, navigateOpts)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key, setSearchParams],
  )

  return [value, setValue] as [Ret | null, (newQuery: NewQuery<unknown>) => void]
}

export function useBooleanQueryParam(key: string, navigateOpts?: NavigateOptions): [boolean, (newQuery: NewQuery<boolean>) => void] {
  const [query, setQuery] = useQueryParam(key, navigateOpts)
  const value = useMemo(() => {
    // `?query=true`
    if (query === "true") return true
    // `?query` will give "", so we consider that true, because the query exist in the url
    if (query === "") return true
    return false
  }, [query])

  return [value, setQuery]
}

export function useArrayQueryParam(key: string, navigateOpts?: NavigateOptions): [string[], (newQuery: NewQuery<unknown[]>) => void] {
  const [query, setQuery] = useQueryParam(key, navigateOpts)

  const value = useMemo(() => {
    if (!query) return []
    return query.split(",")
  }, [query])

  return [value, setQuery]
}
