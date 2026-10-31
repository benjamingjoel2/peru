import { site } from "@/config/site";
import { L } from "@/lib/i18n";

export type LegalPage = { title: string; description: string; updated: string; intro: string; sections: { h: string; p: string[] }[] };

const brand = site.name;
const email = site.contact.email;
const address = site.address.full;

export const legalPages: Record<string, LegalPage> = L({
  privacy: {
    title: "Privacy policy",
    description: "How Discover Peru Travel collects, uses and protects your personal data.",
    updated: "30 October 2026",
    intro: "This policy explains what personal data we collect when you use this website or plan a journey with us, why we collect it and the choices you have.",
    sections: [
      { h: "Who we are", p: [`${brand} plans private, tailor-made journeys in Peru. We are the controller of the personal data described in this policy. You can write to us at ${address}, or email ${email}.`] },
      {
        h: "What we collect",
        p: [
          "The details you give us when you send an enquiry, download an itinerary or sign up for our newsletter: your name, email address, phone number if you choose to give it, country, travel dates, the number and ages of travellers, your interests and anything you write in your message.",
          "When you book, we also collect what we need to arrange your journey: passport details, dates of birth, dietary and mobility needs, insurance details and emergency contacts. Health information is only collected when you choose to share it so we can plan safely around it.",
          "We do not use advertising or tracking cookies. Our hosting provider keeps standard server logs (such as IP address, browser type and the pages requested) for security and to keep the site running.",
        ],
      },
      {
        h: "How we use it",
        p: [
          "To answer your enquiry and prepare proposals and quotes (to take steps at your request before a contract).",
          "To arrange and run your journey, including booking hotels, transport, permits and tickets (to perform our contract with you).",
          "To send our newsletter if you have asked for it (your consent, which you can withdraw at any time with the unsubscribe link or by emailing us).",
          "To keep records required by law and to protect our legal rights (legal obligation and legitimate interests).",
        ],
      },
      {
        h: "Who we share it with",
        p: [
          "Only the suppliers needed to deliver your journey (hotels, lodges, transport companies, guides, and the authorities that issue Machu Picchu tickets and Inca Trail permits), and the service providers that help us run our business, such as email, hosting and customer-management tools. Each receives only what it needs.",
          "Some of these suppliers are in Peru or other countries outside your own. Where the law requires it, we use appropriate safeguards for these transfers. We never sell your personal data.",
        ],
      },
      { h: "How long we keep it", p: ["Enquiries that do not lead to a booking are kept for up to two years and then deleted. Booking records are kept for as long as tax and accounting law requires. Newsletter details are kept until you unsubscribe."] },
      {
        h: "Your rights",
        p: [
          `Depending on where you live, you can ask to access, correct, delete or receive a copy of your data, object to or restrict how we use it, and withdraw consent at any time. Email ${email} and we will reply within one month.`,
          "If you are unhappy with how we have handled your data, please tell us first. You also have the right to complain to the data protection authority in your country.",
        ],
      },
      { h: "Security", p: ["We use reputable providers, encrypted connections and limited access to keep your data safe. No system is perfectly secure, but we take care to protect what you share with us."] },
      { h: "Changes to this policy", p: ["We may update this policy from time to time. The date at the top shows when it last changed."] },
    ],
  },
  "booking-terms": {
    title: "Booking terms",
    description: "The terms that apply when you plan and book a tailor-made journey with Discover Peru Travel.",
    updated: "30 October 2026",
    intro: `These terms apply to every journey arranged by ${brand}. Please read them before you confirm a booking, as they form the contract between you and us.`,
    sections: [
      { h: "Enquiries and proposals", p: ["Sending an enquiry is free and commits you to nothing. We will reply with ideas and, when you are ready, a written proposal showing the itinerary, what is included and the price. Proposals are based on availability at the time and are not reserved until you book."] },
      { h: "Quotes and prices", p: ["Prices on this website are guide prices that show what a journey usually costs from, per person. Your quote is the price that applies. It may change before you book if supplier prices, taxes or exchange rates change, and we will always tell you before you confirm."] },
      { h: "Booking and deposit", p: ["Your booking is confirmed when you accept our written quote and we receive the deposit stated in it. We then send a booking confirmation. Many Machu Picchu tickets, Inca Trail permits and train seats are named, limited and non-refundable once bought, so we buy them only after your deposit arrives."] },
      { h: "Paying the balance", p: ["The balance is due by the date shown in your quote and confirmation. If it is not paid on time, we may treat the booking as cancelled by you, and the cancellation terms below apply."] },
      { h: "Changes by you", p: ["Tell us in writing if you would like to change your journey. We will do our best to help. Changes depend on availability and may involve supplier charges and an administration cost, which we will confirm before making them. Names on permits and tickets often cannot be changed."] },
      { h: "Cancellation by you", p: ["You can cancel at any time by writing to us. Cancellation charges increase as your departure date gets closer and reflect the costs we and our suppliers cannot recover. The charges that apply to your journey are set out in your quote and confirmation. Non-refundable items, such as permits and tickets already bought, cannot be refunded."] },
      { h: "Changes and cancellation by us", p: ["We rarely need to change a confirmed journey, but sometimes must. If we make a significant change or cancel for reasons other than your failure to pay, we will tell you as soon as possible and offer a comparable alternative or a refund of the money you have paid us for the affected services. We are not responsible for changes caused by events beyond our control, such as extreme weather, natural disasters, strikes, closures of sites or trails, or government action."] },
      { h: "Travel insurance", p: ["Comprehensive travel insurance is a condition of booking. It should cover cancellation, medical treatment, emergency evacuation (including from high altitude and remote areas) and repatriation, and any activities you plan, such as trekking. Please send us your policy details before you travel."] },
      { h: "Passports, visas and health", p: ["You are responsible for having a valid passport, any visas and entry documents, and for meeting health and vaccination requirements. We give general guidance in good faith, but rules change: check them with the relevant embassy and your doctor before you travel. Some of our journeys go to high altitude; please read our altitude guidance and speak to your doctor if you have any medical condition."] },
      { h: "Your responsibilities while travelling", p: ["Please follow the reasonable instructions of guides and suppliers, respect local laws and customs, and look after your belongings. We may end the journey of anyone whose behaviour puts others at risk, without a refund."] },
      { h: "Our responsibility", p: ["We plan your journey with care and choose suppliers we trust. We accept responsibility for the services we agree to provide, as far as the law allows. We are not liable for losses that were not foreseeable, for anything caused by you or by third parties unconnected with your journey, or for events beyond our control. Nothing in these terms limits liability that cannot be limited by law."] },
      { h: "Complaints", p: [`If something is not right during your journey, tell your guide or contact us straight away so we can try to fix it there and then. If it is not resolved, write to us at ${email} within 28 days of your return and we will respond promptly.`] },
      { h: "Governing law", p: ["These terms are governed by the law that applies to the contract between you and us. Nothing in them affects your statutory rights as a consumer in your country of residence."] },
      { h: "Contact", p: [`${brand}, ${address}. Email ${email}.`] },
    ],
  },
  cookies: {
    title: "Cookie policy",
    description: "The cookies and browser storage the Discover Peru Travel website uses, and how to control them.",
    updated: "30 October 2026",
    intro: "This website keeps things simple. We do not use advertising cookies, tracking pixels or analytics cookies.",
    sections: [
      {
        h: "What we store",
        p: [
          "Currency preference: when you choose a currency in the top bar, we save your choice in your browser's local storage (key \"dpt-currency\") so prices show in that currency on your next visit. It stays until you clear it and is never sent to us.",
          "Language: the language you read the site in is part of the page address (for example /fr/ or /de/). We do not set a cookie for it.",
          "Forms: when you send an enquiry, download an itinerary or sign up for the newsletter, the details are sent to us once. We do not set a cookie to do this.",
        ],
      },
      { h: "Consent", p: ["The currency setting is strictly necessary to give you the display you asked for, so it does not need consent. If we ever add analytics or any non-essential cookies, we will ask for your consent first and update this policy."] },
      { h: "How to remove it", p: ["You can clear local storage and cookies for this site at any time in your browser settings (usually under privacy or site data). The site will then show prices in US dollars again."] },
      { h: "Questions", p: [`Email ${email} with any questions about this policy.`] },
    ],
  },
});
