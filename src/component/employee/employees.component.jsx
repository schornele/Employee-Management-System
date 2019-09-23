import React, { Component } from 'react';
import {connect} from 'react-redux';
import EmployeeList from './employee-list/employee-list.component';
import AddEmployees from './add-employee/add-employee.component';
import SearchEmployee from './search-employee/search-employee.component';
import {fetchEmployees} from '../../api/employeeService';
import {getEmployeesError, getEmployees, getEmployeesPending} from '../../redux/employee/employee.reducer';
import logo from '../../logo.svg';

 class Employees extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addEmployee: false,
            searchText: ''
        };
    }

    componentDidMount(){
        this.props.fetchAllEmployees();
    }

    showNewEmpForm = () => {
        this.setState({ addEmployee: true })
    }

    cancelAddEmployee = () => {
        this.setState({ addEmployee: false })
    }

    searchedText = (searchText) => {
        this.setState({ searchText: searchText })
    }

    renderHeader(){
        return(
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome To Employee Management System</h1>
          </header>
        )
      }

    render() {

        const {employees, error, pending} = this.props;
        
        
        if(!pending) return <div>{this.renderHeader()}
        <div className="spinner-border"></div></div>

        return (<div className="renderTodoList">
        {this.renderHeader()}
            {this.state.addEmployee ?
                <AddEmployees cancelAddEmployee={this.cancelAddEmployee} /> :
                <React.Fragment>
                    <br/>
                    <SearchEmployee searchEmployee={this.searchedText} />
                    {error && <span className='employee-list-error'>{error}</span>}
                    <EmployeeList refreshParent={this.cancelAddEmployee} employees={employees} searchText={this.state.searchText} />
                    <button onClick={this.showNewEmpForm} className="btn btn-primary">New Employee</button>
                </React.Fragment>
            }
        </div>); 
    }
}

const mapStateToProps = state => ({

    error: getEmployeesError(state),
    employees: getEmployees(state),
    pending: getEmployeesPending(state)
})

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllEmployees: () => dispatch(fetchEmployees())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Employees );

