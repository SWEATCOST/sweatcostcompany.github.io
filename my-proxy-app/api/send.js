// my-proxy-app/api/send.js
export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // 원래 코드 실행
  const response = await fetch(
    "https://script.google.com/macros/s/AKfycbydH2KE4bbSqZ2ScKd78TNOhB8bKeJcw4vlXjTQnCaCmJuoiFSQTtOpX4Ytdp3rpF3S/exec",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    }
  );

  const text = await response.text();
  res.status(200).send(text);
}

