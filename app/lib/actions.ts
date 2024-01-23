'use server'
import { z } from 'zod'
import { Invoice } from './definitions'
import { sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

const CreateInvoiceSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string()
})

const CreateInvoiceFromSchema = CreateInvoiceSchema.omit({
  id: true,
  date: true,
})

const updateInvoiceFromSchema = CreateInvoiceSchema.omit({ id: true, date: true})

export async function createInvoice(formData: FormData) {
  try {
    const { customerId, amount, status } = CreateInvoiceFromSchema.parse({ 
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    })

    const amountInCents = amount * 100

    const [date] = new Date().toISOString().split('T')

    await sql`INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})`

    revalidatePath('/dashboard/invoices')
    redirect('/dashboard/invoices')
  } catch (error) {
    console.log(error)
    throw new Error('Failed to create invoice.')
  }
}


export async function updateInvoice(id: string, formData: FormData) {
  try {
    const { customerId, amount, status } = updateInvoiceFromSchema.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    })

    const amountInCents = amount * 100

    sql`UPDATE invoices SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status} WHERE id = ${id}`

    revalidatePath('/dashboard/invoices')
    redirect('/dashboard/invoices')
  } catch (error) {
    throw new Error('Failed to update invoice.')
  }

}

export async function deleteInvoice(id: string) {
  try {
    sql`DELETE FROM invoices WHERE id = ${id}`
    revalidatePath('/dashboard/invoices')
    redirect('/dashboard/invoices')
  } catch (error) {
    throw new Error('Failed to delete invoice.')
  }

}