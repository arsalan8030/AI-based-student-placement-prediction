function Input({ id, name, type = "text", placeholder, value, onChange, required, min, max, step }) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      min={min}
      max={max}
      step={step}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 bg-white/50 backdrop-blur-sm placeholder-gray-400 text-gray-900"
    />
  );
}

export default Input;