import React, { useState } from 'react'
import './App.css'

const API_URL = 'http://localhost:5000/v1/video/upload/'

function App() {
  const [loaded, setLoaded] = useState(0)

  const onFileDrop = (event) => {
    const file = event.target.files[0]
    const chunkSize = 4000000 // 4MB chunk
    const total = file.size
    console.log("TOTAL SIZE", total / 1_000_000, 'MB')
    const reader = new FileReader();
    const slice = file.slice(0, chunkSize);

    reader.readAsBinaryString(slice);
    console.log('Started uploading file "' + file.name + '"');

    reader.onload = async function (e) {
      try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: slice,
      })
        
      console.log(response);
      } catch (error) {
      console.log("onFileDrop -> error", error)
        
      }



    }


      //   $.ajax({
      //       url: "http://api/url/etc",
      //       type: "POST",
      //       data: slice,
      //       processData: false,
      //       contentType: false,
      //       error: (function (errorData) {
      //           console.log(errorData);
      //           alert("Video Upload Failed");
      //       })
      //   }).done(function (e){
      //      loaded += chunkSize;
      //      var percentLoaded = Math.min((loaded / total) * 100, 100);
      //      console.log('Uploaded ' + Math.floor(percentLoaded) + '% of file "' + file.name + '"');

      //      //Read the next chunk and call 'onload' event again
      //      if (loaded <= total) {
      //        slice = file.slice(loaded, loaded + chunkSize);
      //        reader.readAsBinaryString(slice);
      // } else {
      //    loaded = total;
      //      console.log('File "' + file.name + '" uploaded successfully!');
      //      }
      //   }
  }

  return (
    <div className="App">
      <header className="App-header">
        <label htmlFor="video">Upload some video</label>
        <input onChange={onFileDrop} type="file" name="video" id="video" />
      </header>
    </div>
  )
}

export default App
