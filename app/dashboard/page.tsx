import { Suspense } from "react"
import { fetchLatestInvoices } from "../lib/data"
import LatestInvoices from "../ui/dashboard/latest-invoices"
import RevenueChart from "../ui/dashboard/revenue-chart"
import { lusitana } from "../ui/fonts"
import { RevenueChartSkeleton } from "../ui/skeletons"

export default async function Page() {

  const latestInvoices = await fetchLatestInvoices()
  console.log(latestInvoices)
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart/>
        </Suspense>
        <LatestInvoices latestInvoices={latestInvoices}/>
      </div>
    </main>
  )

} 