// app/components/kartu.tsx
import Link from 'next/link';
import Image from 'next/image';

interface KartuProps {
  id: string;
  title: string;
  imageSrc: string;
  date: string;
  href: string;
}

export default function Kartu({ id, title, imageSrc, date, href }: KartuProps) {
  return (
    <Link 
      href={href} 
      key={id}
      className="block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    >
      <div className="relative h-48">
        <Image
          src={imageSrc}
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 line-clamp-2">{title}</h2>
        <p className="text-gray-600 text-sm">
          {new Date(date).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>
    </Link>
  );
}