// Screenshots for each project, found automatically.
//
// To add screenshots to a project, drop image files (png, jpg or webp) into
//     src/assets/work/<project-slug>/
// for example  src/assets/work/hsms-hardware/01-billing-counter.png
// Files are shown in name order. The caption comes from the file name:
// "01-billing-counter.png" becomes "Billing counter". Tall images (phone
// screenshots) get a phone frame; wide ones get a browser window.
import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/work/*/*.{png,jpg,jpeg,webp,avif}',
  { eager: true },
);

export interface Shot {
  img: ImageMetadata;
  caption: string;
  phone: boolean;
  file: string;
}

const captionOf = (file: string) => {
  const base = file.replace(/\.[a-z0-9]+$/i, '').replace(/^\d+[-_ ]*/, '').replace(/[-_]+/g, ' ').trim();
  return base ? base[0].toUpperCase() + base.slice(1) : '';
};

export function shotsFor(slug: string): Shot[] {
  return Object.entries(files)
    .filter(([path]) => path.includes(`/work/${slug}/`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, mod]) => {
      const file = path.split('/').pop()!;
      const img = mod.default;
      return { img, file, caption: captionOf(file), phone: img.height > img.width * 1.3 };
    });
}
