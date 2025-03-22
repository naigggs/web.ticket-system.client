import { TicketDone } from "@/app/components/admin-components/a-dashboard/ticket-done";
import { TicketStatus } from "@/app/components/admin-components/a-dashboard/ticket-status";
import { TicketConcern } from "@/app/components/admin-components/a-taskboard/ticket-concern";

export default function Analytics() {
  return (
    <div className="mx-4 py-4">
      <div className="flex flex-col gap-3 max-w-full">
        <div className="px-4 py-2 bg-yellow-400 rounded-2xl font-bold">
          Charts
        </div>

        {/* Grid layout for charts - 1 column on mobile, 2 columns on larger screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <TicketDone />
          <TicketStatus />
          <div className="md:col-span-2">
            <TicketConcern />
          </div>
        </div>
      </div>
    </div>
  );
}
