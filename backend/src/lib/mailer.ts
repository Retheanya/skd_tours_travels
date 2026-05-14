import nodemailer from "nodemailer";

export const sendInquiryEmail = async (details: {
  type: string;
  name: string;
  email: string;
  mobile: string;
  destination: string;
  message: string;
  price?: string;
  carType?: string;
  pickupDate?: string;
}) => {
  try {
    // Configure transporter (using Gmail SMTP, reading from .env if present)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER || "skttravels22@gmail.com",
        pass: process.env.EMAIL_PASS || "dummy-password", // App Password can be configured in backend .env
      }
    });

    const subject = `[SKD TOURS] New ${details.type === "car_booking" ? "Taxi Booking" : "General Inquiry"} - ${details.name}`;
    
    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #F97316; border-radius: 10px; max-width: 600px;">
        <h2 style="color: #F97316; margin-bottom: 20px;">New Customer Submission Received</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="background: #f8fafc;">
            <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Name</td>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${details.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Email</td>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${details.email}</td>
          </tr>
          <tr style="background: #f8fafc;">
            <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Mobile</td>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${details.mobile}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Route/Destination</td>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${details.destination}</td>
          </tr>
          ${details.carType ? `
          <tr style="background: #f8fafc;">
            <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Car Selected</td>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${details.carType}</td>
          </tr>
          ` : ""}
          ${details.pickupDate ? `
          <tr>
            <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Pickup Date</td>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${details.pickupDate}</td>
          </tr>
          ` : ""}
          ${details.price ? `
          <tr style="background: #f8fafc;">
            <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e2e8f0;">Quoted Price</td>
            <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #F97316; font-weight: bold;">${details.price}</td>
          </tr>
          ` : ""}
        </table>
        <div style="margin-top: 20px;">
          <h4 style="color: #000000; margin-bottom: 10px;">Message:</h4>
          <p style="background: #f1f5f9; padding: 15px; border-radius: 8px; border-left: 4px solid #F97316;">${details.message}</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"SKD Tours Enquiries" <${process.env.EMAIL_USER || "skttravels22@gmail.com"}>`,
      to: "skttravels22@gmail.com",
      subject,
      html,
    });

    console.log(`[Mailer] Successfully sent inquiry email for ${details.name} to skttravels22@gmail.com`);
  } catch (err: any) {
    console.error(`[Mailer Error] Failed to send email:`, err.message);
  }
};
