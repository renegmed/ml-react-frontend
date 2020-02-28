import React, { Component, useCallback } from 'react';
import { useDropzone } from 'react-dropzone'
import axios from 'axios';
 

const app_url = process.env.FASHION_MNIST_URL;

const ImageDropzone = () => {
    
    const maxSize = 1048576;
    
    const onDrop = useCallback( (acceptedFiles) => {
      console.log("+++++++++++++++")
      console.log(acceptedFiles);
      console.log("File path:", acceptedFiles[0].path);

      // const file = URL.createObjectURL(acceptedFiles[0]);
      // console.log("+++++ dropped image, file name:")
      // console.log(file); 

      // const reader = new FileReader()
      // reader.onload = () => {
      //   // Do whatever you want with the file contents
      //   const binaryStr = reader.result
      //   console.log(binaryStr)
      // }
      // reader.readAsArrayBuffer(acceptedFiles[0])


    }, []);

  
    const predict = (data) => {  
      return axios({
           method: 'post',
           url: app_url, 
           data: data,
           headers : {
               'Content-Type': 'image',
               'Access-Control-Allow-Origin': '*'
           },
           json: true
         })
         .then(function (response) {
           console.log("RESPONSE: ",response);
           
           console.log(response.data);
           const prediction_response = JSON.parse(response.data)
           console.log(prediction_response.predictions)
           const predictions = prediction_response.predictions

           console.log(predictions);

           return predictions[0].predicted_label
           
         }).then(function (prediction){
             console.log("Prediction:", prediction)           
             return prediction
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
      </div>
    );
  };

class FashionItemClassifier extends Component {
    
    render() {
        return (
            <ImageDropzone/>
        )
    }
 
    
}

export default FashionItemClassifier;
