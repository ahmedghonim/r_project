import React from "react";
import ContactForm from "@/components/view/contact/contact-form";
import ContactInfo from "@/components/view/contact/contact-info";

function ContactUsPage() {
  return (
    <div className="md:h-screen flex flex-col md:flex-row items-center  md:gap-6 gap-8 pt-[15%]  pb-[12%]">
      <ContactInfo />

      <ContactForm />
    </div>
  );
}

export default ContactUsPage;
