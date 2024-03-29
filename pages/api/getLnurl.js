import { bech32 } from 'bech32';
import { runMiddleware, corsMiddleware } from "@/utils/middleware";

function encodeLnurl(url) {
   const words = bech32.toWords(Buffer.from(url, 'utf8'));
   return bech32.encode('lnurl', words, 2000).toUpperCase();
}

export default function handler(req, res) {
   runMiddleware(req, res, corsMiddleware);

   const originalUrl = `${process.env.BACKEND_URL}/api/lnurl`
   const encodedLnurl = encodeLnurl(originalUrl);

   res.status(200).json({
       lnurl: encodedLnurl
   })
}
