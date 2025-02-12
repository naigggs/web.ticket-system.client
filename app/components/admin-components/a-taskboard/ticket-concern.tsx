"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tickets } from "@/app/components/user-components/u-tickets/types";

// Define the concern type colors
const concernColors = {
  "Barangay ID": "hsl(var(--chart-1))",
  "Barangay Certificate": "hsl(var(--chart-2))",
  "Barangay Clearance": "hsl(var(--chart-3))",
  Cedula: "hsl(var(--chart-4))",
  "Barangay Indigent": "hsl(var(--chart-5))",
  "Barangay Problem": "hsl(var(--chart-6))",
};

const chartConfig = {
  "Barangay ID": {
    label: "Barangay ID",
    color: concernColors["Barangay ID"],
  },
  "Barangay Certificate": {
    label: "Barangay Certificate",
    color: concernColors["Barangay Certificate"],
  },
  "Barangay Clearance": {
    label: "Barangay Clearance",
    color: concernColors["Barangay Clearance"],
  },
  Cedula: {
    label: "Cedula",
    color: concernColors["Cedula"],
  },
  "Barangay Indigent": {
    label: "Barangay Indigent",
    color: concernColors["Barangay Indigent"],
  },
  "Barangay Problem": {
    label: "Barangay Problem",
    color: concernColors["Barangay Problem"],
  },
} satisfies ChartConfig;

export function TicketConcern() {
  const id = "pie-interactive";
  const [activeConcern, setActiveConcern] = React.useState("Barangay ID");

  const [tickets, setTickets] = React.useState<Tickets[]>([]);
  const [error, setError] = React.useState("");
  const [concernData, setConcernData] = React.useState<
    { concern: string; count: number; fill: string }[]
  >([]);

  React.useEffect(() => {
    async function fetchUserTickets() {
      try {
        const response = await fetch(`/api/tickets`);
        if (!response.ok) {
          throw new Error("Failed to fetch tickets for user");
        }
        const data = await response.json();
        setTickets(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      }
    }

    fetchUserTickets();
  }, []);

  React.useEffect(() => {
    if (tickets.length > 0) {
      // Group tickets by concern type
      const concernCounts = tickets.reduce((acc, ticket) => {
        const concern = ticket.concern_type;
        if (acc[concern]) {
          acc[concern]++;
        } else {
          acc[concern] = 1;
        }
        return acc;
      }, {} as Record<string, number>);

      // Generate data for the pie chart
      const concernData = Object.entries(concernCounts).map(([concern, count]) => ({
        concern,
        count,
        fill: concernColors[concern as keyof typeof concernColors],
      }));

      setConcernData(concernData);
    }
  }, [tickets]);

  const activeIndex = React.useMemo(
    () => concernData.findIndex((item) => item.concern === activeConcern),
    [activeConcern, concernData]
  );

  const concerns = React.useMemo(
    () => concernData.map((item) => item.concern),
    [concernData]
  );

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Ticket Concerns</CardTitle>
          <CardDescription>Distribution by concern type</CardDescription>
        </div>
        <Select value={activeConcern} onValueChange={setActiveConcern}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Select a concern type"
          >
            <SelectValue placeholder="Select concern type" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {concerns.map((concern) => {
              const config = chartConfig[concern as keyof typeof chartConfig];

              if (!config) {
                return null;
              }

              return (
                <SelectItem
                  key={concern}
                  value={concern}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-sm"
                      style={{
                        backgroundColor: config.color,
                      }}
                    />
                    {config.label}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={concernData}
              dataKey="count"
              nameKey="concern"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {concernData[activeIndex]?.count.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Tickets
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}