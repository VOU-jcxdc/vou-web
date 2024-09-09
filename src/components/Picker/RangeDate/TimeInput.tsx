import React, { useEffect, useRef } from "react";

interface TimeParts {
  hour: number;
  minute: number;
}

interface TimeInputProps {
  value?: Date;
  onChange: (value: TimeParts) => void;
}

const TimeInput: React.FC<TimeInputProps> = ({ value, onChange }) => {
  const [time, setTime] = React.useState<TimeParts>(() => {
    const d = value ? new Date(value) : new Date();
    return {
      hour: d.getHours(),
      minute: d.getMinutes(),
    };
  });

  const hourRef = useRef<HTMLInputElement | null>(null);
  const minuteRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const d = value ? new Date(value) : new Date();
    setTime({
      hour: d.getHours(),
      minute: d.getMinutes(),
    });
  }, [value]);

  const validateTime = (field: keyof TimeParts, value: number): boolean => {
    if (
      (field === "hour" && (value < 0 || value > 23)) ||
      (field === "minute" && (value < 0 || value > 59))
    ) {
      return false;
    }
    return true;
  };

  const handleInputChange =
    (field: keyof TimeParts) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value ? Number(e.target.value) : "";
      const isValid = typeof newValue === "number" && validateTime(field, newValue);

      // If the new value is valid, update the date
      const newTime = { ...time, [field]: newValue };
      setTime(newTime);

      // only call onChange when the entry is valid
      if (isValid) {
        onChange(newTime);
      }
    };

  const initialTime = useRef<TimeParts>(time);

  const handleBlur =
    (field: keyof TimeParts) =>
    (e: React.FocusEvent<HTMLInputElement>): void => {
      if (!e.target.value) {
        setTime(initialTime.current);
        return;
      }

      const newValue = Number(e.target.value);
      const isValid = validateTime(field, newValue);

      if (!isValid) {
        setTime(initialTime.current);
      } else {
        // If the new value is valid, update the initial value
        initialTime.current = { ...time, [field]: newValue };
      }
    };

  return (
    <div className="flex items-center rounded-lg border px-1 text-sm">
      <input
        type="text"
        ref={hourRef}
        max={31}
        maxLength={2}
        value={time.hour.toString()}
        onChange={handleInputChange("hour")}
        onFocus={(e) => {
          if (window.innerWidth > 1024) {
            e.target.select();
          }
        }}
        onBlur={handleBlur("hour")}
        className="w-7 border-none bg-background p-0 text-center outline-none"
        placeholder=""
      />
      <span className="-mx-px opacity-20">:</span>
      <input
        type="text"
        ref={minuteRef}
        max={12}
        maxLength={2}
        value={time.minute.toString()}
        onChange={handleInputChange("minute")}
        onFocus={(e) => {
          if (window.innerWidth > 1024) {
            e.target.select();
          }
        }}
        onBlur={handleBlur("minute")}
        className="w-6 border-none bg-background p-0 text-center outline-none"
        placeholder=""
      />
    </div>
  );
};

TimeInput.displayName = "TimeInput";

export { TimeInput };
