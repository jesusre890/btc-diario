import dotenv from "dotenv";
dotenv.config();

import axios from "axios";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

async function getBTCPrice() {
  try {
    const url = "https://api.coingecko.com/api/v3/coins/bitcoin";
    const response = await axios.get(url, {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: false,
      },
    });

    const data = response.data;
    const price = data.market_data.current_price.usd.toLocaleString("es-AR", {
      style: "currency",
      currency: "USD",
    });

    const change24h = data.market_data.price_change_percentage_24h.toFixed(1);
    const change7d = data.market_data.price_change_percentage_7d.toFixed(1);
    const isUp = parseFloat(change24h) >= 0;
    const symbol = isUp ? "🚀" : "📉";
    const sign24 = isUp ? "+" : "-";

    const msg = `Bitcoin ahora en ${price}\n${sign24}${Math.abs(
      Number(change24h)
    )}% hoy ${symbol} | ${change7d}% en los últimos 7 días\nFuente: coingecko.com`;

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
