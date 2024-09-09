import React from 'react';

export default function Layout() {
  return (
    <div className="w-[70%] h-screen overflow-y-scroll bg-gray-100 p-4">
      {/* Add your content here like images, blogs, news updates, etc. */}
      <h1 className="text-2xl font-bold mb-4">Content Section</h1>
      <p className="mb-4">This section can contain blog posts, news updates, events, or other content. It will scroll independently of the chatbox on the right side.</p>
      <img src="https://via.placeholder.com/600x300" alt="Blog Post" className="mb-4"/>
      <h2 className="text-xl font-semibold mb-2">Blog Title</h2>
      <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.</p>
      <div>
        {/* Add more scrollable content */}
      </div>
    </div>
  );
}
