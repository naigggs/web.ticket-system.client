"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { Tickets } from "@/app/components/user-components/u-tickets/types";

const chartConfig = {
  tickets: {
    label: "Tickets",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function TicketDone() {
  const [tickets, setTickets] = useState<Tickets[]>([]);
  const [error, setError] = useState("");
  const [chartData, setChartData] = useState<
    { month: string; tickets: number }[]
  >([]);

  useEffect(() => {
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

  useEffect(() => {
    if (tickets.length > 0) {
      const currentDate = new Date();
      const fiveMonthsAgo = new Date();
      fiveMonthsAgo.setMonth(currentDate.getMonth() - 4); // Last 5 months (including current month)

      // Filter tickets created in the last 5 months with status "Closed"
      const filteredTickets = tickets.filter((ticket) => {
        const ticketDate = new Date(ticket.created_at);
        return (
          ticketDate >= fiveMonthsAgo &&
          ticketDate <= currentDate &&
          ticket.ticket_status === "Closed"
        );
      });

      const ticketCountsByMonth: { [key: string]: number } = {};

      // Count tickets by month
      filteredTickets.forEach((ticket) => {
        const ticketDate = new Date(ticket.created_at);
        const month = ticketDate.toLocaleString("default", { month: "long" });
        if (ticketCountsByMonth[month]) {
          ticketCountsByMonth[month]++;
        } else {
          ticketCountsByMonth[month] = 1;
        }
      });

      // Generate chart data for the last 5 months
      const chartData = [];
      for (let i = 0; i < 5; i++) {
        const date = new Date();
        date.setMonth(currentDate.getMonth() - i);
        const month = date.toLocaleString("default", { month: "long" });
        chartData.unshift({
          month,
          tickets: ticketCountsByMonth[month] || 0,
        });
      }

      setChartData(chartData);
    }
  }, [tickets]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Closed Tickets</CardTitle>
        <CardDescription>Last 5 Months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="tickets" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total closed tickets in the last 5 months
        </div>
      </CardFooter>
    </Card>
  );
}