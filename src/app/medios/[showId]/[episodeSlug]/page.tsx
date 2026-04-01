"use client";

import { use } from 'react';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Calendar, Clock, Share2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import PageWrapper from "@/components/layout/PageWrapper";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { podcastSeries } from '@/data/media';
import { useToast } from '@/hooks/use-toast';
import { PodcastEpisodeSEO } from '@/components/seo/PodcastSEO';

export default function PodcastDetailPage({ params }: { params: Promise<{ showId: string; episodeSlug: string }> }) {
  const { showId, episodeSlug } = use(params);
  const { t } = useLanguage();
  const router = useRouter();
  const { toast } = useToast();

  // Find the series and episode
  const parentSeries = podcastSeries.find(s => s.id === showId);
  const episodeData = parentSeries?.episodes.find(ep => ep.slug === episodeSlug);

  if (!episodeData || !parentSeries) {
    redirect('/medios');
  }

  // Find prev/next episodes within the same series
  const currentIndex = parentSeries.episodes.findIndex(ep => ep.slug === episodeSlug);
  const prevEpisode = currentIndex > 0 ? parentSeries.episodes[currentIndex - 1] : null;
  const nextEpisode = currentIndex < parentSeries.episodes.length - 1 ? parentSeries.episodes[currentIndex + 1] : null;

  // Extract Spotify episode ID from URL for embed
  const getSpotifyEmbedUrl = (audioUrl: string) => {
    const match = audioUrl.match(/episode\/([a-zA-Z0-9]+)/);
    if (match) {
      return `https://open.spotify.com/embed/episode/${match[1]}?utm_source=generator`;
    }
    return null;
  };

  const embedUrl = getSpotifyEmbedUrl(episodeData.audioUrl);

  return (
    <PageWrapper>
      <PodcastEpisodeSEO
        title={t(episodeData.titleKey)}
        description={t(episodeData.descriptionKey)}
        seriesTitle={t(parentSeries.titleKey)}
        coverImage={parentSeries.coverImage}
        audioUrl={episodeData.audioUrl}
        duration={episodeData.duration}
        date={episodeData.date}
        episodeNumber={currentIndex + 1}
        url={`https://yosoynosotros.com/medios/${parentSeries.id}/${episodeData.slug}`}
      />
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-navy-dark via-navy to-navy-light text-white overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{
              backgroundImage: `url('${parentSeries.coverImage}')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/95 to-navy/80"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              href={`/medios/show/${parentSeries.id}`}
              className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              {t('podcast.backToShow') || 'Volver al podcast'}
            </Link>

            <div className="max-w-4xl">
              <Badge variant="secondary" className="bg-gold/90 text-navy-dark font-medium mb-6">
                {t(episodeData.categoryKey)}
              </Badge>

              <h1 className="font-heading text-4xl md:text-6xl font-light mb-6 leading-tight">
                {t(episodeData.titleKey)}
              </h1>

              <div className="flex items-center gap-6 text-white/80 mb-8">
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  {new Date(episodeData.date).toLocaleDateString('es-ES')}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  {episodeData.duration}
                </div>
              </div>

              <p className="text-xl text-white/90 leading-relaxed mb-8 max-w-3xl">
                {t(episodeData.descriptionKey)}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gold hover:bg-gold/90 text-navy-dark font-medium"
                  onClick={() => {
                    (window as any).dataLayer?.push({
                      event: 'podcast_detail_play_click',
                      episode_id: episodeData.id,
                      episode_title: t(episodeData.titleKey)
                    });
                    window.open(episodeData.audioUrl, '_blank');
                  }}
                >
                  <Play className="mr-2 h-5 w-5" />
                  {t('podcast.playOnSpotify') || 'Escuchar en Spotify'}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white bg-white/10 hover:bg-white/20"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast({
                      title: t('podcast.linkCopied') || '¡Enlace copiado!',
                      description: t('podcast.linkCopiedDescription') || 'El enlace del episodio ha sido copiado al portapapeles.',
                    });
                  }}
                >
                  <Share2 className="mr-2 h-5 w-5" />
                  {t('podcast.share') || 'Compartir'}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-gradient-to-br from-white via-cream-light/30 to-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Spotify Embed */}
            {embedUrl && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-12"
              >
                <iframe
                  style={{ borderRadius: '12px' }}
                  src={embedUrl}
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </motion.div>
            )}

            {/* Episode Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="prose prose-lg max-w-none mb-12"
            >
              <h2 className="font-heading text-2xl text-navy-dark mb-4">
                {t('podcast.aboutEpisode') || 'Sobre este episodio'}
              </h2>
              <p className="text-navy-light leading-relaxed">
                {t(episodeData.descriptionKey)}
              </p>
            </motion.div>

            {/* Navigation to Prev/Next Episodes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-between gap-4 pt-8 border-t border-cream"
            >
              {prevEpisode ? (
                <Button
                  variant="outline"
                  className="flex-1 justify-start"
                  onClick={() => router.push(`/medios/${parentSeries.id}/${prevEpisode.slug}`)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  <span className="truncate">{t(prevEpisode.titleKey)}</span>
                </Button>
              ) : (
                <div className="flex-1" />
              )}

              {nextEpisode ? (
                <Button
                  variant="outline"
                  className="flex-1 justify-end"
                  onClick={() => router.push(`/medios/${parentSeries.id}/${nextEpisode.slug}`)}
                >
                  <span className="truncate">{t(nextEpisode.titleKey)}</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <div className="flex-1" />
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
