type SpecRow = { label: string; value: string };

type GiftSpecsTableProps = {
  rows: SpecRow[];
};

export default function GiftSpecsTable({ rows }: GiftSpecsTableProps) {
  if (rows.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-border/80 bg-white/90">
      <table className="w-full text-left text-sm">
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-border/60 last:border-0">
              <th className="w-1/3 px-4 py-3 font-medium text-muted-foreground">
                {row.label}
              </th>
              <td className="px-4 py-3 text-foreground">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}