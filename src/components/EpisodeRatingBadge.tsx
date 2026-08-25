import { Star } from 'lucide-react';
import type { TmdbEpisode } from '../types';
import type { EpisodeRating } from '../lib/imdb';
import { getRatingStyle } from '../lib/imdbRatingStyle';

export default function EpisodeRatingBadge({ imdb, tmdb, size = 'sm' }: { imdb?: EpisodeRating; tmdb?: TmdbEpisode; size?: 'sm' | 'md' }) {
  if (imdb?.imdbRating != null) {
    if (size === 'md') {
      return (
        <div className="px-3 py-1.5 rounded-lg text-sm font-extrabold" style={getRatingStyle(imdb.imdbRating)}>
          {imdb.imdbRating.toFixed(1)}
        </div>
      );
    }
    return (
      <span className="px-1.5 py-0.5 rounded-md text-[10px] font-extrabold shadow-sm" style={getRatingStyle(imdb.imdbRating)}>
        {imdb.imdbRating.toFixed(1)}
      </span>
    );
  }
  if (typeof tmdb?.vote_average === 'number' && tmdb.vote_average > 0) {
    if (size === 'md') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-semibold">
          <Star size={11} className="fill-current" />
          {tmdb.vote_average.toFixed(1)}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-0.5 rounded-md bg-amber-500 px-1.5 py-0.5 text-[10px] font-extrabold text-white shadow-sm">
        <Star size={9} className="fill-current" />
        {tmdb.vote_average.toFixed(1)}
      </span>
    );
  }
  return null;
}
