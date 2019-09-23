import React, { Component } from 'react';
import { connect } from 'react-redux';
import { roles } from '../../../api/roles';
import { departments } from '../../../api/departments';
import DatePicker from "react-datepicker";
import moment from 'moment';
import { deleteEmployee, updateEmployee } from '../../../api/employeeService';
import { searchEmployee } from '../../../redux/employee/employee.action';

class EmployeeList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            editIndex: null,
            department: '',
            role: '',
            birthDate: Date.parse(moment().format("DD-MM-YYYY")),
            selectedRole: '',
            selectedDepartment: ''
        }

    }

    componentDidUpdate(prevProps) {
        if ((prevProps.searchText !== this.props.searchText)) {
            this.props.searchEmployee(this.props.searchText)
        }
    }

    deleteEmployee = (employeeId) => {
        const { refreshParent } = this.props;
        this.props.deleteEmployeeById(employeeId, refreshParent);
    }

    editEmployee(index, value) {
        this.setState(
            {
                editIndex: index,
                role: value.role,
                department: value.department
            }
        )
    }

    canceleditEmployee() {
        this.setState({
            editIndex: null
        })
    }

    updateCurrentEmployee = (emp) => {

        const firstName = this.getFirstName.value;
        const lastName = this.getLastName.value;
        const birthDate = this.state.birthDate;
        const role = this.state.role;
        const department = this.state.department;
        const email = this.getEmail.value;

        const employee = {
            firstName: firstName,
            lastName: lastName,
            birthDate: birthDate,
            role: role,
            department: department,
            email: email
        }

        const { refreshParent } = this.props;
        this.props.updateEmployee(employee, emp._id, refreshParent)

        this.setState({
            editIndex: null
        })
    }

    onSelectRole = evt => {

        const role = evt.target.value;

        this.setState({ role }, () => {
            console.log("role updated to..", this.state.role)
        });
    };

    onSelectDepartment = evt => {
        const department = evt.target.value;
        this.setState({ department }, () => {
            console.log("Department updated to..", this.state.department)
        });
    };


    dateChanged = (d) => {
        this.setState({ birthDate: moment(d).format("DD-MM-YYYY") });
    }

    render() {

        return (
            <div className="employeeList">
                <table className="table table-striped table-light">
                    <thead>
                        <tr>
                            <th scope="col" className="centerAll">#</th>
                            <th scope="col" className="centerAll">First Name</th>
                            <th scope="col" className="centerAll">Last Name</th>
                            <th scope="col" className="centerAll">Birth Date</th>
                            <th scope="col" className="centerAll">Job Role</th>
                            <th scope="col" className="centerAll">Department</th>
                            <th scope="col" className="centerAll">Email Address</th>
                            <th scope="col" className="centerAll">Edit</th>
                            <th scope="col" className="centerAll">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.employees.map((value, index) => {
                            return (
                                this.state.editIndex !== index ?
                                    <tr key={index}>
                                        <th scope="row" id={index + 1}>{index + 1}</th>
                                        <td className="centerAll" key={value.id} id={index + 2}>{value.firstName}</td>
                                        <td className="centerAll" key={value.id} id={index + 3}>{value.lastName}</td>
                                        <td className="centerAll" key={value.id} id={index + 4}>{value.birthDate}</td>
                                        <td className="centerAll" key={value.id} id={index + 5}>{value.role}</td>
                                        <td className="centerAll" key={value.id} id={index + 6}>{value.department}</td>
                                        <td className="centerAll" key={value.id} id={index + 7}>{value.email}</td>
                                        <td className="centerAll" key={value.id} id={index + 8}>
                                            <i className="fa fa-edit" style={{ color: 'blue', cursor: 'pointer' }} onClick={() => this.editEmployee(index, value)}></i>
                                        </td>
                                        <td className="centerAll" key={value.id} id={index + 9}>
                                            <i className="fa fa-trash" style={{ color: 'red', cursor: 'pointer' }} onClick={() => this.deleteEmployee(value._id)}></i>
                                        </td>
                                    </tr>
                                    : <tr key={value.id}>
                                        <th scope="row" id={index + 1}>{index + 1}</th>
                                        <td className="centerAll" key={value.id} id={index + 2 + 'edit'}>
                                            <input type="text" className="form-control"
                                                defaultValue={value.firstName} ref={(input) => this.getFirstName = input} /></td>
                                        <td className="centerAll" key={value.id} id={index + 3 + 'edit'}>
                                            <input type="text" className="form-control" defaultValue={value.lastName} ref={(input) => this.getLastName = input} /></td>
                                        <td className="centerAll" key={value.id} id={index + 4 + 'edit'}>
                                            <DatePicker className="form-control" selected={Date.parse(this.state.birthDate)}
                                                onChange={this.dateChanged} />
                                        </td>
                                        <td className="centerAll" key={value.id} id={index + 5 + 'edit'}>
                                            <select onChange={this.onSelectRole} value={this.state.role}
                                                className="form-control" >
                                                <option value="" disabled>{'Select Role'}</option>
                                                {Object.keys(roles).map((key) => {
                                                    return (
                                                        <option value={roles[key].name} key={key}>
                                                            {roles[key].name}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </td>
                                        <td className="centerAll" key={value.id} id={index + 6 + 'edit'}>
                                            <select onChange={this.onSelectDepartment} value={this.state.department}
                                                className="form-control" >
                                                <option value="" disabled>{'Select Department'}</option>
                                                {Object.keys(departments).map((key) => {
                                                    return (
                                                        <option value={departments[key].name} key={key}>
                                                            {departments[key].name}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </td>
                                        <td className="centerAll" key={value.id} id={index + 7 + 'edit'}>
                                            <input type="email" className="form-control" defaultValue={value.email} ref={(input) => this.getEmail = input} /></td>
                                        <td className="centerAll" key={value.id} id={index + 8 + 'edit'}>
                                            <button onClick={() => {
                                                this.canceleditEmployee()
                                            }} className="btn btn-primary">Cancel</button>
                                        </td>
                                        <td className="centerAll" key={value.id} id={index + 9}><button onClick={() => {
                                            this.updateCurrentEmployee(value)
                                        }} className="btn btn-info">Update</button></td>
                                    </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        employees: state.employee.employees,
        //editIndex: state.employee.employeeList.empId
    }
}



const mapDispatchToProps = (dispatch) => {
    return {
        deleteEmployeeById: (employeeId, refreshParent) => dispatch(deleteEmployee(employeeId, refreshParent)),
        updateEmployee: (employee, id, refreshParent) => dispatch(updateEmployee(employee, id, refreshParent)),
        searchEmployee: (searchText) => dispatch(searchEmployee(searchText))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList)

