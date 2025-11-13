import React from "react";

const IframeEmbed = ({ src, title, height = "calc(100vh - 140px)" }) => {
  if (!src) {
    return (
      <div style={{ padding: 16 }}>
        <p>Missing iframe URL.</p>
      </div>
    );
  }

  return (
    <div className="iframe-wrap" style={{ height }}>
      <iframe
        title={title}
        src={src}
        frameBorder="0"
        className="iframe"
      />
    </div>
  );
};

export default IframeEmbed;

