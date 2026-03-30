function Button({ children }) {
  return (
    <button
      type="submit"
      className="w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700 transition"
    >
      {children}
    </button>
  );
}

export default Button;