import React, { Component } from 'react';
import { connect } from 'react-redux';
import RoleDepartment from '../../common/role-department'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { addEmployee } from '../../../api/employeeService';
import './add-employee.style.css';

class AddEmployees extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            birthDate: new Date(),
            role: '',
            department: '',
            email: ''
        };
    }

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    };

    onDateChange = (date) => {

        console.log("value of date is: ", moment(date).format("DD-MM-YYYY"))

        this.setState({
            birthDate: moment(date).format("DD-MM-YYYY")
        });
    };

    onInputChange = ({ id, value }) => {
        this.setState({ [id]: value });
    };

    addEmployee = () => {
        const { cancelAddEmployee } = this.props;
        this.props.addNewEmployee({ ...this.state }, cancelAddEmployee);
    }

    render() {
        return (
            <div className="newEmployeeForm">
                <h1 className="todoHeader">Add Employee</h1>
                <br />
                <form className="addEmployeeForm">
                    <div className="form-group">
                        <label className="fieldLabel">First Name</label>
                        <input type="text" className="form-control" id="firstName" aria-describedby="emailHelp" placeholder="Enter First Name" value={this.state.firstName} onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                        <label className="fieldLabel">Last Name</label>
                        <input type="text" className="form-control" id="lastName" aria-describedby="emailHelp" placeholder="Enter Last Name" value={this.state.lastName} onChange={this.onChange} />
                    </div>
                    <div className="customDatePickerWidth">
                        <label className="fieldLabel">Birth Date</label>
                        <DatePicker className="form-control"
                            selected={Date.parse(this.state.birthDate)}
                            onChange={this.onDateChange}
                        />
                    </div>
                    <br/>
                    <RoleDepartment
                        department={this.state.department}
                        role={this.state.role}
                        onChange={this.onInputChange}
                    />
                    <div className="form-group">
                        <label className="fieldLabel">Email</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" value={this.state.email} onChange={this.onChange} />
                    </div>
                </form>
                <br />
                <button className="btn btn-danger addEmployeeForm"
                    onClick={this.addEmployee}>Add Employee</button>
                <button className="btn btn-danger addEmployeeForm"
                    onClick={this.props.cancelAddEmployee}>Cancel</button>
            </div>
        )
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        addNewEmployee: (employee, cancelAddEmployee) => dispatch(addEmployee(employee, cancelAddEmployee))
    }
}

export default connect(null, mapDispatchToProps)(AddEmployees);