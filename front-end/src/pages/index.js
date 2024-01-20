import Image from "next/image"
import { Inter } from "next/font/google"
import { useState } from "react"
import { useGetQuery, usePostQuery } from "@/hooks/useQueryHooks"
import { Table } from "@/components/table"
import InputField from "@/components/fields/InputField"
import Switch from "@/components/switch"
import ReactSelect from "react-select"
import ScrollUp from "@/components/Common/ScrollUp"
import Hero from "@/components/Hero"
import Features from "@/components/Features"
import Video from "@/components/Video"
import Brands from "@/components/Brands"
import AboutSectionOne from "@/components/About/AboutSectionOne"
import AboutSectionTwo from "@/components/About/AboutSectionTwo"
import Testimonials from "@/components/Testimonials"
import Blog from "@/components/Blog"
import Contact from "@/components/Contact"
import Header from "@/components/Header"
import ScrollToTop from "@/components/ScrollToTop"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const [firstInput, setFirstInput] = useState({})
  const [selectedCategory, setSelectedCategory] = useState([])
  const { mutateAsync, isLoading } = usePostQuery({
    url: "/eligible_functions",
  })
  console.log("selectedCategory >>>> ", selectedCategory)
  const [category, setCategory] = useState([])
  async function handleFirstInput() {
    try {
      const { data } = await mutateAsync(firstInput)
      console.log("data >>>> ", data)
      const keys = data[0][1]
      const values = data[0][0]
      const categoryValue = keys.map((key, i) => {
        return { value: values[i], label: key }
      })
      console.log("categoryValue >>>> ", categoryValue)
      setCategory(categoryValue)
    } catch (e) {
      console.log(e)
    }
  }
  const data = useGetQuery("/health-check", "/health-check", {})

  return (
    <div>
      <Header />
      <ScrollUp />
      <Hero />
      <Features />
      <Video />
      <Brands />
      <AboutSectionOne />
      <AboutSectionTwo />
      <Testimonials />
      <Blog />
      <Contact />
      <ScrollToTop />
    </div>
  )
}
