const TextInputWithLabel = ({
  maxLength = 25,
  elementId,
  labelText,
  type = "text",
  placeholder = "Enter text",
  inputRef,
  onChange,
  value,
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={elementId} className="text-sm font-medium text-gray-700">
        {labelText}
      </label>

      <input
        maxLength={maxLength}
        id={elementId}
        type={type}
        ref={inputRef}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        className="
          w-full
          px-3 py-2
          border border-gray-300
          rounded-md
          shadow-sm
          focus:outline-none
          focus:ring-2 focus:ring-primary
          focus:border-primary
          transition
        "
      />
    </div>
  );
};

export default TextInputWithLabel;
