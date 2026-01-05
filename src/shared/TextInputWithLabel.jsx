const TextInputWithLabel = ({
  elementId,
  labelText,
  type = "text",
  placeholder = "Enter text",
  ref,
  onChange,
  value,
}) => {
  let style = {
    padding: "5px",
    paddingLeft: "10px",
    marginLeft: "5px",
    marginRight: "5px",
  };
  return (
    <>
      <label htmlFor={elementId}>{labelText}</label>

      {/* Input Elements */}
      <input
        style={style}
        type={type}
        id={elementId}
        ref={ref}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
      />
    </>
  );
};

export default TextInputWithLabel;
