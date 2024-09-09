import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  console.log({ confirmLink });

  try {
    await resend.emails.send({
      from: "0001-auth",
      to: email,
      subject: "Verify your email",
      html: `<p>Click <a href=${confirmLink}>here </a> to verify your email address.</p>`,
    });
  } catch (err) {
    throw err;
  }
};
