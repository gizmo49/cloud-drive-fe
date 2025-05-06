import React from 'react';

type PreviewProps = {
  url: string;
  mimeType: string;
};

const Preview: React.FC<PreviewProps> = ({ url, mimeType }) => {
  if (!url || !mimeType) {
    return <div className="text-red-500">Missing file URL or MIME type</div>;
  }

  if (mimeType.startsWith('image/')) {
    return <img src={url} alt="Preview" className="max-w-full max-h-96 rounded shadow" />;
  }

  if (mimeType.startsWith('video/')) {
    return (
      <video controls className="max-w-full max-h-96 rounded shadow">
        <source src={url} type={mimeType} />
        Your browser does not support the video tag.
      </video>
    );
  }

  if (mimeType.startsWith('audio/')) {
    return (
      <audio controls className="w-full">
        <source src={url} type={mimeType} />
        Your browser does not support the audio element.
      </audio>
    );
  }

  if (mimeType === 'application/pdf') {
    return (
      <iframe
        src={url}
        className="w-full h-[600px] rounded shadow"
        title="PDF Preview"
        frameBorder="0"
      />
    );
  }

  if (mimeType.startsWith('text/')) {
    return (
      <iframe
        src={url}
        className="w-full h-[600px] rounded shadow bg-white"
        title="Text File Preview"
        frameBorder="0"
      />
    );
  }

  return (
    <div className="p-4 border border-gray-300 rounded bg-gray-50 text-gray-600">
      Preview not available for this file type: <code>{mimeType}</code>
    </div>
  );
};

export default Preview;
