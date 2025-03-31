import axios from "axios";

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
    const price = btc.usd.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
    const change = btc.usd_24h_change.toFixed(2);
    const trend = btc.usd_24h_change >= 0 ? "📈 Subió" : "📉 Bajó";

    const message = `💰 BTC hoy: ${price}\n${trend} ${Math.abs(
      Number(change)
    )}% en las últimas 24hs`;
    console.log(message);
  } catch (error) {
    console.error("Error al obtener el precio del BTC:", error);
    process.exit(1);
  }
}

getBTCPrice();
