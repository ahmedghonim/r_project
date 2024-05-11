import { Text } from "@/components/ui/text";
import React from "react";
import X from "@/svg/X";
import LinkedIn from "@/svg/linkedIn";
import Instagram from "@/svg/instagram";
import WhatsApp from "@/svg/whatsapp";
import Phone from "@/svg/phone";
import Email from "@/svg/email";
import Location from "@/svg/location";
function ContactInfo() {
  return (
    <div className="w-full flex  flex-col bg-[#1E3040] p-8 justify-start relative flex-1 h-full">
      <div className="space-y-3">
        <Text variant="white" size="te" as="h1">
          Let’s Talk with us
        </Text>
        <Text size="base" as="p" className="w-[80%]">
          Have questions or feedback? Reach out to our team at Treatmeta!{" "}
        </Text>
      </div>

      <ul className="pt-[48px] flex flex-col gap-6 items-start">
        <Text size="base" as="li" className="gap-3">
          <span>
            <Location />
          </span>
          5588 Andy Hills Pfannerstillview
        </Text>

        <Text size="base" as="li" className="gap-3">
          <span>
            <Phone />
          </span>
          (555) 555-5555
        </Text>

        <Text size="base" as="li" className="gap-3">
          <span>
            <Email />
          </span>
          0a0Z3@example.com
        </Text>
      </ul>
      <div className="pt-8 space-y-3">
        <Text size="base" as="p">
          Our Social:
        </Text>
        <div className="flex gap-6">
          <a href="https://www.whatsapp.com/" target="_blank">
            <WhatsApp className="fill-primary" />
          </a>
          <a href="https://www.instagram.com/" target="_blank">
            <Instagram className="fill-primary" />
          </a>

          <a href="https://www.linkedin.com/" target="_blank">
            <LinkedIn className="fill-primary" />
          </a>

          <a href="https://www.x.com/" target="_blank">
            <X className="fill-primary" />
          </a>
        </div>
      </div>
      <div className="bg-primary absolute bottom-0 right-0 w-[163px] h-[166px]" />
    </div>
  );
}

export default ContactInfo;
