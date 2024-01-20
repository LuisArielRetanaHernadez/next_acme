'use server'
import { z } from 'zod'
import { Invoice } from './definitions'
import { sql } from '@vercel/postgres'

const CreateInvoiceSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['paid', 'unpaid']),
  date: z.string()
})

const CreateInvoiceFromSchema = CreateInvoiceSchema.omit({
  id: true,
  status: true,
})

export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoiceFromSchema.parse({ 
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  })

  const amountInCents = amount * 100

  const [date] = new Date().toISOString().split('T')

  await sql`INSERT INTO invoices (customer_id, amount, status, date)
  VALUES (${customerId}, ${amountInCents}, ${amount}, ${status}, ${date})`
}
