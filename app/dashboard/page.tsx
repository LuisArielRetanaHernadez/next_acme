import { Suspense } from "react"
import { fetchCardData, fetchLatestInvoices } from "../lib/data"
import LatestInvoices from "../ui/dashboard/latest-invoices"
import RevenueChart from "../ui/dashboard/revenue-chart"
import { lusitana } from "../ui/fonts"
import { RevenueChartSkeleton } from "../ui/skeletons"
import { Card } from "../ui/dashboard/cards"

export default async function Page() {

  const latestInvoices = await fetchLatestInvoices()
  const {
    totalPaidInvoices,
    totalPendingInvoices,
    numberOfInvoices,
    numberOfCustomers,
  } = await fetchCardData()

  console.log(latestInvoices)
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pendign" value={totalPendingInvoices} type="pending" />
        <Card title="Total" value={numberOfInvoices} type="invoices" />
        <Card title="Collected" value={numberOfCustomers} type="customers" />

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