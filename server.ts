import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // AI Math Solver Endpoint using Gemini API
  app.post("/api/ai-math-solver", async (req, res) => {
    try {
      const { prompt, mode } = req.body;
      if (!prompt || typeof prompt !== "string") {
        return res.status(400).json({ error: "الرجاء تقديم مسألة رياضية أو استفسار." });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          error: "مفتاح Gemini API غير مهيأ. يرجى إضافته في إعدادات المفاتيح (Secrets).",
        });
      }

      const ai = new GoogleGenAI({ apiKey });

      const systemInstruction = `
أنت خبير رياضيات ذكي ومساعد حاسبة متقدم باللغة العربية.
مهمتك:
1. حل المسألة الرياضية المقدمة خطوة بخطوة باللغة العربية السليمة والمبسطة.
2. تقديم النتيجة النهائية بوضوح وتحديدها.
3. استخدام صيغ مريحة للعين ومعادلات واضحة.
4. إذا كانت المسألة تتعلق بالحسابات المالية (مثل الزكاة، القروض، النسب، الخصومات) أظهر الخطوات التفصيلية مع صيغة القانون المستخدم.
5. حافظ على النبرة الاحترافية والداعمة.
`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.2,
        },
      });

      const text = response.text || "تعذر الحصول على إجابة، يرجى المحاولة مرة أخرى.";
      return res.json({ result: text });
    } catch (err: any) {
      console.error("AI Solver Error:", err);
      return res.status(500).json({
        error: "حدث خطأ أثناء معالجة الطلب بالذكاء الاصطناعي: " + (err.message || "خطأ غير معروف"),
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for dev or Static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
