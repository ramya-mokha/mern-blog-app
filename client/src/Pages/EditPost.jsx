import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const EditPost = () => {
    const navigate = useNavigate();
      const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState(null);
   const {id}=useParams();
 useEffect(()=>{
     fetch(`http://localhost:3000/post/${id}`).then(response=>response.json().then(data=>{
        setTitle(data.title);
        setSummary(data.summary);
        setContent(data.content)}
     ));
   },[])
  

  const EditPost = async (e) => {
    e.preventDefault();
    const fdata = new FormData();
    fdata.set("title", title);
    fdata.set("summary", summary);
    fdata.set("content", content);

    if (files) {
      fdata.set("file", files);
    }

    const response = await fetch(`http://localhost:3000/editPost/${id}`, {
      method:"PUT",
      body:fdata,
      credentials: "include"
    });

    if (response.ok) {
      navigate(`/post/${id}`);
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
        <form onSubmit={EditPost} className="flex flex-col gap-5 mt-10 mx-auto max-w-3xl p-3">
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
            />
      
            <input type="Submit" className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition w-fit mx-auto" value="Update"/>
      
          </form>
    );
}

export default EditPost
