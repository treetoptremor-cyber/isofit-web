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
  body?: string[];
  bullets?: string[];
  specs?: { term: string; value: string }[];
  table?: DocTable;
  // Two opposed lists shown as side-by-side cards: is / is not, answers / declines.
  columns?: { heading: string; tone: "yes" | "no"; items: string[] }[];
  // A sentence quoted verbatim from the app, with where it appears.
  quote?: { text: string; source: string };
};

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
