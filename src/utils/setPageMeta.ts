export interface PageMeta {
  title: string;
  description: string;
  keywords: string;
}

function updateMeta(selector: string, value: string): void {
  const el = document.querySelector(selector) as HTMLMetaElement | null;
  if (el) el.content = value;
}

export function setPageMeta(meta: PageMeta): void {
  document.title = meta.title;
  updateMeta('meta[name="description"]', meta.description);
  updateMeta('meta[name="keywords"]', meta.keywords);
  updateMeta('meta[property="og:title"]', meta.title);
  updateMeta('meta[property="og:description"]', meta.description);
}
