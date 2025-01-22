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
import { Accounts } from "./types";

function AccountManage() {
  const [accounts, setAccounts] = useState<Accounts[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(`/api/auth`);
        if (!response.ok) {
          throw new Error("Failed to fetch tickets for user");
        }
        const data = await response.json();
        setAccounts(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      }
    }

    fetchUsers();
  }, []);

  console.log(accounts);

  const [searchTerm, setSearchTerm] = useState("");
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter accounts based on search term
  const filteredAccounts = accounts.filter(
    (account) =>
    //   account.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);

  // Get the current page's accounts
  const currentAccounts = filteredAccounts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle pagination navigation
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="">
      <div className="border border-gray-300 p-4 rounded-lg h-auto flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
          <h1 className="text-2xl font-bold">Manage Accounts</h1>

          <div className="relative w-full sm:w-64 h-10">
            <Input
              type="search"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to the first page when searching
              }}
              className="w-full h-full pl-10 pr-4 py-2 text-sm placeholder:text-gray-500 focus:ring-1"
              placeholder="Search Accounts..."
            />
            <Search className="absolute top-1/2 -translate-y-1/2 left-4 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Table Container */}
        <div
          className="overflow-x-auto overflow-y-auto flex-1"
          style={{ maxHeight: "calc(88vh - 200px)" }}
        >
          <Table>
            <TableHeader>
              <TableRow>
                {/* <TableHead>Name</TableHead> */}
                <TableHead>Email</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentAccounts.map((account) => (
                <TableRow key={account.id}>
                  {/* <TableCell>{account.full_name}</TableCell> */}
                  <TableCell>{account.email}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
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
