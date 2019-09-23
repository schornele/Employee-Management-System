import { EmployeeActionTypes } from './employee.types'

export const addNewEmployee = employee => ({
    type: EmployeeActionTypes.ADD_NEW_EMPLOYEE,
    payload: employee
})

export const addEmployeesSuccess = () => ({
    type: EmployeeActionTypes.ADD_NEW_EMPLOYEE_SUCCESS

})

export const deleteEmployee = (employeeId) =>
    ({
        type: EmployeeActionTypes.DELETE_EMPLOYEE,
        employeeId: employeeId
    })

export const updateEmployee = (employee) =>
    ({
        type: EmployeeActionTypes.UPDATE_EMPLOYEE,
        employee: employee
    })

export const searchEmployee = (searchText) =>
    ({
        type: EmployeeActionTypes.SEARCH_EMPLOYEE,
        searchText: searchText
    })


export const getAllEmployees = () => ({
    type: EmployeeActionTypes.GET_ALL_EMPLOYEES
})

export const fetchEmployeesPending = () => ({
    type: EmployeeActionTypes.FETCH_EMPLOYEES_PENDING

})

export const fetchEmployeesSuccess = (employees) => ({
    type: EmployeeActionTypes.FETCH_EMPLOYEES_SUCCESS,
    employees: employees

})

export const fetchEmployeesError = (error) => ({

    type: EmployeeActionTypes.FETCH_EMPLOYEES_ERROR,
    error: error

})