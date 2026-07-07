import { Download, FileText } from "lucide-react";
import { demoInvoices } from "@/lib/demo-account";
import { formatCurrency } from "@/lib/utils";

export default function InvoicesPage() {
  return (
    <div className="card p-6 sm:p-8">
      <h2 className="h-display mb-6 text-xl">Invoices & receipts</h2>
      <ul className="divide-y divide-[rgb(var(--border))]">
        {demoInvoices.map((inv) => (
          <li key={inv.id} className="flex flex-wrap items-center gap-4 py-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-aqua-500/10">
              <FileText className="h-5 w-5 text-aqua-500" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold">{inv.id}</p>
              <p className="text-xs text-muted">{inv.period}</p>
            </div>
            <span className="chip !border-emerald-500/30 !bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              {inv.status}
            </span>
            <span className="w-24 text-right font-display font-bold">{formatCurrency(inv.amount)}</span>
            <button
              type="button"
              className="btn-secondary !px-4 !py-2 text-xs"
              title="PDF download available in production"
            >
              <Download className="h-4 w-4" aria-hidden /> PDF
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-xs text-muted">
        Monthly statements consolidate all orders and subscription charges. Commercial accounts see
        cost-center breakdowns here.
      </p>
    </div>
  );
}
