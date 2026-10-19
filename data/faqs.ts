import type { Faq } from "./types";

export const faqs: Faq[] = [
  {
    id: "altitude-sickness",
    q: "Will I get altitude sickness?",
    category: "health",
    onHome: true,
    a: [
      "Many people feel the altitude in Cusco (about 3,400 m) and around Lake Titicaca (about 3,800 m): a headache, shortness of breath, poor sleep. It's hard to predict who will, and fitness doesn't protect you.",
      "We plan to reduce the risk: sleep lower first in the Sacred Valley, go up gradually, take it easy on the first day, drink plenty of water and go light on alcohol. Save the highest days, like Rainbow Mountain, for the end.",
      "This is general guidance, not medical advice. Talk to your doctor before you travel, especially about medication and any existing conditions.",
    ],
  },
  {
    id: "machu-picchu-tickets",
    q: "How do Machu Picchu tickets and permits work?",
    category: "machu-picchu",
    onHome: true,
    a: [
      "Tickets are named, timed and tied to a circuit (a set route through the site). Huayna Picchu and Machu Picchu Mountain need separate tickets. Daily numbers are capped, and good slots in the dry season sell out weeks or months ahead.",
      "Book the trip, then breathe: we secure your tickets as soon as you confirm. Rules change often, and we'll confirm the latest when you book.",
    ],
  },
  {
    id: "inca-trail",
    q: "How fit do I need to be for the Inca Trail, and how do I book it?",
    category: "machu-picchu",
    onHome: true,
    a: [
      "You should be comfortable walking 6–8 hours a day for several days, with long climbs and descents on stone steps, at altitudes up to about 4,215 m. If you hike regularly at home, you'll be fine; if not, start training a few months ahead.",
      "Permits are limited and only sold through licensed operators, usually months ahead for the dry season. The trail closes every February. Salkantay is a great alternative when permits are gone.",
    ],
  },
  {
    id: "best-time",
    q: "When is the best time to visit Peru?",
    category: "planning",
    onHome: true,
    a: [
      "For the Andes and Machu Picchu, the dry season (roughly May to September) brings clear days and cold nights, and the biggest crowds. April, October and November are a good balance. The wet season (roughly December to March) is green, quieter and showery.",
      "The coast is sunniest from December to April. The Amazon is wet all year, a little drier from roughly May to October. Every region has a 'best months' guide on its page (verify).",
    ],
  },
  {
    id: "entry-requirements",
    q: "What do I need to enter Peru?",
    category: "practical",
    verify: "Verify against official Peruvian government sources (Migraciones and your own government's travel advice) before you travel.",
    a: [
      "Most visitors from the US, UK, EU and Australia don't need a visa for a tourist stay, but you'll need a passport valid for the length of your trip (many airlines ask for six months). Rules can change and depend on your nationality.",
      "Always check the latest entry requirements with Peruvian government sources and your own government's travel advice before you book flights.",
    ],
  },
  {
    id: "amazon-health",
    q: "Do I need vaccinations for the Amazon?",
    category: "health",
    verify: "Verify with your doctor or a travel clinic and official health sources.",
    a: [
      "Yellow fever vaccination and malaria precautions may be recommended for some Amazon areas, depending on where you go. Recommendations differ by region and change over time.",
      "See your doctor or a travel clinic at least six to eight weeks before you travel. This is general information, not medical advice.",
    ],
  },
  {
    id: "distances",
    q: "How long does it take to get around?",
    category: "planning",
    a: [
      "Peru is bigger than it looks: more than twice the size of France. We use short internal flights for long hops (Lima to Cusco is about 1h15) and the train or road where it's scenic and sensible.",
      "Mountain roads are slow, so a 200 km drive can take five hours. We'll always tell you how long each travel day really is.",
    ],
  },
  {
    id: "safety",
    q: "Is Peru safe to travel?",
    category: "practical",
    a: [
      "Most visits are trouble-free. As in any big country, take normal precautions in cities: use registered taxis or our drivers, keep valuables out of sight and stay aware in crowded markets and stations.",
      "Your Specialist and local team are on call throughout your trip. Check your government's travel advice before you go.",
    ],
  },
  {
    id: "food-water",
    q: "Is the food safe? Can I drink the tap water?",
    category: "practical",
    a: [
      "Don't drink tap water. Use bottled or filtered water (many lodges provide refills). Restaurant food is generally excellent; ceviche is best at lunchtime in good restaurants.",
      "Go gently on rich food and alcohol in your first days at altitude.",
    ],
  },
  {
    id: "money",
    q: "What about money and cards?",
    category: "practical",
    a: [
      "The currency is the sol (PEN). Cards are widely accepted in cities, hotels and restaurants. Carry some cash for markets, villages, tips and small purchases. ATMs are easy to find in towns.",
    ],
  },
  {
    id: "tipping",
    q: "How much should I tip guides and porters?",
    category: "practical",
    a: [
      "Tipping is customary for guides, drivers, trek cooks and porters. We'll send you a simple tipping guide with suggested amounts before you travel.",
      "On treks, we work only with operators who pay porters fairly, limit their loads and give them proper equipment. Tips are on top of fair pay, never a replacement for it.",
    ],
  },
  {
    id: "children",
    onHome: true,
    q: "Is Peru good for children?",
    category: "planning",
    a: [
      "Very. Kids love the sea lions, trains, llamas and the Amazon. We keep travel days short, sleep low in the Sacred Valley and limit nights at high altitude.",
      "Talk to your doctor about altitude with young children. Children need their own Machu Picchu tickets and passports.",
    ],
  },
  {
    id: "cost",
    onHome: true,
    q: "How much does a private trip to Peru cost per day?",
    category: "booking",
    a: [
      "Our journeys generally start around the per-day figure shown in our enquiry form, per person, excluding international flights. The final price depends on the season, hotels, guides and how many internal flights you need.",
      "Your Specialist will give you a clear, itemised quote before you commit to anything.",
    ],
  },
  {
    id: "deposits",
    q: "What are your deposit and cancellation terms?",
    category: "booking",
    verify: "Placeholder: replace with the company's confirmed booking terms.",
    a: [
      "[Placeholder] A deposit secures your trip and lets us buy permits and tickets, which are often non-refundable. The balance is due a set number of weeks before travel.",
      "[Placeholder] Full deposit and cancellation terms will be set out in our booking conditions. We strongly recommend comprehensive travel insurance.",
    ],
  },
];
