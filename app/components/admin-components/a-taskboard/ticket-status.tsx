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

// Define the status colors
const statusColors = {
  Open: "hsl(var(--chart-1))",
  Closed: "hsl(var(--chart-2))",
  "In Progress": "hsl(var(--chart-3))",
  "On Hold": "hsl(var(--chart-4))",
};

const chartConfig = {
  Open: {
    label: "Open",
    color: statusColors.Open,
  },
  Closed: {
    label: "Closed",
    color: statusColors.Closed,
  },
  "In Progress": {
    label: "In Progress",
    color: statusColors["In Progress"],
  },
  "On Hold": {
    label: "On Hold",
    color: statusColors["On Hold"],
  },
} satisfies ChartConfig;

export function TicketStatus() {
  const id = "pie-interactive";
  const [activeStatus, setActiveStatus] = React.useState("Open");

  const [tickets, setTickets] = React.useState<Tickets[]>([]);
  const [error, setError] = React.useState("");
  const [statusData, setStatusData] = React.useState<
    { status: string; count: number; fill: string }[]
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
      // Group tickets by status
      const statusCounts = tickets.reduce((acc, ticket) => {
        const status = ticket.ticket_status;
        if (acc[status]) {
          acc[status]++;
        } else {
          acc[status] = 1;
        }
        return acc;
      }, {} as Record<string, number>);

      // Generate data for the pie chart
      const statusData = Object.entries(statusCounts).map(([status, count]) => ({
        status,
        count,
        fill: statusColors[status as keyof typeof statusColors],
      }));

      setStatusData(statusData);
    }
  }, [tickets]);

  const activeIndex = React.useMemo(
    () => statusData.findIndex((item) => item.status === activeStatus),
    [activeStatus, statusData]
  );

  const statuses = React.useMemo(
    () => statusData.map((item) => item.status),
    [statusData]
  );

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Ticket Status</CardTitle>
          <CardDescription>Distribution of tickets by status</CardDescription>
        </div>
        <Select value={activeStatus} onValueChange={setActiveStatus}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Select a status"
          >
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {statuses.map((status) => {
              const config = chartConfig[status as keyof typeof chartConfig];

              if (!config) {
                return null;
              }

              return (
                <SelectItem
                  key={status}
                  value={status}
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
              data={statusData}
              dataKey="count"
              nameKey="status"
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
                          {statusData[activeIndex]?.count.toLocaleString()}
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