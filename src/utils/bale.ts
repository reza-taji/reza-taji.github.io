export const BALE_ID = 'MaktabeAbutorab_Admin';

export const authorMessage = 'سلام، من مؤلف/مترجم هستم و تمایل به ارسال و بررسی اثر برای نشر مکتب ابوتراب دارم.';
export const collaborationMessage = 'سلام، برای اعلام آمادگی همکاری تخصصی (ویراستاری/صفحه‌آرایی/طراحی و...) پیام می‌دهم.';
export const generalMessage = 'سلام، در رابطه با نشر مکتب ابوتراب سؤالی داشتم.';

export function getBaleUrl(message: string): string {
  return `https://ble.ir/${BALE_ID}?text=${encodeURIComponent(message)}`;
}
