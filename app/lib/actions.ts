'use server'
import { z } from 'zod'
import { Invoice } from './definitions'

const CreateInvoiceSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['paid', 'unpaid']),
})

const CreateInvoiceFromSchema = CreateInvoiceSchema.omit({
  id: true,
  status: true,
})

export async function createInvoice(formData: FormData) {
  // const rawFormData = { 
  //   customerId: formData.get('customerId'),
  //   amount: formData.get('amount'),
  //   status: formData.get('status'),
  // }

  const rawFormData = Object.fromEntries(formData.entries())
}
