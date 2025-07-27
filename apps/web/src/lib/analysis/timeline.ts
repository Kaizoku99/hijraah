import { AIModelManager } from "@/lib/ai/models";

interface TimelineEvent {
  date: Date;
  title: string;
  description: string;
  sources: string[];
  importance: number; // 0-1
  relatedEvents: string[]; // IDs of related events
  confidence: number; // 0-1
}

interface TimelineSegment {
  startDate: Date;
  endDate: Date;
  events: TimelineEvent[];
  summary: string;
  trends: Array<{
    name: string;
    description: string;
    strength: number; // 0-1
  }>;
}

interface TimelineOptions {
  granularity: "day" | "week" | "month" | "year";
  minConfidence?: number;
  includeTrends?: boolean;
}

export class TimelineAnalyzer {
  private modelManager: AIModelManager;

  constructor(modelManager: AIModelManager) {
    this.modelManager = modelManager;
  }

  async createTimeline(
    events: TimelineEvent[],
    options: TimelineOptions,
  ): Promise<TimelineSegment[]> {
    const {
      granularity = "month",
      minConfidence = 0.5,
      includeTrends = true,
    } = options;

    // Filter events by confidence
    const filteredEvents = events.filter((e) => e.confidence >= minConfidence);

    // Sort events chronologically
    const sortedEvents = filteredEvents.sort(
      (a, b) => a.date.getTime() - b.date.getTime(),
    );

    // Group events into segments based on granularity
    const segments = this.groupEventsIntoSegments(sortedEvents, granularity);

    // Analyze each segment
    const analyzedSegments = await Promise.all(
      segments.map(async (segment) => {
        const summary = await this.generateSegmentSummary(segment.events);
        const trends = includeTrends
          ? await this.identifyTrends(segment.events)
          : [];

        return {
          ...segment,
          summary,
          trends,
        };
      }),
    );

    return analyzedSegments;
  }

  private groupEventsIntoSegments(
    events: TimelineEvent[],
    granularity: TimelineOptions["granularity"],
  ): Omit<TimelineSegment, "summary" | "trends">[] {
    if (events.length === 0) return [];

    const segments: Omit<TimelineSegment, "summary" | "trends">[] = [];
    let currentSegment: Omit<TimelineSegment, "summary" | "trends"> = {
      startDate: events[0].date,
      endDate: this.getSegmentEndDate(events[0].date, granularity),
      events: [],
    };

    for (const event of events) {
      if (event.date > currentSegment.endDate) {
        segments.push(currentSegment);
        currentSegment = {
          startDate: event.date,
          endDate: this.getSegmentEndDate(event.date, granularity),
          events: [],
        };
      }
      currentSegment.events.push(event);
    }

    segments.push(currentSegment);
    return segments;
  }

  private getSegmentEndDate(
    date: Date,
    granularity: TimelineOptions["granularity"],
  ): Date {
    const end = new Date(date);
    switch (granularity) {
      case "day":
        end.setDate(end.getDate() + 1);
        break;
      case "week":
        end.setDate(end.getDate() + 7);
        break;
      case "month":
        end.setMonth(end.getMonth() + 1);
        break;
      case "year":
        end.setFullYear(end.getFullYear() + 1);
        break;
    }
    return end;
  }

  private async generateSegmentSummary(
    events: TimelineEvent[],
  ): Promise<string> {
    const prompt = `Summarize the following events chronologically, highlighting key developments and connections:

${events
  .map(
    (e) => `Date: ${e.date.toISOString()}
Title: ${e.title}
Description: ${e.description}
Importance: ${e.importance}
`,
  )
  .join("\n---\n")}`;

    const summary = await this.modelManager.generateText(
      "gpt-4",
      [
        {
          role: "system",
          content:
            "You are a timeline analysis assistant. Create a concise summary that captures the key developments and their significance.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      {
        temperature: 0.3,
        maxTokens: 500,
      },
    );

    return summary;
  }

  private async identifyTrends(events: TimelineEvent[]): Promise<
    Array<{
      name: string;
      description: string;
      strength: number;
    }>
  > {
    const prompt = `Analyze the following events and identify key trends or patterns:

${events
  .map(
    (e) => `Date: ${e.date.toISOString()}
Title: ${e.title}
Description: ${e.description}
Importance: ${e.importance}
`,
  )
  .join("\n---\n")}

For each trend, provide:
1. Name
2. Description
3. Strength (0-1) based on prevalence and impact`;

    const result = await this.modelManager.generateText(
      "gpt-4",
      [
        {
          role: "system",
          content:
            "You are a trend analysis assistant. Identify and explain significant patterns in chronological data.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      {
        temperature: 0.3,
        maxTokens: 1000,
      },
    );

    return JSON.parse(result);
  }
}
