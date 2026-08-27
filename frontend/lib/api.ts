const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://sentinel-backend-429151084374.us-central1.run.app";

const TOKEN_KEY = "sentinel_token";

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  if (typeof window !== "undefined") localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  if (typeof window !== "undefined") localStorage.removeItem(TOKEN_KEY);
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });

  if (!res.ok) {
    let detail = res.statusText;
    try {
      const body = await res.json();
      detail = body.detail || detail;
    } catch {
      // ignore
    }
    throw new ApiError(res.status, detail);
  }

  return res.json();
}

// ---- Data types ----
export interface Agent {
  name: string;
  label: string;
  description: string;
  status: string;
  version: string;
  model: string;
  data_sources: string[];
  capabilities: string[];
  last_active: string;
  runs_total: number;
  runs_today: number;
  memories: number;
  region: string;
}

export interface DashboardData {
  stats: { total_agents: number; active_tasks: number; memories: number; alerts: number };
  health: { name: string; label: string; health: string; last_active: string }[];
  activity: { agent: string; action: string; time: string; level: string }[];
  alerts: { id: string; agent: string; severity: string; message: string; time: string }[];
}

export interface RegistryEntry {
  name: string;
  label: string;
  version: string;
  description: string;
  owner: string;
  capabilities: string[];
  status: string;
}

export interface MemoryEntry {
  id: string;
  agent: string;
  content: string;
  created_at: string;
  session_id: string;
}

export interface Connector {
  name: string;
  description: string;
  status: string;
  used_by: string[];
  last_sync: string;
}

export interface LogEntry {
  timestamp: string;
  level: string;
  agent: string;
  message: string;
}

export interface Trace {
  id: string;
  agent: string;
  query: string;
  duration_ms: number;
  status: string;
  time: string;
  steps: { step: string; detail: string }[];
}

export interface AuditEntry {
  timestamp: string;
  agent: string;
  action: string;
  user: string;
  result: string;
}

export interface Organization {
  name: string;
  domain: string;
  region: string;
  members: { name: string; email: string; role: string }[];
}

export const api = {
  // Auth
  login: (email: string, password: string) =>
    request<AuthResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  register: (
    email: string,
    password: string,
    first_name: string,
    last_name: string
  ) =>
    request<AuthResponse>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, first_name, last_name }),
    }),

  me: () => request<User>("/api/auth/me"),

  // Dashboard & fleet
  dashboard: () => request<DashboardData>("/api/fleet/dashboard"),

  // Agents
  agents: () => request<{ agents: Agent[] }>("/api/agents/"),
  agent: (name: string) => request<Agent>(`/api/agents/${name}`),

  // Registry
  registry: () => request<{ agents: RegistryEntry[] }>("/api/registry/"),
  registryEntry: (name: string) => request<RegistryEntry>(`/api/registry/${name}`),

  // Memory
  memory: () =>
    request<{ counts: { agent: string; name: string; count: number }[]; memories: MemoryEntry[] }>(
      "/api/memory/"
    ),
  agentMemories: (name: string) =>
    request<{ agent: string; memories: MemoryEntry[] }>(`/api/memory/${name}`),
  memoryEntry: (id: string) => request<MemoryEntry>(`/api/memory/entry/${id}`),

  // Connectors
  connectors: () => request<{ connectors: Connector[] }>("/api/connectors/"),
  connector: (name: string) => request<Connector>(`/api/connectors/${encodeURIComponent(name)}`),

  // Observability
  logs: () => request<{ logs: LogEntry[] }>("/api/observability/logs"),
  traces: () => request<{ traces: Trace[] }>("/api/observability/traces"),
  trace: (id: string) => request<Trace>(`/api/observability/traces/${id}`),
  audit: () => request<{ audit: AuditEntry[] }>("/api/observability/audit"),

  // Settings
  organization: () => request<Organization>("/api/settings/organization"),
  credentials: () =>
    request<{ credentials: { name: string; configured: boolean }[] }>("/api/settings/credentials"),

  // Chat
  chatAgents: () =>
    request<{ agents: { name: string; label: string; suggestions: string[] }[] }>(
      "/api/chat/agents"
    ),
  chat: (agent: string, message: string, history: ChatTurn[]) =>
    request<ChatReply>("/api/chat/", {
      method: "POST",
      body: JSON.stringify({ agent, message, history }),
    }),
};

export interface ChatTurn {
  role: "user" | "agent";
  content: string;
}

export interface ChatReply {
  reply: string;
  agent: string;
  powered_by: string;
}
