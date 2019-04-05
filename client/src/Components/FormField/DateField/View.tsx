import React from 'react';

import DatePicker from 'material-ui-pickers/DatePicker';

export default ({ field, form, ...other }: any) => {

  return (
      <DatePicker
        {...field}
        format="DD MM YYYY"
        onChange={date => form.setFieldValue(field.name, date, true)}
        fullWidth
      />
  );
};
