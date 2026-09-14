"use client";

import type { ContributionCalendar, ContributionDay } from "@/data/github";
import { ArrowUpRight } from "@/components/icons";
import { Copy, useLanguage } from "@/components/language";

type ContributionHeatmapProps = {
  calendar: ContributionCalendar;
  profileUrl: string;
};

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function formatDay(day: ContributionDay | undefined, language: "en" | "id") {
  if (!day) return language === "id" ? "Belum ada aktivitas" : "No activity recorded";

  const formattedDate = new Intl.DateTimeFormat(language === "id" ? "id-ID" : "en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${day.date}T00:00:00Z`));

  return language === "id"
    ? `${day.contributionCount} kontribusi pada ${formattedDate}`
    : `${day.contributionCount} contribution${day.contributionCount === 1 ? "" : "s"} on ${formattedDate}`;
}

export function ContributionHeatmap({ calendar, profileUrl }: ContributionHeatmapProps) {
  const { language } = useLanguage();
  const activitySummary = language === "id"
    ? `Aktivitas GitHub: ${calendar.totalContributions} kontribusi publik dalam setahun terakhir`
    : `GitHub activity: ${calendar.totalContributions} public contributions in the last year`;

  return (
    <section className="about-activity" aria-labelledby="activity-title">
      <div className="about-activity-heading">
        <div>
          <p className="about-kicker"><Copy en="Build log" id="Catatan build" /></p>
          <h2 id="activity-title"><Copy en="A year of consistent work." id="Setahun membangun secara konsisten." /></h2>
        </div>
        <p><Copy en={`${calendar.totalContributions} public contributions in the last year.`} id={`${calendar.totalContributions} kontribusi publik dalam setahun terakhir.`} /></p>
      </div>

      <div className="contribution-map" aria-label={activitySummary}>
        <div className="contribution-grid" role="list">
          {calendar.weeks.map((week, weekIndex) => {
            const days = new Map(week.contributionDays.map((day) => [day.weekday, day]));

            return (
              <div className="contribution-week" key={`${weekIndex}-${week.contributionDays[0]?.date ?? "empty"}`} role="listitem">
                {weekdays.map((weekday, weekdayIndex) => {
                  const day = days.get(weekdayIndex);
                  return day ? (
                    <span
                      aria-label={formatDay(day, language)}
                      className="contribution-day"
                      data-level={day.contributionLevel.toLowerCase().replace("_quartile", "")}
                      key={day.date}
                      title={formatDay(day, language)}
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
          <span><Copy en="Less" id="Sedikit" /></span>
          <span className="contribution-legend" aria-hidden="true"><i /><i /><i /><i /><i /></span>
          <span><Copy en="More" id="Banyak" /></span>
          <a href={profileUrl} rel="noreferrer" target="_blank"><Copy en="View GitHub" id="Buka GitHub" /> <ArrowUpRight /></a>
        </div>
      </div>
    </section>
  );
}
