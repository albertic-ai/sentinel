"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bot, Send, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { api, type ChatTurn } from "@/lib/api";

export default function ChatPage() {
  const [agents, setAgents] = useState<{ name: string; label: string }[]>([]);
  const [agent, setAgent] = useState("sentinel_orchestrator");
  const [messages, setMessages] = useState<ChatTurn[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    api.chatAgents().then((r) => setAgents(r.agents)).catch(() => setAgents([]));
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const userTurn: ChatTurn = { role: "user", content: text };
    const nextMessages = [...messages, userTurn];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await api.chat(agent, text, messages);
      setMessages([...nextMessages, { role: "agent", content: res.reply }]);
    } catch {
      setMessages([
        ...nextMessages,
        { role: "agent", content: "Sorry, something went wrong. Please try again." },
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

      <div className="flex flex-1 flex-col overflow-hidden rounded-lg border">
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
              <Bot className="mb-3 h-10 w-10" />
              <p className="text-sm">Start a conversation with the agent fleet.</p>
              <p className="mt-1 text-xs">
                Try: &quot;Check wildfire risk near Sierra Nevada&quot;
              </p>
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
                      "max-w-[75%] rounded-lg px-4 py-2 text-sm",
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

        <form onSubmit={send} className="flex gap-2 border-t p-4">
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
