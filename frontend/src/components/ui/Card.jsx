function Card({ title, value, color }) {
  return (
    <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-200 text-center hover:scale-105 hover:shadow-xl transition-all duration-300 group">
      <h3 className="text-gray-600 text-sm font-medium uppercase tracking-wide mb-2">
        {title}
      </h3>
      <p className={`text-4xl font-bold ${color || "text-gray-800"} group-hover:scale-110 transition-transform duration-300`}>
        {value}
      </p>
      <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
        <div className={`h-2 rounded-full transition-all duration-500 ${color === 'text-green-600' ? 'bg-green-500' : color === 'text-red-600' ? 'bg-red-500' : 'bg-indigo-500'}`} style={{width: `${Math.min((parseInt(value) / 150) * 100, 100)}%`}}></div>
      </div>
    </div>
  );
}

export default Card;