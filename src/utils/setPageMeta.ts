export function setPageMeta(title: string, description: string, keywords: string): void {
  document.title = title;

  let descTag = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
  if (descTag) {
    descTag.content = description;
  }

  let kwTag = document.querySelector('meta[name="keywords"]') as HTMLMetaElement | null;
  if (kwTag) {
    kwTag.content = keywords;
  }
}
