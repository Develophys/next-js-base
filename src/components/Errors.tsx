interface ErrorProps {
  errors?: string[];
}

export default function Errors({ errors }: ErrorProps) {
  return (
    <div className="text-sm text-red-400">
      {errors?.map((err, index) => (
        <p key={index}>{err}</p>
      ))}
    </div>
  );
}
