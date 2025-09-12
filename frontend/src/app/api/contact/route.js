// src/app/api/contact/route.js
import { NextResponse } from "next/server";
import { transporter, mailOption } from "../../config/nodemailer";

export async function POST(req) {
  const data = await req.json();
  const { firstName, lastName, email, company, country, service, message } =
    data;

  const mailContent = `
    You have a new contact form submission:
    Name: ${firstName} ${lastName}
    Email: ${email}
    Company: ${company || "N/A"}
    Country: ${country || "N/A"}
    Service: ${service}
    Message: ${message}

    ----
    Sent via your Gigantech contact form.
  `;

  if (!email || !firstName || !lastName || !service || !message) {
    return NextResponse.json(
      { success: false, message: "All required fields must be filled." },
      { status: 400 }
    );
  }

  try {
    await transporter.sendMail({
      ...mailOption,
      subject: `Contact form - ${firstName} ${lastName} (New submission)`,
      text: mailContent,
    });
    return NextResponse.json({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
