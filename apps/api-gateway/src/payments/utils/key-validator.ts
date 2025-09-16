import { createHmac } from 'crypto';

export class keyValidator {
  static validateMercadoPagoSignature(
    xSignature: string,
    xRequestId: string,
    resourceId: string
  ): boolean {
    const parts = xSignature.split(',');
    const tsPart = parts.find(p => p.startsWith('ts='));
    const v1Part = parts.find(p => p.startsWith('v1='));
    if (!tsPart || !v1Part) return false;

    const ts = tsPart.split('=')[1];
    const sig = v1Part.split('=')[1];
    const secretKey = process.env.MERCADO_PAGO_WEBHOOK_SECRET_KEY!

    const manifest = `id:${resourceId};request-id:${xRequestId};ts:${ts};`;
    const expected = createHmac('sha256', secretKey)
      .update(manifest)
      .digest('hex');

    return sig === expected;
  }
}
