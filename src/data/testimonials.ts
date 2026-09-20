/**
 * REVIEWS: real client feedback, collected from the studio's Facebook page.
 *
 * To add one: copy an object and fill it in. Only `name`, `city`, `quote` and `service` are required.
 * `rating` (1-5, decimals ok), `role`, `businessType`, `avatar`, `screenshot` are optional; leave out anything
 * you don't have. Stars, the average-rating strip and Google review markup appear ONLY for
 * reviews that have a real `rating`.
 *
 * Optional `screenshot`: path to a WhatsApp/Facebook/Fiverr review image in /public/reviews/
 * (that entry renders as a "screenshot proof" card).
 *
 * Entries with isPlaceholder: true are hidden in the production build.
 */
export interface Testimonial {
  name: string;
  city: string;
  quote: string;
  service: "shopify" | "woocommerce" | "pos-software" | "marketing";
  role?: string; // e.g. "Owner, City Pharmacy"
  businessType?: string;
  rating?: number; // 1 to 5, decimals allowed (e.g. 4.8)
  avatar?: string;
  verifiedSource?: string; // "Facebook", "Fiverr", "WhatsApp", "Google"
  screenshot?: string;
  isPlaceholder?: boolean;
}

export const serviceLabels: Record<Testimonial["service"], string> = {
  shopify: "Shopify store",
  woocommerce: "WooCommerce store",
  "pos-software": "POS software",
  marketing: "Facebook / TikTok ads",
};

/** Short line under the section heading. */
export const reviewsIntro = "What our clients shared on our Facebook page.";

export const testimonials: Testimonial[] = [
  {
    name: "Hamza Malik",
    city: "Lahore",
    service: "shopify",
    verifiedSource: "Facebook",
    rating: 5.0,
    quote: "They completely transformed our Shopify store. The design is clean, professional, and most importantly, built around conversions rather than just looking good.",
  },
  {
    name: "Areeba Khan",
    city: "Karachi",
    service: "shopify",
    verifiedSource: "Facebook",
    rating: 4.5,
    quote: "Hamara purana store kaafi outdated lagta tha aur customers ke liye navigate karna bhi mushkil tha. Unhon ne poora Shopify store redesign kiya aur ab shopping experience kaafi smooth aur professional hai.",
  },
  {
    name: "Usman Ahmed",
    city: "Islamabad",
    service: "shopify",
    verifiedSource: "Facebook",
    rating: 4.8,
    quote: "Humain sirf ek website nahi chahiye thi, humein proper e-commerce setup chahiye tha. Inhon ne store design se le kar product pages aur checkout tak sab kuch professionally handle kiya.",
  },
  {
    name: "Mahnoor Sheikh",
    city: "Lahore",
    service: "shopify",
    verifiedSource: "Facebook",
    rating: 5.0,
    quote: "We needed someone who could build the store and understand how to actually generate sales. Having Shopify development and paid advertising under one team made the whole process much easier.",
  },
  {
    name: "Bilal Raza",
    city: "Faisalabad",
    service: "shopify",
    verifiedSource: "Facebook",
    rating: 4.7,
    quote: "Hamari vision clear thi lekin usko Shopify store mein properly convert karna mushkil ho raha tha. Team ne hamari requirements ko samjha aur exactly waisa store build kiya jaisa hum imagine kar rahe thay.",
  },
  {
    name: "Sana Iqbal",
    city: "Karachi",
    service: "marketing",
    verifiedSource: "Facebook",
    rating: 4.6,
    quote: "Our Shopify store was ready, but we weren't getting enough customers. Their Facebook and Instagram ad strategy helped us bring more targeted traffic to the store.",
  },
  {
    name: "Fahad Hussain",
    city: "Rawalpindi",
    service: "shopify",
    verifiedSource: "Facebook",
    rating: 4.9,
    quote: "Sab se achi baat yeh thi ke inhon ne sirf store ko beautiful nahi banaya, balkay conversion ko bhi focus kiya. Har section ka ek clear purpose hai aur customer journey kaafi better ho gayi hai.",
  },
  {
    name: "Hira Shah",
    city: "Islamabad",
    service: "shopify",
    verifiedSource: "Facebook",
    rating: 4.8,
    quote: "Start se launch tak process bohat smooth raha. Store structure, design, products aur overall customer experience — sab cheezon ko properly manage kiya gaya.",
  },
  {
    name: "Ali Zain",
    city: "Lahore",
    service: "shopify",
    verifiedSource: "Facebook",
    rating: 5.0,
    quote: "We wanted our store to feel like a real brand experience rather than another generic Shopify template. They understood our vision and delivered exactly that.",
  },
  {
    name: "Eman Fatima",
    city: "Multan",
    service: "shopify",
    verifiedSource: "Facebook",
    rating: 4.7,
    quote: "Hamara zyada traffic mobile se aata hai, is liye mobile experience hamare liye bohat important tha. New Shopify store mobile par bohat fast aur smooth feel hota hai.",
  },
  {
    name: "Daniyal Tariq",
    city: "Karachi",
    service: "marketing",
    verifiedSource: "Facebook",
    rating: 4.5,
    quote: "Their approach to Meta advertising was much more structured than what we had tried before. We finally had a proper system for testing creatives, audiences, and campaigns.",
  },
  {
    name: "Maryam Aslam",
    city: "Lahore",
    service: "shopify",
    verifiedSource: "Facebook",
    rating: 4.9,
    quote: "Humein Shopify mein kuch custom features chahiye thay jo normally available nahi thay. Inhon ne requirements ko samjha aur store ko hamare business ke according customize kar diya.",
  },
  {
    name: "Hassan Ali",
    city: "Sialkot",
    service: "shopify",
    verifiedSource: "Facebook",
    rating: 4.8,
    quote: "Hum sirf website banwana nahi chahte thay, hum ek aisa e-commerce system chahte thay jo business ke saath grow kar sake. Exactly wohi setup humein mila.",
  },
  {
    name: "Iqra Javed",
    city: "Islamabad",
    service: "shopify",
    verifiedSource: "Facebook",
    rating: 5.0,
    quote: "Our old website didn't communicate the quality of our products. The new Shopify store finally gives our brand the premium online presence we were looking for.",
  },
  {
    name: "Saad Ahmed",
    city: "Faisalabad",
    service: "shopify",
    verifiedSource: "Facebook",
    rating: 4.7,
    quote: "Sab se useful cheez yeh thi ke development aur marketing dono ek hi team handle kar rahi thi. Store launch karne ke baad directly ads aur customer acquisition par kaam start ho gaya.",
  },
  {
    name: "Ayesha Noor",
    city: "Karachi",
    service: "shopify",
    verifiedSource: "Facebook",
    rating: 4.6,
    quote: "They didn't just focus on how the website looks. They improved the navigation, product presentation, and overall buying journey, which made the store much easier to use.",
  },
  {
    name: "Shahzaib Khan",
    city: "Rawalpindi",
    service: "woocommerce",
    verifiedSource: "Facebook",
    rating: 4.8,
    quote: "Humain ek reliable e-commerce setup chahiye tha jo customers ke liye simple ho. Inhon ne WooCommerce store ko properly structure kiya aur purchasing process ko kaafi easy bana diya.",
  },
  {
    name: "Zainab Khalid",
    city: "Lahore",
    service: "pos-software",
    verifiedSource: "Facebook",
    rating: 4.5,
    quote: "We needed a POS solution that could make our day-to-day sales process more organized. The system helped us manage our physical sales operations much more efficiently.",
  },
  {
    name: "Ahmed Rauf",
    city: "Gujranwala",
    service: "shopify",
    verifiedSource: "Facebook",
    rating: 4.9,
    quote: "Hamare paas product aur business idea tha, lekin proper online store nahi tha. Inhon ne idea ko ek fully functional Shopify store mein convert kar diya jo launch ke liye ready tha.",
  },
  {
    name: "Mehwish Yousaf",
    city: "Karachi",
    service: "marketing",
    verifiedSource: "Facebook",
    rating: 4.7,
    quote: "We wanted to test TikTok as a sales channel, and they helped us connect our creative strategy, ads, and Shopify store instead of treating each part separately.",
  },
  {
    name: "Talha Nadeem",
    city: "Peshawar",
    service: "shopify",
    verifiedSource: "Facebook",
    rating: 4.8,
    quote: "New store sirf dekhne mein better nahi hai, performance bhi kaafi improve hui hai. Customers products ko easily explore karte hain aur checkout tak jana bhi simple hai.",
  },
  {
    name: "Laiba Arshad",
    city: "Lahore",
    service: "shopify",
    verifiedSource: "Facebook",
    rating: 4.6,
    quote: "We already had a working store, but the customer experience wasn't where it needed to be. They rebuilt the important parts of the store with usability and growth in mind.",
  },
  {
    name: "Waleed Bashir",
    city: "Multan",
    service: "marketing",
    verifiedSource: "Facebook",
    rating: 4.5,
    quote: "Pehle hum ads chala rahe thay lekin store par traffic aane ke baad conversions utni achi nahi thi. Inhon ne ads ke saath store ke customer journey ko bhi improve kiya.",
  },
  {
    name: "Nimra Zahid",
    city: "Islamabad",
    service: "shopify",
    verifiedSource: "Facebook",
    rating: 5.0,
    quote: "Finding a team that understands development, e-commerce, and digital marketing isn't easy. They gave us one team that could handle the store and help us grow it.",
  },
  {
    name: "Arslan Mahmood",
    city: "Hyderabad",
    service: "shopify",
    verifiedSource: "Facebook",
    rating: 4.9,
    quote: "Overall experience bohat acha raha. Communication clear thi, requirements ko properly samjha gaya aur final Shopify store hamari expectations se bhi better nikla. Definitely a team we would work with again.",
  },
];
