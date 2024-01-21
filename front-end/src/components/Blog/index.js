import SectionTitle from "../Common/SectionTitle"
import SingleBlog from "./SingleBlog"
import blogData from "./blogData"

const Blog = () => {
  return (
    <section
      id="blog"
      className="bg-gray-light dark:bg-bg-color-dark py-16 md:py-20 lg:py-28"
    >
      <div className="container">
        <SectionTitle
          title="Our Latest Blogs"
          paragraph='While this sheet improved data prep, like other tools, it converted values individually: Intervention & control groups, pre- & post-intervention, then calculating M & SD change. We needed a tool offering several conversions combined with simultaneous conversion of an outcome data per study in a single step. This sparked the development of the "IMedRA-ACR conversion tool," condensing 5-10 steps into one. It featured:'
          center
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
          {blogData.map((blog) => (
            <div key={blog.id} className="w-full">
              <SingleBlog blog={blog} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Blog
