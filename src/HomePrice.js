import React, { Component } from 'react';
 

class HomePrice extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {

        const app_url = process.env.HOME_PRICE_PREDICTOR_URL;
        event.preventDefault();
    }

    render() {
        return (
        <div>
            <div>
                <h1>Home Price</h1>
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
 
                        <button type="submit" className="btn btn-success m-4">Submit</button>
                    </form>
                </div>
            </div>

        </div>
        )
    }
}

export default HomePrice;