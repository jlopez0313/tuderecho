import React, { useState } from 'react'
import { getAll, upload, remove } from '@/firebase/files';
import { getDownloadURL, deleteObject } from 'firebase/storage';

export const useUpload = () => {
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState('')
  const [fileUrl, setFileUrl] = useState('')
  const [percent, setPercent] = useState(0)

  const handleChange = (evt ) => {
    setFile( evt.target.files[0] )
  }

  const handleUpload = () => {
    const task = upload(file);
    task.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setPercent(percent)
        },
        (err) => console.log( err ),
        async () => {
            let url = await getDownloadURL( task.snapshot.ref );
            // url = url.replace(/%2F/g,"/");
            // url = url.replace(/%20/g," ");

            console.log( 'url', url );

            setFileUrl(url);
            setFiles(list => [...list, url])
        }
    )
  }

  const handleGetAll = async () => {
    const { items } = await getAll();
    items.forEach(async (item) => {
        const url = await getDownloadURL( item )
        setFiles(list => [...list, url])
    });
  }

  const handleRemove = async ( file ) => {
    await remove( file )
  }

  return { files, file, percent, fileUrl, handleUpload, handleChange, handleRemove, handleGetAll }

}
