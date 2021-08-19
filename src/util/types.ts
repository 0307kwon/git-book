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
}

export interface Profile {
  nickname: string;
  avatarURL: string;
}

export interface UserInfo {
  profile: Profile;
  pullRequestURLs: string[];
}
