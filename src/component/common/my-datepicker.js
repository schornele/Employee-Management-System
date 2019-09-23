import PropTypes from 'prop-types';
import React from 'react';
import DatePicker from "react-datepicker";
import moment from 'moment';

const MyDatePicker = ({ input }) => {

  const onChange = event => {
    const pickedDate = event.path.to.value;
    input.onChange(pickedDate);
  }

  return (
    <div>
      <DatePicker
        dateFormat="YYYY-MM-DD"
        selected={input.value ? moment(input.value).format("DD-MM-YYYY") : null} 
        onChange={onChange}
      />

    </div>
  );
}

MyDatePicker.propTypes = {
  input: PropTypes.shape().isRequired
};

export default MyDatePicker;