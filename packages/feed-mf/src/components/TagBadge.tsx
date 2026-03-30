interface Props {
  label: string;
}

export default function TagBadge({ label }: Props) {
  return (
    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-brand-100 text-brand-700 tracking-wide">
      {label}
    </span>
  );
}
