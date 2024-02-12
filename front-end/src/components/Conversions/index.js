import SectionTitle from "../Common/SectionTitle";
import SingleConversion from "./SingleBlog";
import conversionsList from "./blogData";

const Conversions = () => {
  return (
    <section id="blog" className="bg-gray-light dark:bg-bg-color-dark py-16">
      <div className="container">
        <SectionTitle
          title="Our Conversions"
          paragraph="Categories and list of conversions: "
          center
        />

        <div className="flex flex-wrap justify-center gap-9">
          {conversionsList.map((blog) => (
            <div key={blog.id} className="w-[30%]">
              <SingleConversion blog={blog} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Conversions;
