export const initialAccounts = {
  EUR: { label: "Primary account", balance: 8420.16, symbol: "€", rate: 1 },
  GBP: { label: "Sterling wallet", balance: 2311.42, symbol: "£", rate: 0.86 },
  USD: { label: "Global dollar", balance: 5196.8, symbol: "$", rate: 1.08 }
};

export const starterTransactions = [
  { id: 1, name: "Ten Belles Coffee", value: -4.8, tag: "Card", icon: "solar:cup-hot-linear" },
  { id: 2, name: "Studio Payout", value: 3200, tag: "Income", icon: "solar:case-round-linear" },
  { id: 3, name: "London Rail", value: -62.4, tag: "Travel", icon: "solar:tram-linear" }
];