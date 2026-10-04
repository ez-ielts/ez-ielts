// rows: [{ label, value }]. Hairline-ruled key/value table.
export function SummaryTable({ rows }) {
  return (
    <table className="w-full border-collapse text-[13px]">
      <tbody>
        {rows.map((row) => (
          <tr key={row.label}>
            <th scope="row" className="border-b border-ink/40 p-2 text-left font-normal text-neutral-800">{row.label}</th>
            <td className="border-b border-ink/40 p-2 text-right font-bold">{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
