"use client";
import React, { useState } from "react";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import Link from "next/link";
import RemarkFC from "@/components/ui/remarker";
import Burger from "@/svg/burger.svg";
import Close from "@/svg/close.svg";
const GuidePage = () => {
  const [open, setOpen] = useState(true);
  const doc = `---
# Heading 1

This is a paragraph with some **bold text** and *italic text*.

## Heading 2

This is another paragraph. You can use [links](https://example.com) and even ~~strikethrough~~ text.

### Heading 3

Here's a list:

- Item 1
- Item 2
    - Subitem A
    - Subitem B
    1. Sub-subitem 1
    2. Sub-subitem 2

#### Heading 4

A blockquote:

> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

##### Heading 5

A table:

| Name     | Age | Location   |
|----------|-----|------------|
| John     | 25  | New York   |
| Sarah    | 30  | Los Angeles|

###### Heading 6

Here's some code:

greet('World');

# Mathematical Equations

## Inline Equation
The Pythagorean theorem is expressed as $a^2 + b^2 = c^2$.

## Display Equation
The equation of a circle with radius $r$ and center $(h, k)$ is:
$$
(x - h)^2 + (y - k)^2 = r^2
$$
- [ ] Task list 1
- [ ] Pending task list 2
- [x] Completed task list 3
- [x] Completed task list 4 
      `;

  return (
    <div className="pt-[20%] grid grid-cols-12 gap-6  h-fit">
      {open && (
        <div className="md:col-span-3 col-span-12 flex md:relative flex-col gap-3 fixed bottom-16 md:bottom-0 right-8 md:right-0  bg-[#202835] md:bg-transparent p-3 md:p-0 rounded">
          <Item label="Heading 1" isActive={true} />
          <Item label="Heading 2" />
        </div>
      )}

      <button
        className="fixed right-4 top-[95%] bg-primary z-50 size-7 rounded-full flex md:hidden justify-center items-center"
        onClick={() => setOpen(!open)}
      >
        {!open ? <Burger /> : <Close />}
      </button>

      <div className="md:col-span-9 col-span-12 bg-[#48647D3D] p-4 rounded overflow-hidden">
        <RemarkFC doc={doc} />
      </div>
    </div>
  );
};

function Item({ label, isActive }: { label: string; isActive?: boolean }) {
  return (
    <Link
      href={`/guide?title=${label}`}
      className={cn("text-start bg-[#48647D3D] px-4 py-3 rounded", {
        "bg-primary": isActive,
      })}
    >
      <Text as="h2" size="et" className="font-bold">
        {label}
      </Text>
    </Link>
  );
}
export default GuidePage;
