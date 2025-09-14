import { MatchData, Commentary, MatchStats, LiveChatMessage } from './types';

// Mock API service for demonstration - In production, integrate with real cricket APIs
class CricketAPIService {
  // private baseUrl = process.env.CRICKET_API_URL || '';
  // private apiKey = process.env.CRICKET_API_KEY || '';

  // Mock data for demonstration
  private mockMatchData: MatchData = {
    id: 'ind-vs-pak-2024',
    status: 'live',
    teams: {
      team1: {
        id: 'ind',
        name: 'India',
        shortName: 'IND',
        flag: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4027463d-9cda-444f-be43-48b8ddf707d6.png',
        players: [
          { id: 'kohli', name: 'Virat Kohli', role: 'batsman', isOnField: true, battingStats: { runs: 45, balls: 32, fours: 4, sixes: 1, strikeRate: 140.6, isNotOut: true } },
          { id: 'rohit', name: 'Rohit Sharma', role: 'batsman', isOnField: true, battingStats: { runs: 23, balls: 18, fours: 3, sixes: 0, strikeRate: 127.8, isNotOut: true } },
          { id: 'bumrah', name: 'Jasprit Bumrah', role: 'bowler', isOnField: false, bowlingStats: { overs: 0, maidens: 0, runs: 0, wickets: 0, economy: 0, balls: 0 } }
        ]
      },
      team2: {
        id: 'pak',
        name: 'Pakistan',
        shortName: 'PAK',
        flag: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1d992f2b-d1b3-4675-b220-42ed10d460c5.png',
        players: [
          { id: 'babar', name: 'Babar Azam', role: 'batsman', isOnField: false, battingStats: { runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0, isNotOut: true } },
          { id: 'shaheen', name: 'Shaheen Afridi', role: 'bowler', isOnField: true, bowlingStats: { overs: 3.2, maidens: 0, runs: 28, wickets: 0, economy: 8.24, balls: 20 } }
        ]
      }
    },
    score: {
      team1: { runs: 68, wickets: 0, overs: 8, balls: 2, runRate: 8.5, requiredRunRate: 0 },
      team2: { runs: 0, wickets: 0, overs: 0, balls: 0, runRate: 0 }
    },
    currentInnings: 1,
    tossWinner: 'India',
    tossDecision: 'bat',
    venue: 'Dubai International Cricket Stadium',
    matchType: 'T20I',
    startTime: '2024-01-15T14:30:00Z',
    weather: {
      condition: 'Clear',
      temperature: 28,
      humidity: 45,
      windSpeed: 12
    }
  };

  private mockCommentary: Commentary[] = [
    { id: '1', over: 8, ball: 2, runs: 4, text: 'FOUR! Kohli drives beautifully through covers for his 4th boundary', timestamp: new Date().toISOString(), isWicket: false, isBoundary: true, player: 'Virat Kohli' },
    { id: '2', over: 8, ball: 1, runs: 1, text: 'Single taken to deep square leg, good running between the wickets', timestamp: new Date(Date.now() - 30000).toISOString(), isWicket: false, isBoundary: false, player: 'Rohit Sharma' },
    { id: '3', over: 7, ball: 6, runs: 6, text: 'SIX! What a shot! Rohit pulls it over deep mid-wicket for maximum!', timestamp: new Date(Date.now() - 60000).toISOString(), isWicket: false, isBoundary: true, player: 'Rohit Sharma' }
  ];

  private mockChatMessages: LiveChatMessage[] = [
    { id: '1', user: 'CricketFan_IND', message: 'What a partnership! IND looking strong! 🇮🇳', timestamp: new Date().toISOString(), country: 'in' },
    { id: '2', user: 'PakCricketLover', message: 'Need early wickets here! Come on Pakistan! 🇵🇰', timestamp: new Date(Date.now() - 15000).toISOString(), country: 'pk' },
    { id: '3', user: 'CricketExpert', message: 'This partnership is building nicely, 68/0 after 8 overs', timestamp: new Date(Date.now() - 30000).toISOString(), country: 'other' }
  ];

  async getLiveMatch(): Promise<MatchData> {
    try {
      // In production, make actual API call
      // const response = await fetch(`${this.baseUrl}/matches/live`, {
      //   headers: { 'Authorization': `Bearer ${this.apiKey}` }
      // });
      // return response.json();

      // Simulate API delay and return mock data
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Simulate live updates
      this.updateMockData();
      return this.mockMatchData;
    } catch (error) {
      console.error('Error fetching live match data:', error);
      throw new Error('Failed to fetch live match data');
    }
  }

  async getCommentary(): Promise<Commentary[]> {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      return [...this.mockCommentary].reverse(); // Most recent first
    } catch (error) {
      console.error('Error fetching commentary:', error);
      throw new Error('Failed to fetch commentary');
    }
  }

  async getMatchStats(): Promise<MatchStats> {
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      return {
        partnerships: [
          { runs: 68, balls: 50, player1: 'Rohit Sharma', player2: 'Virat Kohli', isActive: true }
        ],
        fallOfWickets: [],
        powerplayScores: [
          { phase: 'Powerplay (1-6)', overs: '1-6', runs: 52, wickets: 0, runRate: 8.67 }
        ]
      };
    } catch (error) {
      console.error('Error fetching match stats:', error);
      throw new Error('Failed to fetch match stats');
    }
  }

  async getLiveChat(): Promise<LiveChatMessage[]> {
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      return this.mockChatMessages;
    } catch (error) {
      console.error('Error fetching live chat:', error);
      return [];
    }
  }

  private updateMockData() {
    // Simulate live score updates
    const random = Math.random();
    if (random > 0.7) {
      this.mockMatchData.score.team1.runs += Math.floor(Math.random() * 6) + 1;
      this.mockMatchData.score.team1.balls += 1;
      
      if (this.mockMatchData.score.team1.balls === 6) {
        this.mockMatchData.score.team1.overs += 1;
        this.mockMatchData.score.team1.balls = 0;
      }
      
      this.mockMatchData.score.team1.runRate = 
        (this.mockMatchData.score.team1.runs / 
         (this.mockMatchData.score.team1.overs + this.mockMatchData.score.team1.balls / 6)) || 0;
    }
  }
}

export const cricketAPI = new CricketAPIService();