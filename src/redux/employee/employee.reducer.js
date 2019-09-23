import { EmployeeActionTypes } from './employee.types'

const INITIAL_STATE = {
    pending: false,
    employees: [],
    error: null
}
const employeeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EmployeeActionTypes.FETCH_EMPLOYEES_PENDING:
            return {
                ...state,
                pending: true
            }
        case EmployeeActionTypes.FETCH_EMPLOYEES_SUCCESS:
            return {
                ...state,
                pending: true,
                employees: [...action.employees]
            }
        case EmployeeActionTypes.FETCH_EMPLOYEES_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case EmployeeActionTypes.ADD_NEW_EMPLOYEE_SUCCESS:
            return {
                ...state,
                pending: false
            }
        case EmployeeActionTypes.DELETE_EMPLOYEE_SUCCESS:
            return Object.assign({}, state, {
                ...state.employees.filter((emp) =>
                    emp._id !== action.employeeId)
            })
        case EmployeeActionTypes.UPDATE_EMPLOYEE_SUCCESS:
            return Object.assign({}, state, {
                ...state.employees.map((emp) =>
                    emp._id === action.employee.empId ?
                        { ...emp, ...action.employee } : emp)

            })
        case EmployeeActionTypes.SEARCH_EMPLOYEE:
            return {
                ...state,
                pending: true,
                employees: [...state.employees.filter(emp =>
                    (action.searchText ? (emp.firstName.toString().toLowerCase().includes(action.searchText.toLowerCase())
                        || emp.lastName.toString().toLowerCase().includes(action.searchText.toLowerCase())
                        || emp.email.toString().toLowerCase().includes(action.searchText.toLowerCase())) : false)
                )]
            }
        default:
            return state;
    }
}

export const getEmployees = state => state.employee.employees;
export const getEmployeesPending = state => state.employee.pending;
export const getEmployeesError = state => state.employee.error;

export default employeeReducer;