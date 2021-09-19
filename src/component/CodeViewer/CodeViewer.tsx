import React from "react";
import CodeLineViewer from "./CodeLineViewer/CodeLineViewer";

interface Props {
  diffHunk: string;
  fileExtension?: string;
}

const CodeViewer = ({ diffHunk, fileExtension = "" }: Props) => {
  return (
    <div>
      {diffHunk.split("\n").map((rawCodeLine, index) => (
        <CodeLineViewer
          key={index}
          fileExtension={fileExtension}
          rawCodeLine={rawCodeLine}
        />
      ))}
    </div>
  );
};

export default CodeViewer;
