import { myFirebase } from "./firebase";

export interface PullRequest {
  owner: string;
  repo: string;
  pullNumber: string;
}

export interface PullRequestResponse {
  id: number;
  html_url: string;
  author_association: string;
  body: string;
  user: {
    avatar_url: string;
    login: string;
  };
  diff_hunk?: string;
}

export interface IssueResponse extends PullRequestResponse {
  pull_request?: {
    url: string;
  };
}

export interface CodeReview {
  id: number;
  url: string;
  author: {
    avatarUrl: string;
    userName: string;
  };
  content: string;
  plainText: string;
  diffHunk?: string;
}

export interface Profile {
  nickname: string;
  avatarURL: string;
  githubToken?: string;
}

export interface PullRequestURL {
  url: string;
  nickname: string;
  modificationTime: myFirebase.firestore.Timestamp;
  isFailedURL: boolean;
}

export interface HttpResponse<T> {
  endPointURL: string;
  error?: {
    errorMessage: string;
  };
  resolvedValue: T;
}

export type RequiredOnly<T, K extends keyof T> = Partial<Exclude<T, K>> &
  Required<Pick<T, K>>;
