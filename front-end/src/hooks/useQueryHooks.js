import { useQuery, useMutation, useQueryClient } from "react-query"
import useAxios from "./useAxios"
import { toast } from "react-toastify"

/**
 * @param name name of cache item
 * @param url api url
 * @param options {apiType} default is salon
 */
export function useGetQuery(name, url, options) {
  const axios = useAxios({
    contentType: "application/json",
  })

  const queryOptions = { retry: 1, ...options }
  return useQuery(name, async () => await axios.get(url), {
    onError: (error) => {},
    ...queryOptions,
  })
}

/**
 * @param url api url
 * @param contentType 'application/json' | 'multipart/form-data'
 * @param options {apiType} default is salon
 */
export function usePostQuery({ url, contentType }) {
  const axios = useAxios({ contentType })
  const queryClient = useQueryClient()

  return useMutation(async (values) => await axios.post(url, values), {
    onSuccess: async () => {
      const pageUrl = "?page=1"
      const astricsUrl = "?page=*"
      await queryClient.invalidateQueries(url + pageUrl)
      await queryClient.invalidateQueries(url + astricsUrl)
    },
  })
}

/**
 * @param url api url
 * @param contentType 'application/json' | 'multipart/form-data'
 */
export function usePutQuery({ url, contentType }) {
  const axios = useAxios({ contentType })

  const queryClient = useQueryClient()

  return useMutation(async (values) => await axios.put(url, values), {
    onSuccess: async () => {
      const pageUrl = "?page=1"
      const astricsUrl = "?page=*"
      // for refetch data
      await queryClient.invalidateQueries(url.split("/")[0] + pageUrl)
      await queryClient.invalidateQueries(url.split("/")[0] + astricsUrl)
      // handel stop delete image
    },
  })
}

export function useDeleteQuery() {
  const axios = useAxios({
    contentType: "application/json",
  })

  const queryClient = useQueryClient()

  return useMutation(
    async (url) => {
      await axios.delete(url)
      const pageUrl = "?page=1"
      const astricsUrl = "?page=*"
      await queryClient.invalidateQueries(url.split("/")[0] + pageUrl)
      await queryClient.invalidateQueries(url.split("/")[0] + astricsUrl)
    },
    {
      onSuccess: () => {
        toast.success(`${"delete"}`)
      },
    }
  )
}
