import { useMemo, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const MAX_MESSAGES = 8;

export default function ClinicalChat() {
  const { t } = useLanguage();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const canSend = useMemo(
    () => input.trim().length > 0 && !isLoading,
    [input, isLoading]
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    const content = input.trim();
    if (!content || isLoading) return;

    const nextMessages = [...messages, { role: "user", content }];
    const trimmedMessages = nextMessages.slice(-MAX_MESSAGES);
    setMessages(nextMessages);
    setInput("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat?stream=1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: trimmedMessages })
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Request failed.");
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("Streaming not supported.");
      }

      let assistantText = "";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "" }
      ]);

      const decoder = new TextDecoder();
      let buffer = "";
      let done = false;

      while (!done) {
        const { value, done: streamDone } = await reader.read();
        done = streamDone;
        if (value) {
          buffer += decoder.decode(value, { stream: true });
          const parts = buffer.split("\n\n");
          buffer = parts.pop() || "";

          for (const part of parts) {
            const line = part.trim();
            if (!line.startsWith("data:")) continue;
            const data = line.replace(/^data:\s*/, "");
            if (data === "[DONE]") {
              done = true;
              break;
            }
            try {
              const parsed = JSON.parse(data);
              if (parsed?.type === "delta" && parsed.text) {
                assistantText += parsed.text;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: "assistant",
                    content: assistantText
                  };
                  return updated;
                });
              }
            } catch {
              // Ignore malformed chunks.
            }
          }
        }
      }
    } catch (err) {
      setError(err?.message || "Unexpected error.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="rounded-3xl border border-slate/10 bg-white p-6 shadow-card">
      <div className="rounded-2xl border border-slate/10 bg-mist/60 p-4">
        <div className="flex h-[420px] flex-col gap-3 overflow-y-auto md:h-[520px]">
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

      <form onSubmit={handleSubmit} className="mt-4 flex flex-wrap gap-3">
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={t("chat_input_placeholder")}
          className="min-w-[240px] flex-1 rounded-xl border border-slate/20 bg-white px-4 py-3 text-sm text-ink shadow-sm"
        />
        <button
          type="submit"
          disabled={!canSend}
          className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white disabled:opacity-60"
        >
          {t("chat_send")}
        </button>
      </form>
    </section>
  );
}
