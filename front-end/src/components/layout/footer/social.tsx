import { Text } from "@/components/ui/text";
import React from "react";
import X from "@/svg/X.svg";
// import LinkedIn from "@/svg/linkedin.svg";
import Instagram from "@/svg/instagram.svg";
import WhatsApp from "@/svg/whatsapp.svg";
import Link from "next/link";

function Social() {
  const socialData = [
    {
      name: "WhatsApp",
      icon: WhatsApp,
    },
    {
      name: "Instagram",
      icon: Instagram,
    },
    {
      name: "LinkedIn",
      icon: Instagram,
    },
    {
      name: "X",
      icon: X,
    },
  ];
  return (
    <div className="grid w-full md:grid-cols-4 grid-cols-1 gap-12">
      {socialData.map((item) => (
        <Item key={item.name} name={item.name} icon={item.icon} />
      ))}
    </div>
  );
}

function Item({ name, icon: Icon }: { name: string; icon: any }) {
  return (
    <Link
      target="_blank"
      href="/"
      className="border-t border-white pt-[30px] flex justify-between items-end hover:!text-primary text-dark hover:border-primary duration-200"
    >
      <Text size="xs" className="text-current">
        {name}
      </Text>
      <Icon className="fill-current" />
    </Link>
  );
}

export default Social;
