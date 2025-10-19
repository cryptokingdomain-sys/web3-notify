export default async function handler(req, res) {
  // スクリプトのプロパティ（BEARER_SECRET）と照合
  const secret = process.env.BEARER_SECRET;
  const auth = req.headers.authorization || "";

  // 認証チェック
  if (!secret || !auth.startsWith("Bearer ") || auth.slice(7) !== secret) {
    return res.status(401).json({ error: "unauthorized" });
  }

  // 成功時の応答（受け取った内容をそのまま返す）
  res.status(200).json({ ok: true, received: req.body || null });
}
