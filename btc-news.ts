import dotenv from "dotenv";
dotenv.config();

import axios from "axios";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

async function getBTCNews(): Promise<{ html: string; text: string } | null> {
  try {
    const response = await axios.get("https://cryptopanic.com/api/v1/posts/", {
      params: {
        auth_token: process.env.CRYPTOPANIC_API_KEY,
        currencies: "BTC",
        public: true,
      },
    });

    const posts = response.data.results;

    if (posts.length === 0) return null;

    const firstPost = posts[0];
    const title = firstPost.title;
    const source = firstPost.domain;
    const url = firstPost.url;

    const html = `
      <p>📰 <strong>Noticia destacada del día:</strong></p>
      <p>"${title}"</p>
      <p>Fuente: <a href="${url}" target="_blank">${source}</a></p>
    `;

    const text = `📰 Noticia destacada del día:\n"${title}"\nFuente: ${source}\n${url}`;

    return { html, text };
  } catch (error) {
    console.error("Error al obtener noticias de CryptoPanic:", error);
    return null;
  }
}

(async () => {
  const noticia = await getBTCNews();

  if (!noticia) {
    console.log("No se encontró noticia para hoy.");
    return;
  }

  const email = {
    to: process.env.EMAIL_TO!,
    from: process.env.EMAIL_FROM!,
    subject: "Noticia BTC del día",
    text: noticia.text,
    html: noticia.html,
  };

  try {
    await sgMail.send(email);
    console.log("✅ Email con noticia enviado:");
    console.log(noticia.text);
  } catch (error) {
    console.error("❌ Error al enviar email con noticia:", error);
  }
})();
