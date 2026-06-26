import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendApiKeyEmail(to: string, apiKey: string) {
  await resend.emails.send({
    from: 'GymAPI <noreply@gymapi.com>',
    to,
    subject: 'Your GymAPI Key is Ready',
    html: `
      <h2>Your API key has been approved</h2>
      <p>Here is your API key (save it — it will not be shown again):</p>
      <code style="font-size:18px">${apiKey}</code>
    `,
  })
}
