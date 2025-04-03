# 🟠 BTC Diario

BTC Diario es una automatización que informa el **precio actual del Bitcoin** cada 6 horas y envía **una noticia relevante** por día relacionada con BTC.

Utiliza:
- [CoinGecko API](https://coingecko.com/) para obtener precios y variaciones
- [CryptoPanic API](https://cryptopanic.com/) para obtener noticias diarias
- [SendGrid](https://sendgrid.com/) para el envío automático de emails
- [GitHub Actions](https://github.com/features/actions) para ejecutar todo en la nube

---

## ✨ ¿Qué hace?

### 📈 Precio BTC (cada 6 horas)
- Precio en USD
- Variación diaria y semanal
- Email automático con formato limpio y claro

Ejemplo:
```
Bitcoin en USD: $70.215,00  
+1.9% hoy 🚀 | +5.3% en los últimos 7 días  
Fuente: coingecko.com
```

### 📰 Noticia destacada (1 vez por día a las 17:30 🇦🇷)
- Extraída automáticamente desde CryptoPanic
- Título traducido al español usando LibreTranslate
- Link limpio e integrado

Ejemplo:
```
📰 Noticia destacada del día:
"Legisladores de Alabama proponen una reserva estatal en Bitcoin"
Fuente: zycrypto.com
```

---

## 📦 Tecnologías

- `TypeScript`
- `Node.js`
- `axios`
- `SendGrid API`
- `CryptoPanic API`
- `LibreTranslate API`
- `GitHub Actions`

---

## 🔧 Setup local

1. Clonar el proyecto
```bash
git clone https://github.com/tuusuario/btc-diario.git
cd btc-diario
```

2. Instalar dependencias
```bash
npm install
```

3. Crear un archivo `.env`
```env
SENDGRID_API_KEY=tu_api_key_de_sendgrid
EMAIL_FROM=btcdiario@tucorreo.com
EMAIL_TO=tu_email_destino@gmail.com
CRYPTOPANIC_API_KEY=tu_api_key_de_cryptopanic
```

4. Ejecutar scripts
```bash
# Precio actual
npx ts-node index.ts

# Noticia destacada
npx ts-node btc-news.ts
```

---

## ☁️ Automatización con GitHub Actions

El proyecto incluye dos workflows:

- `.github/workflows/btc-check.yml`: ejecuta `index.ts` cada 6 horas
- `.github/workflows/btc-news.yml`: ejecuta `btc-news.ts` todos los días a las 17:30 (hora de Argentina)

---

## 📬 Resultado

Recibirás dos mails diarios:
- Actualización de precio (cada 6 hs)
- Noticia destacada del día (una vez)

---

## 🙌 Autor

Hecho por [jesusre890](https://github.com/jesusre890) — desarrollador frontend & automatizador 

---

## 🧡 A futuro...

- Publicar en X (Twitter) automáticamente
- Generar imagen con la info para Instagram
- Dashboard web con históricos y gráficas