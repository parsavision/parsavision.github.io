export interface GitHubUser {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  location: string | null;
  blog: string | null;
  twitter_username: string | null;
}

export interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
}

export interface GitHubStats {
  user: GitHubUser;
  totalStars: number;
  totalRepos: number;
  topLanguages: { name: string; count: number; percentage: number }[];
  topRepos: GitHubRepo[];
}

const GITHUB_API_URL = "https://api.github.com";

async function fetchGitHub<T>(endpoint: string): Promise<T> {
  const token = process.env.GITHUB_TOKEN;
  
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };

  if (token) {
    headers.Authorization = `token ${token}`;
  }

  const response = await fetch(`${GITHUB_API_URL}${endpoint}`, {
    headers,
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  return response.json();
}

export async function getGitHubUser(username: string): Promise<GitHubUser> {
  return fetchGitHub<GitHubUser>(`/users/${username}`);
}

export async function getGitHubRepos(username: string): Promise<GitHubRepo[]> {
  const repos = await fetchGitHub<GitHubRepo[]>(
    `/users/${username}/repos?per_page=100&sort=updated`
  );
  return repos;
}

export async function getGitHubStats(username: string): Promise<GitHubStats> {
  const [user, repos] = await Promise.all([
    getGitHubUser(username),
    getGitHubRepos(username),
  ]);

  // Calculate total stars
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

  // Calculate language statistics
  const languageCounts: Record<string, number> = {};
  repos.forEach((repo) => {
    if (repo.language) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
    }
  });

  const totalWithLanguage = Object.values(languageCounts).reduce((a, b) => a + b, 0);
  const topLanguages = Object.entries(languageCounts)
    .map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / totalWithLanguage) * 100),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  // Get top repos by stars
  const topRepos = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6);

  return {
    user,
    totalStars,
    totalRepos: user.public_repos,
    topLanguages,
    topRepos,
  };
}

export async function getContributionData(username: string): Promise<number[][]> {
  // Note: Contribution graph requires GraphQL API or scraping
  // For now, return mock data. In production, use GitHub GraphQL API
  // with a personal access token that has read:user scope
  
  // This creates a simple mock contribution pattern
  const weeks: number[][] = [];
  for (let i = 0; i < 52; i++) {
    const week: number[] = [];
    for (let j = 0; j < 7; j++) {
      // Random contribution levels (0-4)
      week.push(Math.floor(Math.random() * 5));
    }
    weeks.push(week);
  }
  return weeks;
}
