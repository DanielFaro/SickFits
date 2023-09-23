// Using Ethereal for fake email accounts.
import "dotenv/config";
import {
  createTransport,
  getTestMessageUrl,
  SentMessageInfo,
} from "nodemailer";

const transport = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function makeANiceEmail(text: string): string {
  return `
  <div style="
    border: 1px solid black;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px;
    ">
    <h2>Hello There!</h2>
    <p>${text}</p>
    <p>sincerely dan</p>
  </div>
  `;
}

export interface Envelope {
  from: string;
  to?: string[] | null;
}

export interface MailResponse {
  accepted?: string[] | null;
  rejected?: string[] | null;
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: Envelope;
  messageId: string;
}

export async function sendPasswordResetEmail(
  resetToken: string,
  to: string
): Promise<void> {
  // We expect the function to return a Promise, and eventually resolve and return nothing
  // email the user a token
  const info = (await transport.sendMail({
    to,
    from: "test@example.com",
    subject: "Your password reset token!",
    html: makeANiceEmail(`Your Password Reset Token is here!
    
      <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click Here to reset</a>
    `),
  })) as MailResponse; // tells sendMail what we expect to return
  console.log("### hey test");
  if (process.env.MAIL_USER.includes("ethereal.email")) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.log(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `Message Sent! Preview it at ${getTestMessageUrl(
        info as SentMessageInfo
      )}`
    );
  }
}
