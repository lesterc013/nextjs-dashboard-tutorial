// Just for own learning

import postgres from "postgres";
import { Invoice } from "./definitions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

// Export a function to fetch all the invoices
export async function fetchInvoiceCount() {
  try {
    const allInvoices = await sql<Invoice[]>`
      SELECT * FROM invoices
    `;

    const numberOfInvoices = allInvoices.length;
    let totalPaidInvoices = 0;
    let totalPendingInvoices = 0;

    for (let i = 0; i < allInvoices.length; i++) {
      const thisInvoice = allInvoices[i];
      if (thisInvoice.status == "paid") {
        totalPaidInvoices += thisInvoice.amount;
      } else if (thisInvoice.status == "pending") {
        totalPendingInvoices += thisInvoice.amount;
      }
    }

    // Return an object that has the numberOfInvoices, totalPaidInvoices, totalPendingInvoices

    return {
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to retrieve all invoices");
  }
}

// Export a function to fetch all the customers
export async function fetchAllCustomers() {
  try {
    const allCustomers = await sql`
      SELECT * FROM customers
    `;
    return allCustomers;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to retrieve all customers");
  }
}
