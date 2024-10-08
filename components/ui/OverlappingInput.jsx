export default function OverlappingInput({ type, name, id, placeholder, options }) {
  return type === 'select' ? (
    <div className="relative">
      {' '}
      <label
        htmlFor={id}
        className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900 rounded-sm"
      >
        {name}
      </label>
      <select
        type={type}
        name={id}
        id={id}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      >
        {
          options.map((opt) => (
            <option key={opt.label} value={opt.value}>{opt.label}</option>
          ))
        }
 
        
      </select>
    </div>
  ) : (
    <div className="relative">
      <label
        htmlFor={id}
        className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
      >
        {name}
      </label>
      <input
        type={type}
        name={id}
        id={id}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder={placeholder}
      />
    </div>
  );
}
