import SectionTitle from "../Common/SectionTitle";
import SingleBlog from "./SingleBlog";
import blogData from "./blogData";

const Conversions = () => {
  return (
    <section id="blog" className="bg-gray-light dark:bg-bg-color-dark py-16">
      <div className="container">
        <SectionTitle
          title="Our Conversions"
          paragraph="Our Conversions desc"
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
  );
};

export default Conversions;
