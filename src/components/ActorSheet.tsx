import { useEffect, useState } from 'react';
import { X, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { fetchPersonDetails, getPosterUrl } from '../lib/tmdb';
import type { TmdbPerson } from '../types';
import SheetModal, { SheetCloseButton } from './SheetModal';
import ExpandableDescription from './ExpandableDescription';

interface Props {
  personId: number;
  onClose: () => void;
}

export default function ActorSheet({ personId, onClose }: Props) {
  const { t, i18n } = useTranslation();
  const [person, setPerson] = useState<TmdbPerson | null>(null);

  useEffect(() => {
    let active = true;
    fetchPersonDetails(personId).then(details => {
      if (active) setPerson(details);
    });
    return () => { active = false; };
  }, [personId]);

  const photoUrl = getPosterUrl(person?.profile_path ?? null);
  const locale = i18n.language.startsWith('fr') ? 'fr-FR' : 'en-US';
  const formatDate = (d: string) => new Date(d).toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });

  const filmography = (person?.combined_credits?.cast ?? [])
    .filter(c => c.poster_path)
    .sort((a, b) => (b.title ?? b.name ?? '').localeCompare(a.title ?? a.name ?? ''))
    .slice(0, 20);

  return (
    <SheetModal
      onClose={onClose}
      rootClassName="z-[70]"
      panelClassName="md:max-w-lg card animate-slide-up md:rounded-2xl rounded-t-3xl rounded-b-none max-h-[85dvh] flex flex-col overflow-hidden"
    >
      <SheetCloseButton className="absolute top-4 right-4 btn-ghost p-2 z-10">
        <X size={20} />
      </SheetCloseButton>

      <div className="overflow-y-auto flex-1">
        <div className="flex items-start gap-4 p-6 pb-4">
          <div className="w-20 aspect-[2/3] rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
            {photoUrl ? (
              <img src={photoUrl} alt={person?.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User size={24} className="text-gray-400" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0 pt-1 pr-8">
            <h2 className="font-serif text-lg font-bold text-gray-900 dark:text-gray-100 leading-tight">
              {person?.name}
            </h2>
            {person?.birthday && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {t(person.deathday ? 'actorSheet.diedOn' : 'actorSheet.born', { date: formatDate(person.deathday ?? person.birthday) })}
                {person.place_of_birth && ` ${t('actorSheet.birthplace', { place: person.place_of_birth })}`}
              </p>
            )}
          </div>
        </div>

        {person && (
          <div className="px-6 pb-4">
            <ExpandableDescription
              description={person.biography || t('actorSheet.noBiography')}
              seeMoreText={t('movieDetail.seeMore')}
              seeLessText={t('movieDetail.seeLess')}
            />
          </div>
        )}

        {filmography.length > 0 && (
          <div className="px-6 pb-6">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              {t('actorSheet.filmography')}
            </p>
            <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
              {filmography.map(credit => {
                const poster = getPosterUrl(credit.poster_path ?? null);
                return (
                  <div key={`${credit.media_type}-${credit.id}`} className="w-20 flex-shrink-0">
                    <div className="aspect-[2/3] rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                      {poster && <img src={poster} alt={credit.title ?? credit.name} className="w-full h-full object-cover" loading="lazy" />}
                    </div>
                    <p className="mt-1.5 text-[11px] font-medium text-gray-700 dark:text-gray-300 leading-tight line-clamp-2">
                      {credit.title ?? credit.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </SheetModal>
  );
}
