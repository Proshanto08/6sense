import { Request, Response } from 'express';
import { sendBrevoEmail, getTransactionalEmails } from './brevoEmailService';
import sanitizeHtml from 'sanitize-html';

export const handleContactFormSubmission = async (req: Request, res: Response): Promise<void> => {
  const { name, email, companyWebsite, message, getNda, consent } = req.body;

  if (!name || !email || !message) {
    res.status(400).json({ status: 400, message: 'Required fields are missing' });
    return;
  }

  // Sanitize user inputs
  const sanitizedHtmlContent = sanitizeHtml(`
    <html>
      <body>
        <h1>Contact Form Submission</h1>
        <p><strong>Name:</strong> ${sanitizeHtml(name)}</p>
        <p><strong>Business Email:</strong> ${sanitizeHtml(email)}</p>
        <p><strong>Company Website:</strong> ${sanitizeHtml(companyWebsite || 'N/A')}</p>
        <p><strong>Message/Project Brief:</strong> ${sanitizeHtml(message)}</p>
        <p><strong>Get an NDA:</strong> ${getNda ? 'Yes' : 'No'}</p>
        <p><strong>Consent to Data Processing:</strong> ${consent ? 'Yes' : 'No'}</p>
      </body>
    </html>
  `);

  const brevoOptions = {
    subject: `New Contact Form Submission from ${sanitizeHtml(name)}`,
    htmlContent: sanitizedHtmlContent,
    sender: { name: 'Contact Form', email: process.env.PERSONAL_EMAIL || '' },
    to: [{ email: process.env.PERSONAL_EMAIL || '', name: sanitizeHtml(name) }],
    replyTo: { email: sanitizeHtml(email), name: sanitizeHtml(name) },
  };

  const result = await sendBrevoEmail(brevoOptions);
  res.status(result.status).json(result);
};

export const handleGetTransactionalEmails = async (req: Request, res: Response): Promise<void> => {
  const filters = {
    email: req.query.email as string,
    templateId: req.query.templateId ? parseInt(req.query.templateId as string, 10) : undefined,
    messageId: req.query.messageId as string,
    startDate: req.query.startDate as string,
    endDate: req.query.endDate as string,
    sort: req.query.sort as 'asc' | 'desc' || 'desc',
    limit: req.query.limit ? parseInt(req.query.limit as string, 10) : 500,
    offset: req.query.offset ? parseInt(req.query.offset as string, 10) : 0,
  };

  const result = await getTransactionalEmails(filters);
  res.status(result.status).json(result);
};
