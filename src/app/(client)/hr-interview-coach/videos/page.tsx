'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { HRVideo, HRVideoSection, hrVideoSections } from '@/data/hr-coach-data';
import { getVideoUrl } from '@/utils/video-url';
import { AnimatePresence, motion } from 'framer-motion';
import {
    ArrowLeft,
    BookOpen,
    CheckCircle2,
    ChevronDown,
    ChevronUp,
    Clock,
    HelpCircle,
    PlayCircle,
    Sparkles,
    Video
} from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

// Map icon names to components
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen,
  HelpCircle,
  Sparkles
};

interface WatchedVideos {
  [videoId: string]: boolean;
}

export default function HRVideosPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(hrVideoSections[0]?.id || null);
  const [watchedVideos, setWatchedVideos] = useState<WatchedVideos>({});
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  // Load watched videos from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('interview-ai-hr-watched-videos');
    if (saved) {
      setWatchedVideos(JSON.parse(saved));
    }
  }, []);

  // Save watched videos to localStorage
  const markAsWatched = (videoId: string) => {
    const updated = { ...watchedVideos, [videoId]: true };
    setWatchedVideos(updated);
    localStorage.setItem('interview-ai-hr-watched-videos', JSON.stringify(updated));
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const getProgress = (section: HRVideoSection) => {
    const watched = section.videos.filter((v: HRVideo) => watchedVideos[v.id]).length;
    
return Math.round((watched / section.videos.length) * 100);
  };

  const totalProgress = () => {
    const allVideos = hrVideoSections.flatMap((s: HRVideoSection) => s.videos);
    const watched = allVideos.filter((v: HRVideo) => watchedVideos[v.id]).length;
    
return Math.round((watched / allVideos.length) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/hr-interview-coach">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg mb-4">
            <Video className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            HR Interview Video Tutorials
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Watch expert video tutorials to master HR interview skills, common questions, and confidence-building techniques.
          </p>
        </motion.div>

        {/* Overall Progress */}
        <Card className="p-6 bg-white dark:bg-gray-800 border-none shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Your Learning Progress</h3>
            <span className="text-2xl font-bold text-purple-600">{totalProgress()}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${totalProgress()}%` }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {Object.keys(watchedVideos).filter((k: string) => watchedVideos[k]).length} of {hrVideoSections.reduce((acc: number, s: HRVideoSection) => acc + s.videos.length, 0)} videos completed
          </p>
        </Card>

        {/* Video Sections */}
        <div className="space-y-4">
          {hrVideoSections.map((section: HRVideoSection, index: number) => {
            const IconComponent = iconMap[section.icon] || BookOpen;
            const isExpanded = expandedSection === section.id;
            const progress = getProgress(section);

            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`overflow-hidden border-none shadow-lg ${section.bgColor}`}>
                  {/* Section Header */}
                  <button
                    className="w-full p-6 flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    onClick={() => toggleSection(section.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl bg-white dark:bg-gray-800 shadow-sm`}>
                        <IconComponent className={`w-6 h-6 ${section.color}`} />
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                          {section.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md">
                          {section.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden sm:block">
                        <span className={`text-sm font-medium ${section.color}`}>{progress}% complete</span>
                        <div className="w-24 bg-white/50 dark:bg-gray-700/50 rounded-full h-2 mt-1">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              section.color.includes('blue') ? 'bg-blue-500' :
                              section.color.includes('purple') ? 'bg-purple-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                  </button>

                  {/* Videos List */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 pt-0 space-y-3">
                          {section.videos.map((video: HRVideo, vIndex: number) => {
                            const isWatched = watchedVideos[video.id];
                            const isPlaying = playingVideo === video.id;

                            return (
                              <motion.div
                                key={video.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: vIndex * 0.1 }}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
                              >
                                {/* Video Info */}
                                <div className="p-4 flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${isWatched ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-700'}`}>
                                      {isWatched ? (
                                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                                      ) : (
                                        <PlayCircle className="w-5 h-5 text-gray-500" />
                                      )}
                                    </div>
                                    <div>
                                      <h4 className="font-medium text-gray-800 dark:text-gray-200">
                                        {video.title}
                                      </h4>
                                      {video.duration && (
                                        <span className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                          <Clock className="w-3 h-3" />
                                          {video.duration}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <Button
                                    variant={isPlaying ? "default" : "outline"}
                                    size="sm"
                                    className="gap-2"
                                    onClick={() => setPlayingVideo(isPlaying ? null : video.id)}
                                  >
                                    {isPlaying ? 'Hide Video' : 'Watch Now'}
                                  </Button>
                                </div>

                                {/* Video Player */}
                                <AnimatePresence>
                                  {isPlaying && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      className="border-t border-gray-100 dark:border-gray-700"
                                    >
                                      <div className="p-4 bg-gray-50 dark:bg-gray-900">
                                        <video
                                          className="w-full rounded-lg shadow-lg"
                                          controls
                                          onPlay={() => markAsWatched(video.id)}
                                          onEnded={() => markAsWatched(video.id)}
                                        >
                                          <source src={getVideoUrl(video.videoPath)} type="video/mp4" />
                                          Your browser does not support the video tag.
                                        </video>
                                        <div className="flex justify-between items-center mt-3">
                                          <p className="text-xs text-gray-500">
                                            {isWatched ? '✓ Marked as watched' : 'Play video to mark as watched'}
                                          </p>
                                          {!isWatched && (
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              className="text-xs"
                                              onClick={() => markAsWatched(video.id)}
                                            >
                                              Mark as Watched
                                            </Button>
                                          )}
                                        </div>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </motion.div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Tips */}
        <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-none shadow-lg">
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            Learning Tips
          </h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>• Watch videos in order for the best learning experience</li>
            <li>• Take notes on key points and practice your answers</li>
            <li>• Use the Answer Builder to craft responses based on what you learn</li>
            <li>• Practice with mock interviews after completing each section</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
