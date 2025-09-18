import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const DateTimePicker = ({
  date,
  setDate,
  placeholder = "Pick a date and time",
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeValue, setTimeValue] = useState(
    date ? format(date, "HH:mm") : "09:00"
  );

  const handleDateSelect = (selectedDate) => {
    if (selectedDate) {
      // Preserve the time when selecting a new date
      const [hours, minutes] = timeValue.split(":").map(Number);
      const newDate = new Date(selectedDate);
      newDate.setHours(hours, minutes);
      setDate(newDate);
    } else {
      setDate(undefined);
    }
  };

  const handleTimeChange = (time) => {
    setTimeValue(time);
    if (date) {
      const [hours, minutes] = time.split(":").map(Number);
      const newDate = new Date(date);
      newDate.setHours(hours, minutes);
      setDate(newDate);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP 'at' HH:mm") : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3 border-b">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
          />
        </div>
        <div className="p-3">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <Label htmlFor="time">Time:</Label>
            <Input
              id="time"
              type="time"
              value={timeValue}
              onChange={(e) => handleTimeChange(e.target.value)}
              className="w-auto"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DateTimePicker;
