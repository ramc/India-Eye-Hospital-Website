import { Router, type IRouter } from "express";
import { db, appointmentRequestsTable } from "@workspace/db";
import {
  CreateAppointmentBody,
  CreateAppointmentResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

function isValidCalendarDate(value: string): boolean {
  const timestamp = Date.parse(`${value}T00:00:00.000Z`);
  return (
    Number.isFinite(timestamp) &&
    new Date(timestamp).toISOString().slice(0, 10) === value
  );
}

router.post("/appointments", async (req, res): Promise<void> => {
  const parsed = CreateAppointmentBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn(
      {
        issues: parsed.error.issues.map(({ code, path }) => ({ code, path })),
      },
      "Invalid appointment intake",
    );
    res.status(400).json({ error: "Please check the appointment details and try again." });
    return;
  }

  const input = parsed.data;
  const patientName = input.patientName.trim();
  if (
    patientName.length < 2 ||
    (input.preferredDate !== null && !isValidCalendarDate(input.preferredDate))
  ) {
    res.status(400).json({
      error: "Please check the appointment details and try again.",
    });
    return;
  }

  try {
    const [appointment] = await db
      .insert(appointmentRequestsTable)
      .values({
        patientName,
        phoneNumber: input.phoneNumber.trim(),
        language: input.language,
        preferredDate: input.preferredDate,
        paymentType: input.paymentType,
        insuranceProvider:
          input.paymentType === "insurance"
            ? input.insuranceProvider?.trim() || null
            : null,
        consent: input.consent,
      })
      .returning({ id: appointmentRequestsTable.id });

    const message =
      input.language === "hi"
        ? "आपका अनुरोध मिल गया है। हमारी टीम अपॉइंटमेंट की पुष्टि के लिए आपको कॉल करेगी। यह अभी पक्का अपॉइंटमेंट नहीं है।"
        : "Your request is received. Our team will call to confirm your appointment. This is not a confirmed booking yet.";

    res.status(201).json(
      CreateAppointmentResponse.parse({
        requestId: appointment.id,
        status: "received",
        message,
      }),
    );
  } catch {
    req.log.error({}, "Unable to save appointment request");
    res.status(500).json({
      error: "We could not save your request. Please call the hospital for help.",
    });
  }
});

export default router;