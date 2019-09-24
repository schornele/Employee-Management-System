import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class RoleDepartment extends Component {

  static propTypes = {
    department: PropTypes.string,
    role: PropTypes.string,
    onChange: PropTypes.func.isRequired
  };

  state = {
    department: null,
    role: null,
    roles: []
  };

  onSelectDepartment = evt => {
    const department = evt.target.value;
    this.setState({ department });
    this.props.onChange({ id: 'department', value: department });
  };

  onSelectRole = evt => {
    const role = evt.target.value;
    this.setState({ role });
    this.props.onChange({ id: 'role', value: role });
  };

  renderDepartmentSelect = () => {
    return (
      <div className="form-group">
        {/* <label className="fieldLabel" htmlFor="sel1">Select Department:</label> */}
        <select onChange={this.onSelectDepartment} value={this.state.department || ''} 
        className="form-control" id="sel1">
          <option value="" disabled>Select Department</option>
          <option value="Finance">Finance</option>
          <option value="HR">HR</option>
          <option value="IT">IT</option>
          <option value="Marketing">Marketing</option>
          <option value="Sales">Sales</option>

        </select>
      </div>
    );
  };

  renderroleSelect = () => {

    return (
      <div className="form-group">
        <select onChange={this.onSelectRole} value={this.state.role || ''} className="form-control" id="sel1">
        <option value="" disabled>Select Role</option>
          <option value="Manager">Manager</option>
          <option value="Coordinator">Coordinator</option>
          <option value="consultant">Consultant</option>
        </select>
      </div>
    );
  };

  render() {
    return (
      <React.Fragment>
        {this.renderDepartmentSelect()}
        {this.renderroleSelect()}
      </React.Fragment>
    );
  }
};


