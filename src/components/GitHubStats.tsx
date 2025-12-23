"use client";

import { Star, GitFork, Users, MapPin, Link as LinkIcon, Calendar, Code } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { GitHubStats as GitHubStatsType } from "@/lib/github";

interface GitHubStatsProps {
  stats: GitHubStatsType | null;
  error?: string;
}

export function GitHubStats({ stats, error }: GitHubStatsProps) {
  if (error) {
    return (
      <Card className="border-destructive/50">
        <CardContent className="pt-6">
          <p className="text-destructive text-center">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!stats) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-secondary rounded w-3/4"></div>
            <div className="h-4 bg-secondary rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const { user, totalStars, totalRepos, topLanguages, topRepos } = stats;

  return (
    <div className="space-y-6">
      {/* User Profile Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <img
              src={user.avatar_url}
              alt={user.name || user.login}
              className="h-24 w-24 rounded-full border-2 border-border"
            />
            <div className="space-y-2">
              <div>
                <h3 className="text-xl font-bold">{user.name || user.login}</h3>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  @{user.login}
                </a>
              </div>
              {user.bio && (
                <p className="text-muted-foreground text-sm">{user.bio}</p>
              )}
              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground sm:justify-start">
                {user.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {user.location}
                  </span>
                )}
                {user.blog && (
                  <a
                    href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-foreground transition-colors"
                  >
                    <LinkIcon className="h-4 w-4" />
                    Website
                  </a>
                )}
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Joined {new Date(user.created_at).getFullYear()}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold">{totalRepos}</div>
            <div className="text-sm text-muted-foreground flex items-center justify-center gap-1 mt-1">
              <Code className="h-4 w-4" />
              Repositories
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold">{totalStars}</div>
            <div className="text-sm text-muted-foreground flex items-center justify-center gap-1 mt-1">
              <Star className="h-4 w-4" />
              Total Stars
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold">{user.followers}</div>
            <div className="text-sm text-muted-foreground flex items-center justify-center gap-1 mt-1">
              <Users className="h-4 w-4" />
              Followers
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold">{user.following}</div>
            <div className="text-sm text-muted-foreground flex items-center justify-center gap-1 mt-1">
              <Users className="h-4 w-4" />
              Following
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Languages */}
      {topLanguages.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Languages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {topLanguages.map((lang) => (
                <Badge key={lang.name} variant="secondary" className="px-3 py-1">
                  {lang.name}
                  <span className="ml-2 text-muted-foreground">{lang.percentage}%</span>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Top Repos */}
      {topRepos.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Popular Repositories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {topRepos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 rounded-lg border border-border hover:border-white/30 transition-colors"
                >
                  <div className="font-medium mb-1">{repo.name}</div>
                  {repo.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {repo.description}
                    </p>
                  )}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-white"></span>
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="h-3 w-3" />
                      {repo.forks_count}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
