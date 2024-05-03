import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/textarea";
import React from "react";

function ContactForm() {
  return (
    <div className="flex flex-col gap-4 flex-1 h-full w-full">
      <Input name="full_name" label="Full Name" />
      <Input name="email" type="email" label="Email" />
      <Input name="phone_number" type="tel" label="Phone Number" />
      <TextArea name="message" label="Message" rows={10} />
      <Button full>Submit</Button>
    </div>
  );
}

export default ContactForm;
