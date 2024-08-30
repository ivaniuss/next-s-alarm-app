import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TimeSelector = ({ handleTimeChange }) => {
  return (
    <div className="space-y-2">
      <Label className="text-gray-300">Time</Label>
      <div className="flex space-x-2">
        <Select onValueChange={(value) => handleTimeChange('hour', value)}>
          <SelectTrigger className="w-full bg-gray-900 bg-opacity-50 text-white border-gray-700 focus:border-teal-500 transition-all duration-300 hover:bg-opacity-70">
            <SelectValue placeholder="Hour" />
          </SelectTrigger>
          <SelectContent>
            {[...Array(24)].map((_, i) => (
              <SelectItem key={i} value={i.toString().padStart(2, '0')}>
                {i.toString().padStart(2, '0')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleTimeChange('minute', value)}>
          <SelectTrigger className="w-full bg-gray-900 bg-opacity-50 text-white border-gray-700 focus:border-teal-500 transition-all duration-300 hover:bg-opacity-70">
            <SelectValue placeholder="Minute" />
          </SelectTrigger>
          <SelectContent>
            {[...Array(60)].map((_, i) => (
              <SelectItem key={i} value={i.toString().padStart(2, '0')}>
                {i.toString().padStart(2, '0')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TimeSelector;
