// Shared constants & helpers for the Astro site (single source of truth).

export const PUBLISHER = {
  name: 'نشر مکتب ابوتراب',
  // Bale support ID — purchase deep links land in this account's chat.
  baleSupportId: 'AbutorabSupport',
  // Public Bale channel for the footer link.
  baleChannelUrl: 'https://ble.ir/AbutorabChannel',
  logoUrl: '/logo.webp',
};

// Persian-digit Toman formatter. Kept framework-agnostic so both .astro
// components and any React islands can use it.
export function formatPrice(toman: number): string {
  return `${new Intl.NumberFormat('fa-IR').format(toman)} تومان`;
}

// Build the Bale messenger deep link with a pre-filled purchase request.
// The `text` param is URL-encoded so the Persian message survives the
// hand-off into the Bale app's compose box.
export function buildBalePurchaseUrl(bookTitle: string): string {
  const message = `سلام، من قصد خرید کتاب «${bookTitle}» را دارم.`;
  const encoded = encodeURIComponent(message);
  return `https://ble.ir/${PUBLISHER.baleSupportId}?text=${encoded}`;
}
