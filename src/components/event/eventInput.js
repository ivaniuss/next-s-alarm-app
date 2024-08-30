import { forwardRef } from 'react';
import { Input } from "@/components/ui/input";
import EventLabel from './eventLabel';

export default function EventInput({ name, placeholder, value, onChange, type = "text", onFocus, inputRef }) {
  return (
    <div className="space-y-2">
      <EventLabel htmlFor={name} className="text-gray-300">{placeholder}</EventLabel>
      <Input
        ref={inputRef}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
        onFocus={onFocus}
        className="bg-gray-900 bg-opacity-50 text-white placeholder-gray-500 border-gray-700 focus:border-teal-500 transition-all duration-300 hover:bg-opacity-70"
      />
    </div>
  );

};