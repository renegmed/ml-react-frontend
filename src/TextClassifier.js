import React, { Component } from 'react';
import axios from 'axios';
class TextClassifier extends Component {
  
    constructor() {
        super();
        this.state = {
            text: "" ,
            prediction: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.app_url = process.env.TEXT_CLASSIFIER_URL;
    }

    handleChange(event) {
        event.preventDefault(); 
        console.log(event.target.value)
        this.setState({text: event.target.value}) 
    }

    handleSubmit(event) {
        event.preventDefault();  
        console.log("+++ item to submit ++++\n",event.target.elements.textareabox.value)
        this.setPrediction()
    }


    setPrediction = val => {
        console.log("++++ Set prediction: ", val)
        this.setState({
            prediction: val
        })
    }

    predict(data) {    

       console.log("+++++ this.app_url", this.app_url);
       
       return axios({
            method: 'post',
            url:  this.app_url, 
            data: data,
            headers : {
                'Content-Type': 'application/json',
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
              console.log("+++++++ Prediction:", prediction)           
              return prediction
          })
          .catch(function (error) {
            console.log(error);  
          });
  
    }
  

    render() {
        const {prediction} = this.state

        return (
            <div>                
                <div className="heading col-1 p-4">
                   Text Classifier
                </div> 
                <div className="row">
                    <div className="col-sm-2">          
                        <form onSubmit={this.handleSubmit}> 
                            <div className="form-group m-4">
                                <textarea id="textareabox" value={this.state.text} onChange={this.handleChange} rows="20" cols="100" /> 
                            </div>
                            <div className="form-group m-4">
                                <input type="submit" value="Classify" />
                            </div>
                        </form>
                        <div>
                            <label>Prediction: {prediction}</label>
                        </div>
                    </div>
                </div>
            </div>
           
        )
    }
}

export default TextClassifier;
