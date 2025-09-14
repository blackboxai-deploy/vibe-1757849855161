"use client";

import { useLiveMatch } from '@/hooks/use-live-match';
import { MatchHeader } from './MatchHeader';
import { ScoreCard } from './ScoreCard';
import { Commentary } from './Commentary';
import { PlayerStats } from './PlayerStats';
import { StreamPlayer } from './StreamPlayer';
import { LiveChat } from './LiveChat';
import { Button } from '@/components/ui/button';

export function LiveMatch() {
  const {
    matchData,
    commentary,
    matchStats,
    liveChat,
    loading,
    error,
    lastUpdate,
    refetch
  } = useLiveMatch();

  if (loading && !matchData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <div className="text-white text-lg">Loading live match data...</div>
          <div className="text-white/60 text-sm mt-2">
            Connecting to cricket servers...
          </div>
        </div>
      </div>
    );
  }

  if (error && !matchData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <div className="text-white text-xl mb-2">Unable to load match data</div>
          <div className="text-white/60 text-sm mb-6">{error}</div>
          <Button 
            onClick={refetch}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!matchData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-lg">No match data available</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <MatchHeader matchData={matchData} lastUpdate={lastUpdate} />
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - Score & Stream */}
          <div className="xl:col-span-2 space-y-6">
            {/* Live Stream Player */}
            <StreamPlayer isLive={matchData.status === 'live'} />
            
            {/* Live Score Card */}
            <ScoreCard matchData={matchData} />
            
            {/* Player Statistics */}
            {matchStats && (
              <PlayerStats matchStats={matchStats} />
            )}
          </div>
          
          {/* Right Column - Commentary & Chat */}
          <div className="space-y-6">
            {/* Live Commentary */}
            <Commentary commentary={commentary} />
            
            {/* Live Chat */}
            <LiveChat messages={liveChat} />
          </div>
        </div>
        
        {/* Error Banner */}
        {error && matchData && (
          <div className="fixed bottom-4 right-4 bg-red-600/90 text-white px-4 py-2 rounded-lg backdrop-blur-sm">
            <div className="text-sm">
              ⚠️ Connection issues - using cached data
            </div>
          </div>
        )}
        
        {/* Loading Indicator */}
        {loading && (
          <div className="fixed bottom-4 left-4 bg-blue-600/90 text-white px-4 py-2 rounded-lg backdrop-blur-sm flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <div className="text-sm">Updating...</div>
          </div>
        )}
        
        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-white/10">
          <div className="text-center text-white/60 text-sm">
            <div className="mb-2">
              🏏 India vs Pakistan Live Cricket Streaming Platform
            </div>
            <div className="text-xs">
              Live updates every 30 seconds • Commentary refreshed every 15 seconds
            </div>
            <div className="text-xs mt-2">
              Last updated: {lastUpdate.toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}