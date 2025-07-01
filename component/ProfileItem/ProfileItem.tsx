export default function ProfileItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b pb-2 text-gray-700">
      <span className="font-semibold">{label}</span>
      <span>{value}</span>
    </div>
  );
}