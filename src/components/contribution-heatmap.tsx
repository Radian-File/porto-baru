import type { ContributionCalendar, ContributionDay } from "@/data/github";
import { ArrowUpRight } from "@/components/icons";

type ContributionHeatmapProps = {
  calendar: ContributionCalendar;
  profileUrl: string;
};

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function formatDay(day: ContributionDay | undefined) {
  if (!day) return "No activity recorded";

  const formattedDate = new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${day.date}T00:00:00Z`));

  return `${day.contributionCount} contribution${day.contributionCount === 1 ? "" : "s"} on ${formattedDate}`;
}

export function ContributionHeatmap({ calendar, profileUrl }: ContributionHeatmapProps) {
  return (
    <section className="about-activity" aria-labelledby="activity-title">
      <div className="about-activity-heading">
        <div>
          <p className="about-kicker">Build log</p>
          <h2 id="activity-title">A year of consistent work.</h2>
        </div>
        <p>{calendar.totalContributions} public contributions in the last year.</p>
      </div>

      <div className="contribution-map" aria-label={`GitHub activity: ${calendar.totalContributions} public contributions in the last year`}>
        <div className="contribution-grid" role="list">
          {calendar.weeks.map((week, weekIndex) => {
            const days = new Map(week.contributionDays.map((day) => [day.weekday, day]));

            return (
              <div className="contribution-week" key={`${weekIndex}-${week.contributionDays[0]?.date ?? "empty"}`} role="listitem">
                {weekdays.map((weekday, weekdayIndex) => {
                  const day = days.get(weekdayIndex);
                  return day ? (
                    <span
                      aria-label={formatDay(day)}
                      className="contribution-day"
                      data-level={day.contributionLevel.toLowerCase().replace("_quartile", "")}
                      key={day.date}
                      title={formatDay(day)}
                    />
                  ) : (
                    <span aria-hidden="true" className="contribution-day is-outside-range" key={`${weekIndex}-${weekday}`} />
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="contribution-footer">
          <span>Less</span>
          <span className="contribution-legend" aria-hidden="true"><i /><i /><i /><i /><i /></span>
          <span>More</span>
          <a href={profileUrl} rel="noreferrer" target="_blank">View GitHub <ArrowUpRight /></a>
        </div>
      </div>
    </section>
  );
}
