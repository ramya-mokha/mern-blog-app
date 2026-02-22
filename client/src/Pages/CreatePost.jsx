
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState(null);

  const createPost = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);

    if (files) {
      data.set("file", files);
    }

    const response = await fetch('http://localhost:3000/create', {
      method: "POST",
      body: data,
      credentials: "include"
    });

    if (response.ok) {
      navigate('/');
    } else {
      alert("Error Occured");
    }
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }],
      ['link', 'image'],
      ['clean']
    ]
  };

  const formats = [
    'header', 'bold', 'italic', 'underline',
    'strike', 'list', 'link', 'image'
  ];

  return (
    <form onSubmit={createPost} className="flex flex-col gap-5 mt-10 mx-auto max-w-3xl min-h-screen p-3">
     <h1 className="text-2xl font-semibold">Post Details</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        className="border py-2 rounded-sm px-2"
        onChange={e => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Summary"
        value={summary}
        className="border py-2 rounded-sm px-2"
        onChange={e => setSummary(e.target.value)}
      />
      
       <label htmlFor="file"  className="border py-2 rounded-sm px-2 cursor-pointer">
        <p>{files?.name || "Choose a file"}</p>
          
       </label>
      <input
        type="file"
        id="file"
        className="border py-2 rounded-sm px-2 hidden"
        onChange={e => setFiles(e.target.files[0])}
      />

      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        modules={modules}
        formats={formats}
        className="z-0"
      />

      <input type="submit" className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition w-fit mx-auto"/>

    </form>
  );
}
