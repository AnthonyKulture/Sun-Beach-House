import { Resend } from 'resend';
import 'dotenv/config';

const resend = new Resend(process.env.RESEND_API_KEY);

async function test() {
  const { data, error } = await resend.emails.send({
    from: 'Sun Beach House - Villa Rental St-Barth <valerie@sun-beach-house.com>',
    to: ['test@example.com'],
    subject: 'Test',
    html: '<p>Test</p>'
  });
  console.log({ data, error });
}
test();
