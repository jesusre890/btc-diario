import axios from "axios";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

async function getBTCPrice() {
  try {
    const url = "https://api.coingecko.com/api/v3/simple/price";
    const response = await axios.get(url, {
      params: {
        ids: "bitcoin",
        vs_currencies: "usd",
        include_24hr_change: "true",
      },
    });

    const btc = response.data.bitcoin;
    const price = btc.usd.toLocaleString("es-AR", {
      style: "currency",
      currency: "USD",
    });
    const change = btc.usd_24h_change.toFixed(1);
    const arrow = btc.usd_24h_change >= 0 ? "↗️" : "↘️";
    const msg = `El Bitcoin ${
      btc.usd_24h_change >= 0 ? "subió" : "bajó"
    } a ${price}\n- ${Math.abs(
      Number(change)
    )}% ${arrow}\nFuente: http://coingecko.com`;

    const email = {
      to: process.env.EMAIL_TO!,
      from: process.env.EMAIL_FROM!,
      subject: "Actualización BTC",
      text: msg,
    };

    await sgMail.send(email);
    console.log("✅ Email enviado:", msg);
  } catch (error) {
    console.error(
      "❌ Error al obtener el precio del BTC o enviar email:",
      error
    );
    process.exit(1);
  }
}

getBTCPrice();
