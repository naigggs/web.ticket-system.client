import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PaginationAccounts } from "./account-pagination";
import { ManageModal } from "./manage-modal";
import { UserInfo } from "./types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";

function AccountManage() {
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const response = await fetch(`/api/user-info`);
        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      }
    }

    fetchUserInfo();
  }, []);

  const handleDeleteUser = async (userId: string) => {
    try {
      const response = await fetch("/api/user-info/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      // Remove the user from the local state to update the UI
      setUsers(users.filter((user) => user.user_id !== userId));
    } catch (err) {
      // Handle the error safely
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredUsers = users.filter((user) =>
    user.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="">
      <div className="border border-gray-300 p-4 rounded-lg h-auto flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
          <h1 className="text-2xl font-bold">Manage Users</h1>

          <div className="relative w-full sm:w-64 h-10">
            <Input
              type="search"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full h-full pl-10 pr-4 py-2 text-sm placeholder:text-gray-500 focus:ring-1"
              placeholder="Search Users..."
            />
            <Search className="absolute top-1/2 -translate-y-1/2 left-4 w-5 h-5 text-gray-400" />
          </div>
        </div>

        <div
          className="overflow-x-auto overflow-y-auto flex-1"
          style={{ maxHeight: "calc(88vh - 200px)" }}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Full Name</TableHead>

                <TableHead>Age</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentUsers.map((user) => (
                <TableRow key={user.user_id}>
                  <TableCell>{user.full_name}</TableCell>

                  <TableCell>{user.age}</TableCell>
                  <TableCell>{user.location}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <ManageModal user={user} />
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="destructive" size="sm">
                            Delete
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-60 p-6">
                          <h3 className="text-md font-semibold text-gray-900">
                            Delete User
                          </h3>
                          <div className="text-xs text-gray-600 mb-4">
                            Are you sure you want to delete this user? This
                            action cannot be undone.
                          </div>
                          <div className="flex justify-between">
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                handleDeleteUser(user.user_id);
                                document
                                  .getElementById("popover-trigger")
                                  ?.click(); // Close popover
                              }}
                            >
                              Confirm Delete
                            </Button>
                            <PopoverClose className="text-xs border p-2 rounded-md">
                              Cancel
                            </PopoverClose>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4">
          <PaginationAccounts
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default AccountManage;
