const API_URL = (process.env.EXPO_PUBLIC_API_URL || '').replace(/\/$/, '');

export async function fetchLiveRates() {
  if (!API_URL) return null;
  const response = await fetch(`${API_URL}/rates`);
  if (!response.ok) throw new Error('rates_unavailable');
  return response.json();
}

export async function fetchRateHistory(currency: string) {
  if (!API_URL) return null;
  const response = await fetch(`${API_URL}/rates/history/${currency}`);
  if (!response.ok) throw new Error('history_unavailable');
  return response.json();
}

export async function createPaymentRequest(input: { senderUserId: string; recipientUid?: string; recipientPhone?: string; currency: string; amount: number }) {
  if (!API_URL) throw new Error('api_not_configured');
  const response = await fetch(`${API_URL}/payment-requests`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(input) });
  if (!response.ok) throw new Error('request_failed');
  return response.json();
}
