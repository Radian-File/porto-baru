export type ContributionDay = {
  contributionCount: number;
  contributionLevel: "NONE" | "FIRST_QUARTILE" | "SECOND_QUARTILE" | "THIRD_QUARTILE" | "FOURTH_QUARTILE";
  date: string;
  weekday: number;
};

export type ContributionCalendar = {
  totalContributions: number;
  weeks: { contributionDays: ContributionDay[] }[];
};

type GraphqlResponse = {
  data?: {
    user?: {
      contributionsCollection: {
        contributionCalendar: ContributionCalendar;
      };
    } | null;
  };
  errors?: { message: string }[];
};

const contributionQuery = `
  query ContributionCalendar($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              contributionLevel
              date
              weekday
            }
          }
        }
      }
    }
  }
`;

function yearRange() {
  const to = new Date();
  to.setUTCHours(23, 59, 59, 999);

  const from = new Date(to);
  from.setUTCDate(from.getUTCDate() - 364);
  from.setUTCHours(0, 0, 0, 0);

  return { from: from.toISOString(), to: to.toISOString() };
}

export async function getContributionCalendar(login: string): Promise<ContributionCalendar | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  const { from, to } = yearRange();

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "ricky-portfolio",
      },
      body: JSON.stringify({
        query: contributionQuery,
        variables: { login, from, to },
      }),
      next: { revalidate: 43_200 },
    });

    if (!response.ok) return null;

    const payload = (await response.json()) as GraphqlResponse;
    if (payload.errors?.length) return null;

    return payload.data?.user?.contributionsCollection.contributionCalendar ?? null;
  } catch {
    return null;
  }
}
