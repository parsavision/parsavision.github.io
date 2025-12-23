"use client";

import { useEffect, useState } from "react";
import { GitHubStats } from "./GitHubStats";
import type { GitHubStats as GitHubStatsType } from "@/lib/github";

interface GitHubStatsClientProps {
  username: string;
}

export function GitHubStatsClient({ username }: GitHubStatsClientProps) {
  const [stats, setStats] = useState<GitHubStatsType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch user data
        const userResponse = await fetch(
          `https://api.github.com/users/${username}`
        );
        if (!userResponse.ok) {
          throw new Error("Failed to fetch GitHub user");
        }
        const user = await userResponse.json();

        // Fetch repos
        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
        );
        if (!reposResponse.ok) {
          throw new Error("Failed to fetch GitHub repos");
        }
        const repos = await reposResponse.json();

        // Calculate stats
        const totalStars = repos.reduce(
          (sum: number, repo: { stargazers_count: number }) =>
            sum + repo.stargazers_count,
          0
        );

        // Calculate language statistics
        const languageCounts: Record<string, number> = {};
        repos.forEach((repo: { language: string | null }) => {
          if (repo.language) {
            languageCounts[repo.language] =
              (languageCounts[repo.language] || 0) + 1;
          }
        });

        const totalWithLanguage = Object.values(languageCounts).reduce(
          (a, b) => a + b,
          0
        );
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
          .sort(
            (a: { stargazers_count: number }, b: { stargazers_count: number }) =>
              b.stargazers_count - a.stargazers_count
          )
          .slice(0, 6);

        setStats({
          user,
          totalStars,
          totalRepos: user.public_repos,
          topLanguages,
          topRepos,
        });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch GitHub stats"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [username]);

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-32 bg-secondary rounded-lg"></div>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-secondary rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return <GitHubStats stats={stats} error={error || undefined} />;
}
