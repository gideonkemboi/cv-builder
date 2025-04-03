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
      className="flex"
      onChange={onChange}
    />
  );
}
