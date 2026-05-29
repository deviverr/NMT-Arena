import { subjects, type SubjectSlug } from "@nmt-arena/shared";

export function SubjectTag({ slug }: { slug: SubjectSlug }) {
  const subject = subjects.find((item) => item.slug === slug);
  if (!subject) return null;
  return (
    <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-bold text-white" style={{ backgroundColor: subject.color }}>
      <span aria-hidden>{subject.icon}</span>
      {subject.nameUa}
    </span>
  );
}
