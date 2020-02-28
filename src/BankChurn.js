import React, { Component } from 'react';
import axios from 'axios';


//CreditScore,Age,Tenure,Balance,NumOfProducts,HasCrCard,IsActiveMember,EstimatedSalary
class BankChurn extends Component {

    constructor() {
        super();
        this.state = {
            hascard: "1",
            activemember: "1",
            prediction: ""
        }
        this.setHasCard = this.setHasCard.bind(this)
        this.setActiveMember = this.setActiveMember.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(event) {
        event.preventDefault(); 
       
        const creditscore = event.target.elements.creditscore.value;
        const age = event.target.elements.age.value;
        const tenure = event.target.elements.tenure.value;
        const balance = event.target.elements.balance.value;
        const numofproducts = event.target.elements.numofproducts.value;
        const hascard = this.state.hascard; //event.target.elements.hascard.value;
        const isactivemember = this.state.activemember; //event.target.elements.isactivemember.value;
        const salary = event.target.elements.salary.value;
       

        console.log("Credit score: ", creditscore);
        console.log("Age: ", age);
        console.log("Tenure: ", tenure);
        console.log("Balance: ", balance);
        console.log("No. of products: ",numofproducts);
        console.log("Has card: ", hascard);
        console.log("Is active member: ", isactivemember);
        console.log("salary: ", salary);

        const post = {
             creditscore: creditscore,
             age: age,
             tenure: tenure,
             balance: balance,
             numproducts: numofproducts,
             hascard: hascard,
             isactivemember: isactivemember,
             salary: salary
        }

        const data = { "data" : 
            "" + post.creditscore + "," +
            post.age + "," +
            post.tenure + "," +
            post.balance + "," +
            post.numproducts + "," +
            post.hascard + "," +
            post.isactivemember + "," +
            post.salary 
        }
        console.log(data)
        const prediction = await this.predict(JSON.stringify(data)) 
        if ( typeof prediction === 'undefined' ) {
            //console.log("Prediction is undefined....", prediction)
            this.setPrediction("Undefined");
        } else {
            //console.log("+++++++Prediction:", prediction)
            this.setPrediction(prediction);
        }
        
        
    }

    setHasCard = event => {
        //console.log("Has card: ", event.target.value)
        this.setState({
            hascard: event.target.value
        })
        
    }

    setActiveMember = event => {
        //console.log("Active member: ",event.target.value)
        this.setState({
            activemember: event.target.value
        })
    }

    setPrediction = val => {
        console.log("Set prediction: ", val)
        this.setState({
            prediction: val
        })
    }

    predict(data) {
        const app_url = process.env.BANK_CHURN_URL;
        // axios.post('https://2t9z6v0ls4.execute-api.us-east-1.amazonaws.com/aicamp-bank-churn-knn-stage/aicamp-bank-churn-knn', {
        //         data
        //   })
        //   .then(function (response) {
        //     console.log(response);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });


       return axios({
            method: 'post',
            url:  app_url,
            data: data,
            headers : {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            json: true
          })
          .then(function (response) {
            console.log("RESPONSE: ",response);
            //const resp = JSON.parse(response);
            console.log(response.data);
            const prediction_response = JSON.parse(response.data)
            console.log(prediction_response.predictions)
            const predictions = prediction_response.predictions
            return predictions[0].predicted_label
            
          }).then(function (prediction){
              console.log("Prediction:", prediction)           
              return prediction
          })
          .catch(function (error) {
            console.log(error);  
          });
  
    }
  
    render() {
        const {hascard, activemember, prediction} = this.state
        console.log("++++++ render() prediction:", prediction)
        return (
        <div>
            <div>
                <div className="heading col-1 p-4">
                    Bank Churn
                </div>
            </div>
            <div className="row">
                <div className="col-sm-2">
                    <form onSubmit={this.handleSubmit}>                        
                         
                        <div className="form-group m-4">
                            <label for="name">Credit score</label>
                            <input className="form-control"
                                type="text" 
                                id="creditscore"
                                placeholder="Enter credit score ..." />
                        </div> 
                          
                         <div className="form-group m-4">
                            <label for="name">Age</label>
                            <input className="form-control"
                                type="text" 
                                id="age"
                                placeholder="Age ..." />
                        </div>
                        <div className="form-group m-4">
                            <label for="name">Tenure</label>
                            <input className="form-control"
                                type="text" 
                                id="tenure"
                                placeholder="Tenure ..." />
                        </div>
                        <div className="form-group m-4">
                            <label for="name">Balance</label>
                            <input className="form-control"
                                type="text" 
                                id="balance"
                                placeholder="Balance ..." />
                        </div>
                        <div className="form-group m-4">
                            <label for="name">Number of Products</label>
                            <input className="form-control"
                                type="text" 
                                id="numofproducts"
                                placeholder="Number of products ..." />
                        </div>
                        <div className="form-group m-4">
                            <label for="name">Has Card</label>
                            <div>
                                <input type="radio" checked={hascard === "1"} 
                                    onChange={this.setHasCard} value="1" /> Yes
                                <input type="radio" checked={hascard === "0"} 
                                onChange={this.setHasCard} value="0"/> No
                            </div>                            
                        </div>
                        <div className="form-group m-4">
                            <label for="name">Is active member?</label>
                            <div>
                                <input type="radio" checked={activemember === "1"} 
                                    onChange={this.setActiveMember} value="1" /> Yes
                                <input type="radio" checked={activemember === "0"} 
                                    onChange={this.setActiveMember} value="0"/> No
                            </div>                            
                        </div>
                        <div className="form-group m-4">
                            <label for="name">Estimated salary</label>
                            <input className="form-control"
                                type="text" 
                                id="salary"
                                placeholder="Estimated salary ..." />
                        </div>
                        <button type="submit" className="btn btn-success m-4">Predict</button>
                    </form>
                    <div>
                        <label for="name">Prediction: {prediction}</label>
                    </div>
                </div>
            </div>
        </div>           
        )
    }
}

export default BankChurn;
