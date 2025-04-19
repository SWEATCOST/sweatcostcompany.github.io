// my-proxy-app/api/send.js

export default async function handler(req, res) {
  const targetUrl = "https://script.google.com/macros/s/AKfycbydH2KE4bbSqZ2ScKd78TNOhB8bKeJcw4vlXjTQnCaCmJuoiFSQTtOpX4Ytdp3rpF3S/exec";

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.text(); // 혹은 .json()
    res.status(200).send(data);
  } catch (err) {
    console.error("❌ Proxy Error:", err);
    res.status(500).json({ error: "Proxy failed" });
  }
}
