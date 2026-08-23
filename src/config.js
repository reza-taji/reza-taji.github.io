import { pick } from './i18n/localized.js';

// Shared constants for the publisher (single source of truth).
// Deep link target for Bale messenger — used by the buy CTA in Phase 4
// and the footer "Bale channel" link here.
export const PUBLISHER = {
  name: 'نشر مکتب ابوتراب',
  // Pre-fill target for purchase requests (Phase 4 builds the dynamic URL).
  baleSupportId: 'MaktabeAbutorab_Admin',
  baleSupportUrl: 'https://ble.ir/MaktabeAbutorab_Admin',
  // Public Bale channel for the footer link.
  baleChannelUrl: 'https://ble.ir/MaktabeAbutorab',
  logoUrl: '/logo.webp',
};

// Number-format locale per UI language — controls native digit rendering.
const NUMBER_LOCALE = { fa: 'fa-IR', ar: 'ar', ur: 'ur-PK' };

// Formats any integer in the requested language's digits (Persian/Arabic/
// Urdu-Indic). Used for both prices and page counts so digits stay native.
export function formatNumber(value, lang = 'fa') {
  const locale = NUMBER_LOCALE[lang] || NUMBER_LOCALE.fa;
  return new Intl.NumberFormat(locale).format(value);
}

// Formats a Rial price in the requested language's digits. The currency
// suffix ("تومان") is NOT appended here — callers add the translated suffix
// via i18n's `common.toman` so it localizes too.
export function formatPrice(rials, lang = 'fa') {
  return formatNumber(rials, lang);
}

// Build the Bale messenger deep link with a pre-filled purchase request.
// Base: https://ble.ir/<id>?text=<encoded message>.
// `text` param must be URL-encoded so the Persian message survives the
// hand-off into the Bale app's compose box.
//
// NOTE: the message body is always Persian regardless of the active UI
// language — the publisher's support staff reads Persian. The book title is
// pulled with lang='fa' so it stays Persian even once books.json is migrated
// to per-language fields.
export function buildBalePurchaseUrl(book) {
  const title = pick(book, 'title', 'fa');
  const message = `سلام، وقت بخیر. درخواست خرید کتاب «${title}» با کد ${book.id} را دارم.`;
  const encoded = encodeURIComponent(message);
  return `https://ble.ir/${PUBLISHER.baleSupportId}?text=${encoded}`;
}
