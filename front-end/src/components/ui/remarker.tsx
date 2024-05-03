import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import RemarkMathPlugin from "remark-math";

/**
 * RemarkFC is a React functional component that renders
 * a Markdown document using React Markdown library. It
 * uses remark-gfm and remark-math plugins to handle GitHub
 * flavored markdown and mathematical equations respectively.
 * It also uses rehype-katex plugin to render LaTeX equations.
 *
 * @param {RemarkFCProps} props - The properties of the component
 * @returns {JSX.Element} The rendered markdown document
 */
type RemarkFCProps = {
  doc: string;
};

const RemarkFC = ({ doc }: RemarkFCProps): JSX.Element => {
  /**
   * Render the markdown document
   * @returns {JSX.Element} The rendered markdown document
   */
  return (
    <div className="markdown-content">
      <Markdown
        remarkPlugins={[remarkGfm, RemarkMathPlugin]}
        rehypePlugins={[rehypeKatex]}
      >
        {doc}
      </Markdown>
    </div>
  );
};

export default RemarkFC;
