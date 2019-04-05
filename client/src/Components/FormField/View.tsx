import React from 'react';
import { DateField } from './DateField';
import { FileField } from './FileField';
import { TextField } from './TextField';

export default (props: any) => {
  switch (props.type) {
    case "text": return <TextField {...props} />;
    case "file": return <FileField {...props} />;
    case "date": return <DateField {...props} />;
    default: return <TextField {...props} />;
  }
}
