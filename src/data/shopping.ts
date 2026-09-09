import type { ShoppingCategory } from "../types";

export const SHOPPING: ShoppingCategory[] = [
  {
    category: "Produce",
    items: [
      { item: "Spring mix / mixed greens", brand: "Fresh Attitude, or store brand bagged salad", where: ["FreshCo", "Food Basics"], note: "Sold as a clamshell or bag in the produce section — either chain carries it." },
      { item: "Baby spinach", brand: "Fresh Attitude, or store brand", where: ["FreshCo", "Food Basics"], note: "Fresh for the wilted-spinach and salad recipes; a frozen chopped-spinach bag (any store brand) also works for the tofu bake." },
      { item: "Cherry tomatoes, cucumber", brand: "Store brand / whatever's freshest", where: ["FreshCo", "Food Basics"], note: "For the spring mix bowl — buy what looks best that week rather than a specific brand." },
    ],
  },
  {
    category: "Proteins",
    items: [
      { item: "Extra-firm tofu", brand: "Sunrise Soya Foods (Extra Firm)", where: ["FreshCo", "Food Basics"], note: "The most common tofu brand on Ontario shelves — usually in produce or the Asian foods aisle. Store brand (Compliments / Selection) firm tofu is a fine backup." },
      { item: "Chicken breast, boneless skinless", brand: "Compliments (FreshCo) / Selection (Food Basics), or the unbranded fresh meat counter", where: ["FreshCo", "Food Basics"], note: "Buy the family pack and portion into 200 g bags for the freezer — cheaper per pound than small trays." },
      { item: "Chicken thighs, boneless skinless", brand: "Same store brands as above", where: ["FreshCo", "Food Basics"], note: "Usually shelved right next to the breast trays." },
      { item: "Basa or tilapia fillets (frozen)", brand: "High Liner", where: ["FreshCo", "Food Basics"], note: "Individually wrapped frozen fillets — thaw only what you need for one dinner." },
      { item: "Eggs", brand: "Burnbrae Farms, or store brand", where: ["FreshCo", "Food Basics"], note: "Any large egg carton works; no need to pay more for specialty cartons." },
    ],
  },
  {
    category: "Pantry & Seasoning",
    items: [
      { item: "Salt, black pepper, garlic powder, paprika, chili flakes", brand: "Club House", where: ["FreshCo", "Food Basics"], note: "Club House is the default spice-aisle brand at both chains and covers everything the dinners need." },
      { item: "Curry powder / garam masala (optional)", brand: "Club House or MDH", where: ["FreshCo", "Food Basics"], note: "Only needed if you want the optional spiced versions — skip entirely if salt and pepper is enough." },
      { item: "Raw cashews", brand: "Bulk bin, or Compliments / Selection bagged", where: ["FreshCo", "Food Basics"], note: "For the cashew-cream tofu recipe." },
      { item: "Cooking oil", brand: "Store brand vegetable or canola oil", where: ["FreshCo", "Food Basics"], note: "Any neutral oil works fine for the air fryer." },
    ],
  },
  {
    category: "Bakery & Snacks",
    items: [
      { item: "Bagels", brand: "Dempster's", where: ["FreshCo", "Food Basics"], note: "Stocked at both." },
      { item: "Protein bar", brand: "Builder's (Clif) Mint", where: ["Walmart", "Amazon.ca"], note: "Not typically stocked at FreshCo or Food Basics. Quest or OhYeah bars are reasonable substitutes if either store carries them locally." },
      { item: "Plant-based protein powder", brand: "LeanFit Chocolate", where: ["Walmart", "Superstore", "Amazon.ca"], note: "A Canadian brand, but usually not carried by FreshCo or Food Basics — worth a monthly stock-up trip elsewhere." },
      { item: "Berries, chia seeds", brand: "Store brand frozen berries; chia in the bulk or health-food aisle", where: ["FreshCo", "Food Basics"], note: "Frozen berries are cheaper and last longer than fresh." },
    ],
  },
  {
    category: "Supplements",
    items: [
      { item: "Vitamin D3 + K2, Omega-3, B12, Multivitamin", brand: "Jamieson or Webber Naturals", where: ["Shoppers Drug Mart", "Costco", "Walmart"], note: "Grocery discount banners like FreshCo and Food Basics rarely stock a real supplement aisle — a pharmacy or Costco/Walmart is the realistic source." },
    ],
  },
];
