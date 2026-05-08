import Constants from "expo-constants";
import { createContext, useContext, useState, type ReactNode } from "react";
import { Platform } from "react-native";
import { agenda as fallbackAgenda, familyMembers as fallbackFamilyMembers, reminders as fallbackReminders, suggestions as fallbackSuggestions, wishes as fallbackWishes } from "@/data/family";
import { colors } from "@/constants/theme";

type ApiEnvelope<T> = {
  success: boolean;
  data: T;
};

type AuthResponse = {
  userId: string;
  name: string;
  email: string;
  token: string;
};

type FamilyResponse = {
  id: string;
  name: string;
  inviteCode: string;
  members: Array<{
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "MEMBER" | "HELPER";
  }>;
};

type EventResponse = {
  id: string;
  type: string;
  title: string;
  notes: string | null;
  startsAt: string;
  endsAt: string | null;
  createdBy: string;
  createdAt: string;
};

type ReminderResponse = {
  id: string;
  type: string;
  title: string;
  dueAt: string;
  completed: boolean;
  createdAt: string;
};

type SuggestionResponse = {
  id: string;
  title: string;
  category: string;
  meta: string;
  rationale: string | null;
  status: string;
  votes: number;
  createdAt: string;
};

type WishResponse = {
  id: string;
  recipientName: string;
  occasion: string | null;
  message: string;
  createdAt: string;
};

type FamilyMember = {
  id: string;
  name: string;
  role: string;
  color: string;
  initials: string;
  email?: string;
};

type AgendaItem = {
  id: string;
  type: string;
  title: string;
  detail: string;
  tone: string;
  time: string;
  startsAt: string;
  createdBy: string;
};

type CalendarDay = {
  day: string;
  date: string;
  active: boolean;
  dots: string[];
};

type SuggestionItem = {
  id: string;
  title: string;
  tag: string;
  meta: string;
  votes: number;
  tone: string;
  image: "park" | "movie" | "meal";
  rationale: string;
};

type ReminderItem = {
  id: string;
  title: string;
  due: string;
  type: string;
  tone: string;
  completed: boolean;
};

type WishItem = {
  id: string;
  recipientName?: string;
  occasion?: string | null;
  message: string;
};

type UserSummary = {
  id: string;
  name: string;
  email: string;
};

type FamilyDataState = {
  familyName: string;
  inviteCode: string;
  currentUser: UserSummary | null;
  familyMembers: FamilyMember[];
  agenda: AgendaItem[];
  reminders: ReminderItem[];
  suggestions: SuggestionItem[];
  wishes: WishItem[];
  calendarDays: CalendarDay[];
  featuredSuggestion: SuggestionItem | null;
};

type FamilyDataContextValue = FamilyDataState & {
  error: string | null;
  isLoading: boolean;
  isSignedIn: boolean;
  source: "fallback" | "api";
  signIn: (email: string, password: string) => Promise<boolean>;
  signInDemo: () => Promise<boolean>;
  refresh: () => Promise<void>;
};

const toneCycle = [colors.peach, colors.sky, colors.sage, colors.gold];
const DEMO_EMAIL = "demo@familythings.local";
const DEMO_PASSWORD = "password123";

const fallbackState: FamilyDataState = {
  familyName: "Boateng home",
  inviteCode: "FT-DEMO",
  currentUser: null,
  familyMembers: fallbackFamilyMembers.map((member, index) => ({
    id: `fallback-member-${index}`,
    ...member,
  })),
  agenda: fallbackAgenda.map((item, index) => ({
    id: `fallback-event-${index}`,
    type: "EVENT",
    detail: item.detail,
    time: item.time,
    startsAt: new Date().toISOString(),
    createdBy: "Family Things",
    tone: item.tone,
    title: item.title,
  })),
  reminders: fallbackReminders.map((item, index) => ({
    id: `fallback-reminder-${index}`,
    ...item,
    completed: false,
  })),
  suggestions: fallbackSuggestions.map((item, index) => ({
    id: `fallback-suggestion-${index}`,
    title: item.title,
    tag: item.tag,
    meta: item.meta,
    votes: item.votes,
    tone: item.tone,
    image: item.image as "park" | "movie" | "meal",
    rationale: "This suggestion is coming from the local fallback dataset while the API is unavailable.",
  })),
  wishes: fallbackWishes.map((message, index) => ({
    id: `fallback-wish-${index}`,
    message,
  })),
  calendarDays: buildCalendarDays([]),
  featuredSuggestion: fallbackSuggestions[0]
    ? {
        id: "fallback-featured",
        title: fallbackSuggestions[0].title,
        tag: fallbackSuggestions[0].tag,
        meta: fallbackSuggestions[0].meta,
        votes: fallbackSuggestions[0].votes,
        tone: fallbackSuggestions[0].tone,
        image: fallbackSuggestions[0].image as "park" | "movie" | "meal",
        rationale: "Fallback suggestion",
      }
    : null,
};

const FamilyDataContext = createContext<FamilyDataContextValue | null>(null);

function inferApiBaseUrl() {
  const explicit = process.env.EXPO_PUBLIC_API_URL?.trim();
  if (explicit) {
    return explicit.replace(/\/$/, "");
  }

  const hostUri = (Constants as { expoConfig?: { hostUri?: string } }).expoConfig?.hostUri;
  const host = hostUri?.split(":")[0];

  if (host && host !== "localhost" && host !== "127.0.0.1" && Platform.OS !== "web") {
    return `http://${host}:8080/api`;
  }

  if (Platform.OS === "android") {
    return "http://10.0.2.2:8080/api";
  }

  return "http://localhost:8080/api";
}

const API_BASE_URL = inferApiBaseUrl();

async function apiRequest<T>(path: string, init?: RequestInit, token?: string) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
  });

  let payload: ApiEnvelope<T> | { message?: string } | null = null;

  try {
    payload = (await response.json()) as ApiEnvelope<T> | { message?: string };
  } catch {
    payload = null;
  }

  if (!response.ok) {
    throw new Error((payload && "message" in payload && payload.message) || "Request failed");
  }

  if (!payload || !("data" in payload)) {
    throw new Error("The API returned an unexpected response.");
  }

  return payload.data;
}

function initialsFor(name: string) {
  return name.split(" ")[0]?.[0]?.toUpperCase() ?? "?";
}

function shortName(name: string) {
  return name.replace(" Boateng", "");
}

function displayRole(name: string, role: FamilyResponse["members"][number]["role"]) {
  if (name.startsWith("Ama")) {
    return "Mum";
  }

  if (name.startsWith("Kwame")) {
    return "Dad";
  }

  if (name.startsWith("Nia")) {
    return "Teen";
  }

  if (name.startsWith("Kofi")) {
    return "Little one";
  }

  if (role === "ADMIN") {
    return "Admin";
  }

  if (role === "HELPER") {
    return "Helper";
  }

  return "Family member";
}

function eventTone(type: string) {
  switch (type) {
    case "MEAL":
      return colors.gold;
    case "HOLIDAY":
      return colors.sky;
    case "REMINDER":
      return colors.peach;
    default:
      return colors.sage;
  }
}

function reminderTone(type: string) {
  switch (type) {
    case "BIRTHDAY":
      return colors.peach;
    case "ERRAND":
      return colors.sky;
    case "HEALTH":
      return colors.sage;
    default:
      return colors.plum;
  }
}

function suggestionPresentation(category: string) {
  if (category === "Meal") {
    return { tone: colors.gold, image: "meal" as const };
  }

  if (category === "Tonight" || category === "Wish") {
    return { tone: colors.plum, image: "movie" as const };
  }

  return { tone: colors.sage, image: "park" as const };
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function relativeDueLabel(value: string) {
  const dueDate = new Date(value);
  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const startOfDueDate = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
  const diffDays = Math.round((startOfDueDate.getTime() - startOfToday.getTime()) / (24 * 60 * 60 * 1000));

  if (diffDays <= 0) {
    return "Today";
  }

  if (diffDays === 1) {
    return "Tomorrow";
  }

  if (diffDays < 7) {
    return new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
    }).format(dueDate);
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
  }).format(dueDate);
}

function buildCalendarDays(events: EventResponse[], reminders: ReminderResponse[] = []) {
  const today = new Date();
  const activeDateKey = events[0] ? new Date(events[0].startsAt).toDateString() : today.toDateString();

  return Array.from({ length: 7 }, (_, offset) => {
    const current = new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset);
    const currentKey = current.toDateString();
    const dots = [
      ...events
        .filter((event) => new Date(event.startsAt).toDateString() === currentKey)
        .slice(0, 2)
        .map((event) => eventTone(event.type)),
      ...reminders
        .filter((reminder) => new Date(reminder.dueAt).toDateString() === currentKey)
        .slice(0, 1)
        .map((reminder) => reminderTone(reminder.type)),
    ];

    return {
      day: new Intl.DateTimeFormat("en-GB", { weekday: "short" }).format(current),
      date: new Intl.DateTimeFormat("en-GB", { day: "2-digit" }).format(current),
      active: currentKey === activeDateKey,
      dots,
    };
  });
}

function buildFamilyState(
  auth: AuthResponse | null,
  family: FamilyResponse,
  events: EventResponse[],
  reminders: ReminderResponse[],
  suggestions: SuggestionResponse[],
  wishes: WishResponse[],
): FamilyDataState {
  const memberOrder = ["Ama", "Kwame", "Nia", "Kofi"];
  const mappedMembers = [...family.members]
    .sort((left, right) => memberOrder.indexOf(shortName(left.name)) - memberOrder.indexOf(shortName(right.name)))
    .map((member, index) => ({
      id: member.id,
      name: shortName(member.name),
      role: displayRole(member.name, member.role),
      color: toneCycle[index % toneCycle.length],
      initials: initialsFor(member.name),
      email: member.email,
    }));

  const mappedAgenda = [...events]
    .sort((left, right) => new Date(left.startsAt).getTime() - new Date(right.startsAt).getTime())
    .map((event) => ({
      id: event.id,
      type: event.type,
      title: event.title,
      detail: event.notes ?? `Added by ${event.createdBy}`,
      tone: eventTone(event.type),
      time: formatTime(event.startsAt),
      startsAt: event.startsAt,
      createdBy: event.createdBy,
    }));

  const mappedReminders = [...reminders]
    .sort((left, right) => new Date(left.dueAt).getTime() - new Date(right.dueAt).getTime())
    .map((reminder) => ({
      id: reminder.id,
      title: reminder.title,
      due: relativeDueLabel(reminder.dueAt),
      type: reminder.type[0] + reminder.type.slice(1).toLowerCase(),
      tone: reminderTone(reminder.type),
      completed: reminder.completed,
    }));

  const mappedSuggestions = suggestions.map((suggestion) => {
    const presentation = suggestionPresentation(suggestion.category);

    return {
      id: suggestion.id,
      title: suggestion.title,
      tag: suggestion.category,
      meta: suggestion.meta,
      votes: suggestion.votes,
      tone: presentation.tone,
      image: presentation.image,
      rationale:
        suggestion.rationale ??
        "This suggestion was generated from the family's shared preferences and recent planning rhythm.",
    };
  });

  const mappedWishes = wishes.map((wish) => ({
    id: wish.id,
    recipientName: wish.recipientName,
    occasion: wish.occasion,
    message: wish.message,
  }));

  return {
    familyName: family.name,
    inviteCode: family.inviteCode,
    currentUser: auth
      ? {
          id: auth.userId,
          name: auth.name,
          email: auth.email,
        }
      : null,
    familyMembers: mappedMembers,
    agenda: mappedAgenda,
    reminders: mappedReminders,
    suggestions: mappedSuggestions,
    wishes: mappedWishes.length > 0 ? mappedWishes : fallbackState.wishes,
    calendarDays: buildCalendarDays(events, reminders),
    featuredSuggestion: mappedSuggestions[0] ?? null,
  };
}

export function FamilyDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<FamilyDataState>(fallbackState);
  const [auth, setAuth] = useState<AuthResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<"fallback" | "api">("fallback");

  async function loadFamilyData(nextAuth: AuthResponse) {
    const [family, events, reminders, suggestions, wishes] = await Promise.all([
      apiRequest<FamilyResponse>("/families/me", undefined, nextAuth.token),
      apiRequest<EventResponse[]>("/events", undefined, nextAuth.token),
      apiRequest<ReminderResponse[]>("/reminders", undefined, nextAuth.token),
      apiRequest<SuggestionResponse[]>("/suggestions", undefined, nextAuth.token),
      apiRequest<WishResponse[]>("/wishes", undefined, nextAuth.token),
    ]);

    setData(buildFamilyState(nextAuth, family, events, reminders, suggestions, wishes));
    setSource("api");
  }

  async function signIn(email: string, password: string) {
    setIsLoading(true);
    setError(null);

    try {
      const nextAuth = await apiRequest<AuthResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      await loadFamilyData(nextAuth);
      setAuth(nextAuth);
      return true;
    } catch (nextError) {
      setAuth(null);
      setData(fallbackState);
      setSource("fallback");
      setError(nextError instanceof Error ? nextError.message : "Unable to sign in right now.");
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  async function refresh() {
    if (!auth) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await loadFamilyData(auth);
    } catch (nextError) {
      setSource("fallback");
      setData(fallbackState);
      setError(nextError instanceof Error ? nextError.message : "Unable to refresh data right now.");
    } finally {
      setIsLoading(false);
    }
  }

  const value: FamilyDataContextValue = {
    ...data,
    error,
    isLoading,
    isSignedIn: auth !== null,
    source,
    signIn,
    signInDemo: () => signIn(DEMO_EMAIL, DEMO_PASSWORD),
    refresh,
  };

  return <FamilyDataContext.Provider value={value}>{children}</FamilyDataContext.Provider>;
}

export function useFamilyData() {
  const context = useContext(FamilyDataContext);

  if (!context) {
    throw new Error("useFamilyData must be used inside FamilyDataProvider.");
  }

  return context;
}
