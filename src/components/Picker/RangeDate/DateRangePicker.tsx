"use client";
import "moment/locale/vi";

import { Button } from "@components/ui/button";
import { Calendar } from "@components/ui/calendar";
import { Label } from "@components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import { FC, useEffect, useRef, useState } from "react";

import useDatePicker from "@/hooks/zustand/useDatePicker";
import { cn } from "@/lib/utils";
import formatVNDate from "@/lib/utils/functions/formatVNDate";

import { DateInput } from "./DateInput";
import { CalendarIcon } from "lucide-react";

export interface DateRangePickerProps {
  /** Click handler for applying the updates from DateRangePicker. */
  onUpdate?: (values: DateRange) => void;
  /** Initial value for start date */
  initialDateFrom?: Date;
  /** Initial value for end date */
  initialDateTo?: Date;
  /** Alignment of popover */
  align?: "start" | "center" | "end";
  /** Option for locale */
  locale?: string;
  /** Option for showing compare feature */
  showCompare?: boolean;
}

interface DateRange {
  from: Date;
  to: Date;
}

interface Preset {
  name: string;
  label: string;
}

// Define presets
const PRESETS: Preset[] = [
  { name: "thisMonth", label: "Tháng này" },
  { name: "lastMonth", label: "Tháng trước" },
  { name: "6months", label: "6 tháng nay" },
  { name: "thisYear", label: "Năm nay" },
  { name: "lastYear", label: "Năm trước" },
  { name: "lastTwoYears", label: "2 năm nay" },
];

/** The DateRangePicker component allows a user to select a range of dates */
export const DateRangePicker: FC<DateRangePickerProps> & {
  filePath: string;
} = ({
  initialDateFrom = new Date(new Date().setHours(0, 0, 0, 0)),
  initialDateTo = new Date(new Date().setHours(23, 59, 59, 999)),
  onUpdate,
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [range, setRange] = useState<DateRange>({
    from: initialDateFrom,
    to: initialDateTo,
  });

  // Refs to store the values of range and rangeCompare when the date picker is opened
  const openedRangeRef = useRef<DateRange | undefined>();
  const [selectedPreset, setSelectedPreset] = useState<string | undefined>(
    undefined
  );
  const [isSmallScreen, setIsSmallScreen] = useState(
    typeof window !== "undefined" ? window.innerWidth < 960 : false
  );

  useEffect(() => {
    const handleResize = (): void => {
      setIsSmallScreen(window.innerWidth < 960);
    };

    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getPresetRange = (presetName: string): DateRange => {
    const preset = PRESETS.find(({ name }) => name === presetName);
    if (!preset) throw new Error(`Lỗi khoảng thời gian: ${presetName}`);
    const from = new Date();
    const to = new Date();

    switch (preset.name) {
      case "thisMonth":
        from.setDate(1);
        from.setHours(0, 0, 0, 0);
        to.setHours(23, 59, 59, 999);
        break;
      case "lastMonth": {
        const previousMonth = from.getMonth() === 0 ? 11 : from.getMonth() - 1;
        from.setFullYear(from.getFullYear(), previousMonth, 1);
        from.setHours(0, 0, 0, 0);
        to.setDate(0);
        to.setHours(23, 59, 59, 999);
        break;
      }
      case "6months": {
        from.setMonth(from.getMonth() - 6);
        from.setDate(1);
        from.setHours(0, 0, 0, 0);
        to.setHours(23, 59, 59, 999);
        break;
      }
      case "thisYear":
        from.setMonth(0, 1);
        from.setHours(0, 0, 0, 0);
        to.setFullYear(
          to.getFullYear(),
          new Date().getMonth(),
          new Date().getDate()
        );
        to.setHours(23, 59, 59, 999);
        break;
      case "lastYear":
        from.setFullYear(from.getFullYear() - 1, 0, 1);
        from.setHours(0, 0, 0, 0);
        to.setFullYear(to.getFullYear() - 1, 11, 31);
        to.setHours(23, 59, 59, 999);
        break;
      case "lastTwoYears": {
        const currentYear = new Date().getFullYear();
        from.setFullYear(currentYear - 1, 0, 1);
        from.setHours(0, 0, 0, 0);
        to.setFullYear(currentYear, 11, 31);
        to.setHours(23, 59, 59, 999);
        break;
      }
    }

    return { from, to };
  };

  const setPreset = (preset: string): void => {
    const range = getPresetRange(preset);
    setRange(range);
  };

  const checkPreset = (): void => {
    for (const preset of PRESETS) {
      const presetRange = getPresetRange(preset.name);

      const normalizedRangeFrom = new Date(range.from.setHours(0, 0, 0, 0));
      const normalizedPresetFrom = new Date(
        presetRange.from.setHours(0, 0, 0, 0)
      );

      const normalizedRangeTo = new Date(range.to?.setHours(0, 0, 0, 0) ?? 0);
      const normalizedPresetTo = new Date(
        presetRange.to?.setHours(0, 0, 0, 0) ?? 0
      );

      if (
        normalizedRangeFrom.getTime() === normalizedPresetFrom.getTime() &&
        normalizedRangeTo.getTime() === normalizedPresetTo.getTime()
      ) {
        setSelectedPreset(preset.name);
        return;
      }
    }
    setSelectedPreset(undefined);
  };

  useEffect(() => {
    checkPreset();
  }, [range]);

  const PresetButton = ({
    preset,
    label,
    isSelected,
  }: {
    preset: string;
    label: string;
    isSelected: boolean;
  }): JSX.Element => (
    <Button
      className={cn(isSelected && "pointer-events-none")}
      variant="ghost"
      onClick={() => {
        setPreset(preset);
      }}
    >
      <>
        <span className={cn("pr-2 opacity-0", isSelected && "opacity-70")}>
          <CheckIcon width={18} height={18} />
        </span>
        {label}
      </>
    </Button>
  );

  // Helper function to check if two date ranges are equal
  const areRangesEqual = (a?: DateRange, b?: DateRange) => {
    if (!a || !b) return a === b; // If either is undefined, return true if both are undefined
    return (
      a.from.getTime() === b.from.getTime() &&
      (!a.to || !b.to || a.to.getTime() === b.to.getTime())
    );
  };

  useEffect(() => {
    if (isOpen) {
      openedRangeRef.current = range;
    }
  }, [isOpen]);

  return (
    <Popover
      modal={true}
      open={isOpen}
      onOpenChange={(open: boolean) => {
        setIsOpen(open);
      }}
    >
      <PopoverTrigger asChild>
        <Button
          size="lg"
          variant="outline"
          className="h-9 w-full justify-start"
        >
          <div className="-ml-5 text-left inline-flex gap-2 items-center">
            <CalendarIcon width={16} className="inline-block" />
            {`${formatVNDate(range.from)}${
              range.to != null ? " - " + formatVNDate(range.to) : ""
            }`}
          </div>
          <div className="-mr-6 scale-125 pl-1 opacity-60">
            {isOpen ? (
              <ChevronUpIcon width={16} />
            ) : (
              <ChevronDownIcon width={16} />
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align={isSmallScreen ? "center" : "end"}
        className="mx-auto w-auto sm:w-[100%]"
      >
        <div className="flex">
          <div className="flex w-full">
            <div className="flex w-full flex-col">
              <div className="flex flex-col items-center justify-center gap-2 px-3 pb-4 lg:pb-0 sm:px-0">
                <div className="flex items-center space-x-2 py-1 pr-4">
                  <Label htmlFor="compare-mode">Select a time range</Label>
                </div>
                <div className="flex w-full flex-col gap-2">
                  <div className="flex flex-row justify-center gap-2">
                    <DateInput
                      value={range.from}
                      onChange={(date) => {
                        const toDate =
                          range.to == null || date > range.to ? date : range.to;
                        setRange((prevRange) => ({
                          ...prevRange,
                          from: date,
                          to: toDate,
                        }));
                      }}
                    />
                    <div className="py-1">-</div>
                    <DateInput
                      value={range.to}
                      onChange={(date) => {
                        const fromDate = date < range.from ? date : range.from;
                        setRange((prevRange) => ({
                          ...prevRange,
                          from: fromDate,
                          to: date,
                        }));
                      }}
                    />
                  </div>
                </div>
              </div>
              {isSmallScreen && (
                <Select
                  defaultValue={selectedPreset}
                  onValueChange={(value) => {
                    setPreset(value);
                  }}
                >
                  <SelectTrigger className="mx-auto my-4 w-[180px]">
                    <SelectValue placeholder="Chọn..." />
                  </SelectTrigger>
                  <SelectContent>
                    {PRESETS.map((preset) => (
                      <SelectItem key={preset.name} value={preset.name}>
                        {preset.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              <div className="h-fit w-full xl:flex xl:justify-center">
                <Calendar
                  mode="range"
                  onSelect={(value: { from?: Date; to?: Date } | undefined) => {
                    if (value?.from != null && value?.to != null) {
                      setRange({ from: value.from, to: value.to });
                    }
                  }}
                  selected={range}
                  numberOfMonths={isSmallScreen ? 1 : 2}
                  defaultMonth={
                    new Date(
                      new Date().setMonth(
                        new Date().getMonth() - (isSmallScreen ? 0 : 1)
                      )
                    )
                  }
                />
              </div>
            </div>
          </div>
          {!isSmallScreen && (
            <div className="flex flex-col items-end gap-1">
              <div className="mt-6 flex w-full flex-col items-end gap-1 pb-6 pl-6 pr-2">
                {PRESETS.map((preset) => (
                  <PresetButton
                    key={preset.name}
                    preset={preset.name}
                    label={preset.label}
                    isSelected={selectedPreset === preset.name}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-end gap-2 py-2 pr-4 sm:pr-0">
          <Button
            onClick={() => {
              setIsOpen(false);
              // resetValues();
            }}
            variant="ghost"
          >
            Cancel
          </Button>
          <Button
            className="text-background"
            onClick={() => {
              setIsOpen(false);
              if (!areRangesEqual(range, openedRangeRef.current)) {
                onUpdate?.(range);
              }
            }}
          >
            Select
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

DateRangePicker.displayName = "DateRangePicker";
DateRangePicker.filePath =
  "libs/shared/ui-kit/src/lib/date-range-picker/date-range-picker.tsx";
