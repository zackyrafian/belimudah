function Input({
  label,
  name,
  placeholder,
  type = "text",
  icon: Icon,
  register,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name}>{label}</label>
      <div className="flex py-3 px-4 text-sm border border-black/20 rounded-xl items-center gap-2">
        {Icon && <Icon className="text-gray-500" size={18} />}
        <input
          {...register(name)}
          className="w-full h-full outline-none"
          id={name}
          type={type}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

export default Input;