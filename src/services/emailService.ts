// Email service using Resend API
// Replace RESEND_API_KEY with your actual API key from resend.com

interface EmailTemplate {
  to: string;
  subject: string;
  html: string;
}

interface DemoRequest {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  createdAt: string;
}

// Track email opens
const emailTracking: Record<string, { sent: boolean; opened: boolean; openedAt?: string }> = {};

export const trackEmailOpen = (emailId: string) => {
  if (emailTracking[emailId]) {
    emailTracking[emailId].opened = true;
    emailTracking[emailId].openedAt = new Date().toISOString();
  }
};

export const getEmailStats = () => {
  const stats = Object.values(emailTracking);
  const sent = stats.length;
  const opened = stats.filter(s => s.opened).length;
  const openRate = sent > 0 ? (opened / sent) * 100 : 0;
  return { sent, opened, openRate: openRate.toFixed(1) };
};

export const sendDemoConfirmationEmail = async (request: DemoRequest): Promise<boolean> => {
  const trackingId = `demo-${request.id}`;
  const trackingPixel = `<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" width="1" height="1" alt="" onload="fetch('/api/track/${trackingId}')" />`;
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Montserrat', Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 8px; overflow: hidden; }
        .header { background: linear-gradient(135deg, #0A0F1A 0%, #1a2332 100%); padding: 40px 20px; text-align: center; }
        .logo { font-size: 32px; color: #00E0FF; font-weight: bold; }
        .content { padding: 40px 30px; }
        h1 { color: #0A0F1A; font-size: 24px; margin-bottom: 20px; }
        p { color: #555; line-height: 1.6; margin-bottom: 15px; }
        .cta { display: inline-block; background: #00E0FF; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 600; }
        .footer { background: #f9f9f9; padding: 20px; text-align: center; color: #888; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">🧠 Innobiz AI</div>
        </div>
        <div class="content">
          <h1>¡Gracias por tu interés en DataSense!</h1>
          <p>Hola ${request.name},</p>
          <p>Hemos recibido tu solicitud de demo para DataSense. Nuestro equipo la está revisando y nos pondremos en contacto contigo en las próximas 24 horas.</p>
          <p><strong>Detalles de tu solicitud:</strong></p>
          <ul>
            <li>Empresa: ${request.company}</li>
            <li>Email: ${request.email}</li>
            <li>Teléfono: ${request.phone}</li>
          </ul>
          <p>Mientras tanto, te invitamos a explorar más sobre cómo DataSense puede transformar tu negocio.</p>
          <a href="https://innobiz.ai/datasense" class="cta">Explorar DataSense</a>
          <p>¿Tienes preguntas? Responde a este email o contáctanos en jaricapa@innobiz.io</p>
        </div>
        <div class="footer">
          <p>© 2025 Innobiz AI · Estrategia impulsada por datos</p>
          <p>Este es un email automático. Por favor no respondas directamente.</p>
        </div>
      </div>
      ${trackingPixel}
    </body>
    </html>
  `;

  emailTracking[trackingId] = { sent: true, opened: false };
  
  // Simulate email sending (replace with actual Resend API call)
  console.log('📧 Sending confirmation email to:', request.email);
  return simulateEmailSend(request.email, 'Confirmación de Demo - DataSense', html);
};

export const sendAdminNotificationEmail = async (request: DemoRequest): Promise<boolean> => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 8px; padding: 30px; }
        h1 { color: #0A0F1A; font-size: 22px; margin-bottom: 20px; }
        .info-box { background: #f9f9f9; padding: 20px; border-left: 4px solid #00E0FF; margin: 20px 0; }
        .info-box p { margin: 8px 0; color: #333; }
        .label { font-weight: bold; color: #0A0F1A; }
        .cta { display: inline-block; background: #947EFF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🔔 Nueva Solicitud de Demo - DataSense</h1>
        <div class="info-box">
          <p><span class="label">Nombre:</span> ${request.name}</p>
          <p><span class="label">Email:</span> ${request.email}</p>
          <p><span class="label">Empresa:</span> ${request.company}</p>
          <p><span class="label">Teléfono:</span> ${request.phone}</p>
          <p><span class="label">Mensaje:</span> ${request.message}</p>
          <p><span class="label">Fecha:</span> ${new Date(request.createdAt).toLocaleString('es-ES')}</p>
        </div>
        <a href="https://innobiz.ai/admin" class="cta">Ver en Dashboard</a>
        <p style="margin-top: 30px; color: #888; font-size: 14px;">Este email fue generado automáticamente por el sistema DataSense.</p>
      </div>
    </body>
    </html>
  `;

  console.log('📧 Sending admin notification to: jaricapa@innobiz.io');
  return simulateEmailSend('jaricapa@innobiz.io', `Nueva Demo Request: ${request.company}`, html);
};

// Simulate email sending (replace with actual Resend API)
const simulateEmailSend = async (to: string, subject: string, html: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`✅ Email sent to ${to}: ${subject}`);
      resolve(true);
    }, 500);
  });
};

// Real Resend implementation (uncomment when ready)
/*
export const sendEmailWithResend = async (template: EmailTemplate) => {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'DataSense <noreply@innobiz.io>',
      to: template.to,
      subject: template.subject,
      html: template.html,
    }),
  });
  return response.ok;
};
*/
