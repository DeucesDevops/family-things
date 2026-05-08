import { colors } from "@/constants/theme";

export const familyMembers = [
  { name: "Ama", role: "Mum", color: "#F36F56", initials: "A" },
  { name: "Kwame", role: "Dad", color: "#4C7D99", initials: "K" },
  { name: "Nia", role: "Teen", color: "#7C9A7E", initials: "N" },
  { name: "Kofi", role: "Little one", color: "#DFA43B", initials: "K" }
];

export const agenda = [
  {
    time: "08:20",
    title: "School drop-off",
    detail: "Kwame driving, packed lunch checked",
    tone: colors.sky
  },
  {
    time: "16:30",
    title: "Haircut reminder",
    detail: "Kofi is due this week",
    tone: colors.peach
  },
  {
    time: "18:45",
    title: "Dinner at Nana's",
    detail: "Bring plantain and the birthday card",
    tone: colors.sage
  }
];

export const calendarDays = [
  { day: "Mon", date: "22", active: false, dots: [colors.sky] },
  { day: "Tue", date: "23", active: false, dots: [colors.peach, colors.sage] },
  { day: "Wed", date: "24", active: true, dots: [colors.gold] },
  { day: "Thu", date: "25", active: false, dots: [colors.plum] },
  { day: "Fri", date: "26", active: false, dots: [colors.peach] },
  { day: "Sat", date: "27", active: false, dots: [colors.sage, colors.sky] },
  { day: "Sun", date: "28", active: false, dots: [] }
];

export const suggestions = [
  {
    title: "Greenwich picnic trail",
    tag: "Outing",
    meta: "Low cost · 42 min · Clear weather",
    votes: 3,
    tone: colors.sage,
    image: "park"
  },
  {
    title: "Family movie night",
    tag: "Tonight",
    meta: "At home · Snacks needed · Kofi pick",
    votes: 4,
    tone: colors.plum,
    image: "movie"
  },
  {
    title: "Sunday roast booking",
    tag: "Meal",
    meta: "Nana-friendly · 12:30 slot open",
    votes: 2,
    tone: colors.gold,
    image: "meal"
  }
];

export const reminders = [
  { title: "Send best wishes to Auntie Jo", due: "Tomorrow", type: "Birthday", tone: colors.peach },
  { title: "Renew swimming bag kit", due: "Friday", type: "Errand", tone: colors.sky },
  { title: "Book dentist checkups", due: "Next week", type: "Health", tone: colors.sage }
];

export const wishes = [
  "Wishing you a bright birthday full of calm, laughter, and the people who make you feel most at home.",
  "Hope today gives you space to rest, celebrate, and feel properly loved.",
  "Happy birthday from all of us. We are grateful for your warmth, your stories, and every table you make better."
];
