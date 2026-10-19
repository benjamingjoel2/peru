import type { Food, FoodBand } from "./types";

export const foodBands: { id: FoodBand; name: string; range: string; altitude: [number, number]; intro: string }[] = [
  {
    id: "pacific",
    name: "The Pacific",
    range: "Sea level",
    altitude: [0, 0],
    intro: "The cold Humboldt Current makes Peru's sea one of the richest on Earth. That's why ceviche here tastes like nowhere else.",
  },
  {
    id: "coast",
    name: "The desert coast",
    range: "0–600 m",
    altitude: [0, 600],
    intro: "Lima's kitchens mix Spanish, African, Chinese and Japanese cooking with Andean ingredients. The valleys south of Lima grow the grapes for pisco.",
  },
  {
    id: "andes-valley",
    name: "Andean valleys",
    range: "2,300–3,400 m",
    altitude: [2300, 3400],
    intro: "Giant-kernel corn, salt from Maras, slow-cooked earth ovens and Arequipa's spicy picanterías.",
  },
  {
    id: "high-andes",
    name: "The high Andes & altiplano",
    range: "3,400–4,500 m",
    altitude: [3400, 4500],
    intro: "Peru grows thousands of potato varieties, plus quinoa and other grains that thrive where little else does. Freeze-dried chuño keeps for years.",
  },
  {
    id: "cloud-forest",
    name: "Cloud forest",
    range: "1,000–2,500 m",
    altitude: [1000, 2500],
    intro: "On the eastern slopes, mist and warmth grow some of the world's best coffee and fine-flavour cacao.",
  },
  {
    id: "amazon",
    name: "The Amazon",
    range: "100–500 m",
    altitude: [100, 500],
    intro: "River fish cooked in leaves, plantains, and fruits you've never heard of, many of them sour enough to make you blink.",
  },
];

export const foods: Food[] = [
  // Pacific
  { id: "ceviche", name: "Ceviche", kind: "dish", band: "pacific", description: "Raw white fish 'cooked' in lime juice with red onion, chilli and salt, served with sweet potato and corn. Lunch food: Peruvians rarely eat it at night.", where: ["lima", "paracas", "trujillo", "mancora"], journeys: ["first-peru-done-right", "peru-for-food-lovers", "andes-and-amazon"] },
  { id: "tiradito", name: "Tiradito", kind: "dish", band: "pacific", description: "Ceviche's Japanese-influenced cousin: thin slices of fish, no onion, a smooth chilli sauce poured over the top.", where: ["lima", "mancora"], journeys: ["peru-for-food-lovers"] },
  { id: "leche-de-tigre", name: "Leche de tigre", kind: "dish", band: "pacific", description: "The citrusy, spicy marinade left over from ceviche, served in a glass. Said to cure hangovers.", where: ["lima", "paracas", "mancora"], journeys: ["peru-for-food-lovers"] },
  { id: "conchas-negras", name: "Conchas negras", kind: "ingredient", band: "pacific", description: "Black clams from the mangroves of the far north, eaten raw in an inky, punchy ceviche.", where: ["mancora", "trujillo"], journeys: ["the-wild-north"] },

  // Coast
  { id: "causa", name: "Causa limeña", kind: "dish", band: "coast", description: "Layers of yellow potato mashed with lime and ají amarillo, filled with chicken, tuna or crab. Cold, bright and very Lima.", where: ["lima", "trujillo"], journeys: ["first-peru-done-right", "peru-for-food-lovers", "peru-with-kids"] },
  { id: "lomo-saltado", name: "Lomo saltado", kind: "dish", band: "coast", description: "Beef, tomato and onion stir-fried in a wok with soy sauce, served with chips and rice. Chinese-Peruvian cooking at its most loved.", where: ["lima"], journeys: ["first-peru-done-right", "peru-with-kids"] },
  { id: "aji-de-gallina", name: "Ají de gallina", kind: "dish", band: "coast", description: "Shredded chicken in a creamy yellow-chilli and walnut sauce. Comfort food, mild enough for most children.", where: ["lima"], journeys: ["peru-with-kids", "peru-for-food-lovers"] },
  { id: "anticuchos", name: "Anticuchos", kind: "dish", band: "coast", description: "Skewers of marinated beef heart grilled over charcoal, with an Afro-Peruvian history going back centuries. Street food at dusk.", where: ["lima"], journeys: ["peru-for-food-lovers"] },
  { id: "pisco", name: "Pisco", kind: "drink", band: "coast", description: "Grape brandy from the valleys south of Lima. Drink it in a pisco sour, or neat to taste the grape.", where: ["lima", "paracas", "huacachina"], journeys: ["peru-for-food-lovers", "first-peru-done-right"] },
  { id: "picarones", name: "Picarones", kind: "dish", band: "coast", description: "Squash and sweet-potato doughnuts fried to order and drizzled with fig-leaf syrup.", where: ["lima", "huacachina"], journeys: ["peru-with-kids", "peru-for-food-lovers"] },
  { id: "lima-restaurants", name: "Lima's restaurant scene", kind: "experience", band: "coast", description: "From tasting menus that map Peru by altitude to cevicherías that close at 5pm, Lima is the place to book a table months ahead.", where: ["lima"], journeys: ["peru-for-food-lovers", "first-peru-done-right"], experience: "lima-food-scene" },
  { id: "pisco-tasting", name: "Pisco tasting", kind: "experience", band: "coast", description: "Visit a bodega near Ica or a Lima bar to taste pisco from different grapes, side by side.", where: ["paracas", "huacachina", "lima"], journeys: ["peru-for-food-lovers"] },

  // Andean valleys
  { id: "choclo", name: "Choclo con queso", kind: "dish", band: "andes-valley", description: "Giant-kernel white corn from the Sacred Valley, eaten on the cob with a slab of fresh cheese.", where: ["sacred-valley", "machu-picchu"], journeys: ["first-peru-done-right", "peru-with-kids"] },
  { id: "maras-salt", name: "Maras salt", kind: "ingredient", band: "andes-valley", description: "Pink-tinged salt from thousands of terraced pans fed by a salty spring, harvested by local families.", where: ["sacred-valley"], journeys: ["first-peru-done-right", "peru-for-food-lovers"] },
  { id: "pachamanca", name: "Pachamanca", kind: "dish", band: "andes-valley", description: "Meat, potatoes, beans and herbs cooked under hot stones in an earth oven. A feast for a group.", where: ["sacred-valley", "huaraz"], journeys: ["peru-for-food-lovers", "the-wild-north"] },
  { id: "chicha-morada", name: "Chicha morada", kind: "drink", band: "andes-valley", description: "A sweet, spiced drink made from purple corn, pineapple and cinnamon. Non-alcoholic and very popular with kids.", where: ["cusco", "sacred-valley", "machu-picchu"], journeys: ["peru-with-kids"] },
  { id: "rocoto-relleno", name: "Rocoto relleno", kind: "dish", band: "andes-valley", description: "Arequipa's stuffed red chilli: spiced beef and raisins inside a rocoto, baked under cheese. Hotter than it looks.", where: ["arequipa-colca"], journeys: ["peru-for-food-lovers", "titicaca-and-the-high-plains"] },
  { id: "chupe-de-camarones", name: "Chupe de camarones", kind: "dish", band: "andes-valley", description: "A rich soup of river prawns, milk, potatoes and egg. An Arequipa picantería classic, best on a Friday.", where: ["arequipa-colca"], journeys: ["titicaca-and-the-high-plains", "peru-for-food-lovers"] },
  { id: "cooking-class", name: "Cooking class", kind: "experience", band: "andes-valley", description: "Cook with Andean ingredients in a farm kitchen or a Cusco home, then eat the results.", where: ["sacred-valley", "cusco"], journeys: ["peru-for-food-lovers", "peru-with-kids"] },

  // High Andes
  { id: "native-potatoes", name: "Native potatoes", kind: "ingredient", band: "high-andes", description: "Peru grows thousands of potato varieties: purple, yellow, knobbly, striped. Ask for papas nativas and see how many you can tell apart.", where: ["cusco", "sacred-valley", "lake-titicaca", "huaraz", "arequipa-colca"], journeys: ["first-peru-done-right", "peru-for-food-lovers", "titicaca-and-the-high-plains"] },
  { id: "chuno", name: "Chuño", kind: "ingredient", band: "high-andes", description: "Potatoes freeze-dried by frost and sun on the altiplano, a technique far older than the Incas. Keeps for years.", where: ["lake-titicaca"], journeys: ["titicaca-and-the-high-plains"] },
  { id: "quinoa", name: "Quinoa", kind: "ingredient", band: "high-andes", description: "Grown around Lake Titicaca for thousands of years. Try it in a soup, or puffed as a breakfast cereal.", where: ["lake-titicaca", "inca-trail-salkantay"], journeys: ["titicaca-and-the-high-plains", "the-classic-inca-trail"] },
  { id: "trout", name: "Lake trout", kind: "dish", band: "high-andes", description: "Trout from Titicaca and the mountain lakes, fried whole or cooked as a ceviche.", where: ["lake-titicaca", "huaraz"], journeys: ["titicaca-and-the-high-plains"] },
  { id: "alpaca", name: "Alpaca", kind: "dish", band: "high-andes", description: "Lean and mild, often grilled as a steak. On the altiplano, alpaca herds are a family's savings.", where: ["cusco", "arequipa-colca"], journeys: ["titicaca-and-the-high-plains"] },
  { id: "cuy", name: "Cuy", kind: "dish", band: "high-andes", description: "Guinea pig, roasted or fried. A festive dish in Andean homes, and the star of a famous Cusco cathedral painting of the Last Supper.", where: ["cusco"], journeys: ["peru-for-food-lovers"] },
  { id: "coca-tea", name: "Mate de coca", kind: "drink", band: "high-andes", description: "Coca-leaf tea, offered on arrival at many Andean hotels. A traditional mild remedy for the altitude, though not a substitute for acclimatising.", where: ["cusco", "lake-titicaca", "inca-trail-salkantay", "rainbow-mountain", "huaraz"], journeys: ["the-classic-inca-trail", "salkantay-to-machu-picchu"] },
  { id: "market-tour", name: "Market tour", kind: "experience", band: "high-andes", description: "San Pedro market in Cusco: fruit juice stalls, cheese, bread from Oropesa, and more potatoes than you thought possible.", where: ["cusco"], journeys: ["peru-for-food-lovers", "first-peru-done-right"], experience: "markets" },

  // Cloud forest
  { id: "coffee", name: "Coffee", kind: "drink", band: "cloud-forest", description: "Grown on the misty eastern slopes. Salkantay trekkers pass coffee farms on the way down to Machu Picchu.", where: ["machu-picchu", "inca-trail-salkantay", "chachapoyas-kuelap", "manu"], journeys: ["salkantay-to-machu-picchu", "the-wild-north"] },
  { id: "cacao", name: "Cacao", kind: "ingredient", band: "cloud-forest", description: "Peru grows fine-flavour cacao, much of it from native varieties. The beans taste fruity long before they become chocolate.", where: ["tambopata", "manu", "chachapoyas-kuelap"], journeys: ["andes-and-amazon", "peru-for-food-lovers"] },
  { id: "chocolate-workshop", name: "Chocolate workshop", kind: "experience", band: "cloud-forest", description: "Roast, crack, grind and temper your own bar from bean to chocolate. Good for a rainy afternoon in Cusco.", where: ["cusco"], journeys: ["peru-for-food-lovers", "peru-with-kids"] },

  // Amazon
  { id: "juane", name: "Juane", kind: "dish", band: "amazon", description: "Rice, chicken, olives and egg wrapped in a bijao leaf and boiled. Traditionally eaten for the San Juan festival in June.", where: ["tambopata", "iquitos", "manu", "chachapoyas-kuelap"], journeys: ["andes-and-amazon", "peru-with-kids"] },
  { id: "paiche", name: "Paiche", kind: "dish", band: "amazon", description: "One of the world's largest freshwater fish, now farmed sustainably. Firm and mild, often grilled in leaves.", where: ["iquitos", "tambopata"], journeys: ["andes-and-amazon"] },
  { id: "camu-camu", name: "Camu camu", kind: "ingredient", band: "amazon", description: "A small, very sour river fruit packed with vitamin C, usually drunk as juice.", where: ["iquitos", "tambopata", "manu"], journeys: ["andes-and-amazon"] },
  { id: "tacacho", name: "Tacacho con cecina", kind: "dish", band: "amazon", description: "Mashed green plantain with pork fat, served with smoked dried pork. The jungle breakfast.", where: ["tambopata", "iquitos"], journeys: ["andes-and-amazon", "peru-with-kids"] },
];

export const foodById = (id: string) => foods.find((f) => f.id === id);
