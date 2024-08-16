import getbaseUrl from "@/lib/base-url";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
export default async function sendVerificationCode(
  email: string,
  token: string
) {
  const confirmLink = `${getbaseUrl()}/auth/new-verification?token=${token}`;
  const { data, error } = await resend.emails.send({
    from: "sharmaHimanshu030700@gmail.com",
    to: ["sharmaHimanshu030700@gmail.com"],
    subject: "Email Verification",
    react: `<p> Click to verify <a href="${confirmLink}"> Confirm Link</a></p>`,
  });
  // resend.emails.send({
  //   from: "onboarding@resend.dev",
  //   to: "sharmahimanshu030700@gmail.com",
  //   subject: "Hello World",
  //   html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
  // });
  // return true;
  if (error) return console.log(error);
  if (data) return data;
}
