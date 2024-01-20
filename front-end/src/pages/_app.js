import "@/styles/globals.css"
import { QueryClient, QueryClientProvider } from "react-query"
import { useRef } from "react"

export default function App({ Component, pageProps }) {
  const queryClint = useRef(new QueryClient())
  return (
    <QueryClientProvider client={queryClint.current}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
