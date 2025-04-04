interface InputProps {
  id: string;
  type?: string;
  value?: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  id,
  type = "text",
  value,
  placeholder,
  onChange,
}: InputProps) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      placeholder={placeholder}
      className="flex w-full rounded-sm bg-blue-50 p-2 text-sm font-light"
      onChange={onChange}
    />
  );
}
