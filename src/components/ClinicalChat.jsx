import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function ClinicalChat() {
  const { t } = useLanguage();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const content = input.trim();
    if (!content || isLoading) return;

    const nextMessages = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages })
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Request failed.");
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.text || "" }
      ]);
    } catch (err) {
      setError(err?.message || "Unexpected error.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="rounded-3xl border border-slate/10 bg-white p-8 shadow-card">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate">
          {t("chat_kicker")}
        </p>
        <h2 className="font-display text-2xl text-ink">
          {t("chat_title")}
        </h2>
        <p className="text-sm text-slate">
          {t("chat_disclaimer")}
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-slate/10 bg-mist/60 p-4">
        <div className="flex max-h-72 flex-col gap-3 overflow-y-auto">
          {messages.length === 0 ? (
            <p className="text-sm text-slate">{t("chat_empty_prompt")}</p>
          ) : (
            messages.map((msg, index) => (
              <div
                key={`${msg.role}-${index}`}
                className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "self-end bg-white text-ink"
                    : "bg-white/70 text-slate"
                }`}
              >
                <span className="block text-xs uppercase tracking-[0.2em] text-slate/70">
                  {msg.role === "user"
                    ? t("chat_user_label")
                    : t("chat_assistant_label")}
                </span>
                <p className="mt-1 whitespace-pre-line">{msg.content}</p>
              </div>
            ))
          )}
          {isLoading && (
            <div className="rounded-2xl bg-white/70 px-4 py-3 text-sm text-slate">
              {t("chat_loading")}
            </div>
          )}
        </div>
      </div>

      {error && <p className="mt-3 text-sm text-rose-600">{error}</p>}

      <form onSubmit={handleSubmit} className="mt-6 flex flex-wrap gap-3">
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={t("chat_input_placeholder")}
          className="min-w-[240px] flex-1 rounded-xl border border-slate/20 bg-white px-4 py-3 text-sm text-ink shadow-sm"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white disabled:opacity-60"
        >
          {t("chat_send")}
        </button>
      </form>
    </section>
  );
}
