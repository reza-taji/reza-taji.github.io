// Shared constants for the publisher (single source of truth).
// Deep link target for Bale messenger — used by the buy CTA in Phase 4
// and the footer "Bale channel" link here.
export const PUBLISHER = {
  name: 'نشر مکتب ابوتراب',
  // Pre-fill target for purchase requests (Phase 4 builds the dynamic URL).
  baleSupportId: 'AbutorabSupport',
  baleSupportUrl: 'https://ble.ir/AbutorabSupport',
  // Public Bale channel for the footer link.
  baleChannelUrl: 'https://ble.ir/AbutorabChannel',
  logoUrl: '/logo.webp',
};

// Currency formatter — Persian (fa-IR) Rial display with Persian digits.
// Kept centralized so price rendering stays consistent across pages.
export function formatPrice(rials) {
  return new Intl.NumberFormat('fa-IR').format(rials) + ' تومان';
}

// Build the Bale messenger deep link with a pre-filled purchase request.
// Base: https://ble.ir/<id>?text=<encoded message>.
// `text` param must be URL-encoded so the Persian message survives the
// hand-off into the Bale app's compose box.
export function buildBalePurchaseUrl(book) {
  const message = `سلام، وقت بخیر. درخواست خرید کتاب «${book.title}» با کد ${book.id} را دارم.`;
  const encoded = encodeURIComponent(message);
  return `https://ble.ir/${PUBLISHER.baleSupportId}?text=${encoded}`;
}
