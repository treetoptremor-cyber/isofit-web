// A marketing page described as data. The React page renders it with layout
// and imagery; /llms-full.txt and the .md mirrors render the same object as
// plain markdown, so the two can never disagree.

export type DocTable = {
  caption?: string;
  head: string[];
  rows: string[][];
};

export type DocSection = {
  id: string;
  label?: string;
  heading: string;
  // 3 nests the section under the h2 before it (h3 on the page, ### in markdown).
  level?: 2 | 3;
  body?: string[];
  bullets?: string[];
  // Named points under the section, each an h3 with a short answer.
  items?: DocItem[];
  // A person's role, shown beside their portrait.
  byline?: string;
  // A passage in someone's own words, e.g. the founder's story.
  statement?: { paragraphs: string[]; attribution: string };
  // A portrait or figure that belongs to the section's content.
  image?: { src: string; alt: string };
  // Outbound links shown under the copy, e.g. a founder's profiles.
  links?: { href: string; label: string }[];
  specs?: { term: string; value: string }[];
  table?: DocTable;
  // Two opposed lists shown as side-by-side cards: is / is not, answers / declines.
  columns?: { heading: string; tone: "yes" | "no"; items: string[] }[];
  // A sentence quoted verbatim from the app, with where it appears.
  // A pulled sentence. `source` is omitted when the surrounding text is already signed.
  quote?: { text: string; source?: string; tone?: "atlas" };
};

export type DocItem = { heading: string; body: string; label?: string };

export type DocFaq = {
  question: string;
  answer: string[];
  link?: { href: string; label: string };
};

export type PageDoc = {
  path: string;
  // <title> and og:title. Front-load the query the page answers.
  metaTitle: string;
  metaDescription: string;
  // Short name for breadcrumbs, the sitemap and llms.txt.
  name: string;
  h1: string;
  // The answer-first paragraph under the h1.
  lede: string;
  sections: DocSection[];
  faqs?: DocFaq[];
  // Pages to point to at the end of the mirror and in "related" blocks.
  related?: string[];
};
