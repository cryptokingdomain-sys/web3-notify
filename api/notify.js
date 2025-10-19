export const config = { runtime: 'edge' };

export default async function handler(req) {
  try {
    const secret = process.env.BEARER_SECRET;
    const auth = req.headers.get('authorization') || '';

    if (!secret || !auth.startsWith('Bearer ') || auth.slice(7) !== secret) {
      return new Response(JSON.stringify({ error: 'unauthorized' }), {
        status: 401,
        headers: { 'content-type': 'application/json' }
      });
    }

    let body = null;
    try { body = await req.json(); } catch { body = null; }

    return new Response(JSON.stringify({ ok: true, received: body }), {
      status: 200,
      headers: { 'content-type': 'application/json' }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'server_error', detail: String(e) }), {
      status: 500,
      headers: { 'content-type': 'application/json' }
    });
  }
}
