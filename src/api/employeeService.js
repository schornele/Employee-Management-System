import {
    fetchEmployeesPending, fetchEmployeesSuccess, fetchEmployeesError
    
} from '../redux/employee/employee.action';
import axios from 'axios';

export const fetchEmployees = () => {
    return dispatch => {
        dispatch(fetchEmployeesPending());
        fetch('http://localhost:3000/employees')
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    throw (res.error);
                }
                dispatch(fetchEmployeesSuccess(res));
                return res;
            })
            .catch(error => {
                dispatch(fetchEmployeesError(error));
            })
    }
}

export const addEmployee = (employee, cancelAddEmployee) => {
    return dispatch => {
        dispatch(fetchEmployeesPending());
        axios.post('http://localhost:3000/employees', employee)
            .then(res => {
                if (res.error) {
                    throw (res.error);
                }
                dispatch(fetchEmployees());
                cancelAddEmployee();
                return res;
            })
            .catch(error => {
                dispatch(fetchEmployeesError(error));
            })
    }
}

export const deleteEmployee = (employeeId, refreshParent) => {
    return dispatch => {
        dispatch(fetchEmployeesPending());
        axios.delete('http://localhost:3000/employees/' + employeeId)
            .then(res => {
                if (res.error) {
                    throw (res.error);
                }
                dispatch(fetchEmployees());
                refreshParent();
                return res;
            })
            .catch(error => {
                dispatch(fetchEmployeesError(error));
            })
    }
}

export const updateEmployee = (employee, id, refreshParent) => {
    return dispatch => {
        dispatch(fetchEmployeesPending());
        axios.post('http://localhost:3000/employees/' + id, employee)
            .then(res => {
                if (res.error) {
                    throw (res.error);
                }
                dispatch(fetchEmployees());
                refreshParent();
                return res;
            })
            .catch(error => {
                dispatch(fetchEmployeesError(error));
            })
    }
}


