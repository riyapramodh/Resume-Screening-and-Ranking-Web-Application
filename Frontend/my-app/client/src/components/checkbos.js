import * as React from 'react';
import Checkbox, { checkboxClasses } from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function Checkboxes({text, onChange, checkboxName, checked, setChecked}) {
    
    const handleChange = (event) => {
        const isChecked = event.target.checked;
        console.log(checkboxName + " is checked: " + isChecked);
        setChecked(isChecked); // Update the checked state
        onChange(isChecked);
    };

  return (
    <div>
    <Checkbox
      checked={checked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />All {text}
    </div>
  );
}
