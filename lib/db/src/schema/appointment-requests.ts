import { createInsertSchema } from "drizzle-zod";
import { boolean, date, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { z } from "zod/v4";

export const appointmentRequestsTable = pgTable("appointment_requests", {
  id: uuid("id").primaryKey().defaultRandom(),
  patientName: text("patient_name").notNull(),
  phoneNumber: text("phone_number").notNull(),
  language: varchar("language", { length: 2 }).notNull(),
  preferredDate: date("preferred_date", { mode: "string" }),
  paymentType: text("payment_type").notNull(),
  insuranceProvider: text("insurance_provider"),
  consent: boolean("consent").notNull(),
  status: text("status").notNull().default("received"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertAppointmentRequestSchema = createInsertSchema(
  appointmentRequestsTable,
).omit({
  id: true,
  status: true,
  createdAt: true,
});

export type InsertAppointmentRequest = z.infer<
  typeof insertAppointmentRequestSchema
>;
export type AppointmentRequest = typeof appointmentRequestsTable.$inferSelect;