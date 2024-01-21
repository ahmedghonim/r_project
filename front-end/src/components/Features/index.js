import SectionTitle from "../Common/SectionTitle"
import SingleFeature from "./SingleFeature"
import featuresData from "./featuresData"

const Features = () => {
  return (
    <>
      <section id="features" className="py-16 md:py-20 lg:py-28">
        <div className="container">
          <SectionTitle
            title="Main Features"
            paragraph='While this sheet improved data prep, like other tools, it converted values individually: Intervention & control groups, pre- & post-intervention, then calculating M & SD change. We needed a tool offering several conversions combined with simultaneous conversion of an outcome data per study in a single step. This sparked the development of the "IMedRA-ACR conversion tool," condensing 5-10 steps into one. It featured:'
            center
          />

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((feature) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Features
