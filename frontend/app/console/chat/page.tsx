"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bot, Send, User, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { api, type ChatTurn } from "@/lib/api";

interface ChatAgent {
  name: string;
  label: string;
  suggestions: string[];
}

export default function ChatPage() {
  const [agents, setAgents] = useState<ChatAgent[]>([]);
  const [agent, setAgent] = useState("sentinel_orchestrator");
  const [messages, setMessages] = useState<ChatTurn[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    api
      .chatAgents()
      .then((r) => setAgents(r.agents))
      .catch(() => setError("Could not load agents. The chat service may be unavailable."));
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const currentAgent = agents.find((a) => a.name === agent);
  const suggestions = currentAgent?.suggestions ?? [];

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setError("");
    const userTurn: ChatTurn = { role: "user", content: trimmed };
    const nextMessages = [...messages, userTurn];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await api.chat(agent, trimmed, messages);
      setMessages([...nextMessages, { role: "agent", content: res.reply }]);
    } catch {
      setError("Failed to reach the agent. Please try again.");
      setMessages([
        ...nextMessages,
        {
          role: "agent",
          content: "Sorry, I couldn't process that request. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-[calc(100vh-7rem)] flex-col">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Chat</h1>
          <p className="text-muted-foreground">Converse with your environmental intelligence agents.</p>
        </div>
        <Select value={agent} onValueChange={(v) => v && setAgent(v)}>
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Select agent" />
          </SelectTrigger>
          <SelectContent>
            {agents.map((a) => (
              <SelectItem key={a.name} value={a.name}>
                {a.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-1 flex-col overflow-hidden rounded-lg border">
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <Bot className="mb-3 h-10 w-10 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Start a conversation with{" "}
                <span className="font-medium text-foreground">
                  {currentAgent?.label || "the agent fleet"}
                </span>
              </p>
              {suggestions.length > 0 && (
                <div className="mt-6 flex max-w-md flex-col gap-2">
                  <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                    <Sparkles className="h-3.5 w-3.5" />
                    Try asking
                  </div>
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="rounded-md border bg-background px-4 py-2 text-sm transition-colors hover:bg-muted"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex gap-3",
                    m.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {m.role === "agent" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[75%] whitespace-pre-wrap rounded-lg px-4 py-2 text-sm",
                      m.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    {m.content}
                  </div>
                  {m.role === "user" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="rounded-lg bg-muted px-4 py-2 text-sm text-muted-foreground">
                    Thinking...
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>

        {/* Quick suggestions when a conversation is active */}
        {messages.length > 0 && suggestions.length > 0 && (
          <div className="flex flex-wrap gap-2 border-t px-4 py-2">
            {suggestions.slice(0, 2).map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                disabled={loading}
                className="rounded-full border px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-muted disabled:opacity-50"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="flex gap-2 border-t p-4"
        >
          <Input
            placeholder="Ask the agent fleet..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <Button type="submit" size="icon" disabled={loading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
