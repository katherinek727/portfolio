import emailjs from '@emailjs/browser';

export type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const CONTACT_EMAIL = 'katherinek0727@outlook.com';

function sendViaMailto(data: ContactFormData): void {
  const subject = data.subject.trim() || `Portfolio message from ${data.name}`;
  const body = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    '',
    data.message,
  ].join('\n');

  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export async function sendContactMessage(data: ContactFormData): Promise<'emailjs' | 'mailto'> {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (serviceId && templateId && publicKey) {
    await emailjs.send(
      serviceId,
      templateId,
      {
        from_name: data.name,
        from_email: data.email,
        reply_to: data.email,
        subject: data.subject.trim() || 'New portfolio message',
        message: data.message,
        to_email: CONTACT_EMAIL,
      },
      { publicKey },
    );
    return 'emailjs';
  }

  sendViaMailto(data);
  return 'mailto';
}
