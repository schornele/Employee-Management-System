import { combineReducers } from 'redux';

import employeeReducer from './employee/employee.reducer'


export default combineReducers({
    employee: employeeReducer
});

