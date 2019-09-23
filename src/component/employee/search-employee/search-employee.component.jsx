import React, { Component } from 'react';
import './search-employee.style.css'

export default class SearchEmployee extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchText: ''
        }
    }

    filterEmployee = () => {
        console.log("Searched Text in Search Component..", this.state.searchText);
        this.props.searchEmployee(this.state.searchText)
    }


    render() {
        return (
            <div className="form-group" style={{display:'inline-flex',width:'98%'}}>
                <input style={{width:'46%'}} type='text' className="form-control inputSearch" value={this.state.searchText}
                    placeholder='Type the Name or Last Name of the employee'
                    onChange={(e) => this.setState({ searchText: e.target.value })} />
                <br/>
                <button style={{marginLeft: '10px'}} className="btn btn-primary" onClick={this.filterEmployee}>Search</button>
            </div>
        )
    }

}