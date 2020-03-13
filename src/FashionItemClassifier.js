import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone'
import axios from 'axios';
 

const app_url = process.env.REACT_APP_FASHION_MNIST_URL;

const FashionItemClassifier = (props) => {
    
    const maxSize = 1048576;
    
    const onDrop = useCallback( (acceptedFiles) => {

      console.log(acceptedFiles);
      console.log("+++ onDrop File path:", acceptedFiles[0].path);

      // const file = URL.createObjectURL(acceptedFiles[0]);
      // console.log("+++++ dropped image, file name:", file)     

      // see https://developer.mozilla.org/en-US/docs/Web/API/Blob

      const reader = new FileReader()
      reader.onload = () => {
        // Do whatever you want with the file contents
        const data = reader.result
        //console.log("Array buffer:\n", data)
        console.log("++++ image data++++")
        console.log(data) 
 
        const pred = predict( data)  
        console.log("------onDrop PREDICTION:",pred)
        
      }
 
      // reader.readAsBinaryString(acceptedFiles[0])
      reader.readAsArrayBuffer(acceptedFiles[0]) // (file)
      // reader.readAsDataURL(acceptedFiles[0])
     
      //return pred1

    }, []);


    const predict = (data) => {  
      console.log("REACT_APP_FASHION_MNIST_URL:", app_url)
      console.log("+++++++ data ++++++")
      console.log(data)
      return axios({
           method: 'post',
           url: app_url, 
           data: data,
           headers : {
              'Content-Type': 'image/jpg',
              'Access-Control-Allow-Origin': '*'
           }
         })
         .then(function (response) {
           console.log("+++++RESPONSE: ",response);
           
           console.log("Response data:",response.data.response);
           //const prediction_response = JSON.parse(response)        
           //console.log("++++= Prediction_response:",prediction_response)

          //  const predictions = prediction_response.predictions
          //  console.log("++++++ Predictions:".predictions);

          //  return predictions[0].predicted_label
          return response.data.response
           
         }).then(function (prediction){
             console.log("Prediction:", prediction)           
             //return prediction
             props.prediction = prediction
         })
         .catch(function (error) {
           console.log(error);  
         });
    }
 

    const { isDragActive, getRootProps, getInputProps, isDragReject, acceptedFiles, rejectedFiles } = useDropzone({
      onDrop,
      accept: 'image/png,image/jpeg,image/jpg',
      minSize: 0,
      maxSize,   
    });
  

    const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;
    
    const acceptedFilesItems = acceptedFiles.map(file => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ));

    return (    
      <div className="container text-center mt-5">
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {!isDragActive && 'Click here or drop a file to upload!'}
          {isDragActive && !isDragReject && "Drop it like it's hot!"}
          {isDragReject && "File type not accepted, sorry!"}
          {isFileTooLarge && (
            <div className="text-danger mt-2">
              File is too large.
            </div>
          )}
        </div>
        
        <ul className="list-group mt-2">
          {acceptedFiles.length > 0 && acceptedFiles.map(acceptedFile => (    
            <li className="list-group-item list-group-item-success"> 
              <img key={acceptedFile.name + "file"} src={URL.createObjectURL(acceptedFile)} width="240" height="240" alt="your file" />
            </li>
          ))}
        </ul>   
        <div>
            <label>Classification: TO BE RESOLVED</label>
          </div>
          <aside>
            <h4>Accepted Files</h4>
            <ul>
              {acceptedFilesItems}
            </ul>
          </aside>
      </div>
    );
  };
 

export default FashionItemClassifier;
