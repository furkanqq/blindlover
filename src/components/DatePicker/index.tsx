// components/DatePicker.tsx
import React, { ChangeEvent, useState } from 'react';

import { Input } from '../Input';

const DatePicker: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedDate(event.target.value);
  };

  return (
    <div className="flex flex-col items-start space-y-2">
      <Input
        type="date"
        id="birthday"
        name="birthday"
        value={selectedDate}
        onChange={handleChange}
        className="justify-between px-3 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 text-gray-700"
      />
      {/* {selectedDate && (
        <p className="text-sm text-gray-500">
          Seçtiğiniz tarih: <span className="font-medium">{selectedDate}</span>
        </p>
      )} */}
    </div>
  );
};

export default DatePicker;
