import React, { useState, useEffect } from "react";
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
import { signup, declineUser } from "@/app/api/auth/actions";
import { Accounts } from "./types";

function AccountRequest() {
  const [searchTerm, setSearchTerm] = useState("");
  const [accounts, setAccounts] = useState<Accounts[]>([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    async function fetchUserRequests() {
      try {
        const response = await fetch(`/api/user-requests`);
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

    fetchUserRequests();
  }, []);

  const filteredAccounts = accounts.filter((account) =>
    account.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);

  const currentAccounts = filteredAccounts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleAccept = async (account: Accounts) => {
    try {
      const formData = new FormData();
      formData.append("email", account.email);
      formData.append("password", account.password); // Replace with actual logic to generate/set password

      await signup(formData);
      alert("Account successfully created!");

      // Optionally remove the accepted account from the table
      setAccounts((prevAccounts) =>
        prevAccounts.filter((item) => item.id !== account.id)
      );
    } catch (err) {
      console.error("Error creating account:", err);
      alert("Failed to accept account. Please try again.");
    }
  };

  const handleDecline = async (account: Accounts) => {
    try {
      const formData = new FormData();
      formData.append("email", account.email);

      await declineUser(formData); // Call the imported declineUser function
      alert("Account has been declined!");

      // Optionally remove the declined account from the table
      setAccounts((prevAccounts) =>
        prevAccounts.filter((item) => item.id !== account.id)
      );
    } catch (err) {
      console.error("Error declining account:", err);
      alert("Failed to decline account. Please try again.");
    }
  };

  return (
    <div className="">
      <div className="border border-gray-300 p-4 rounded-lg h-auto flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
          <h1 className="text-2xl font-bold">Account Requests</h1>

          <div className="relative w-full sm:w-64 h-10">
            <Input
              type="search"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
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
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentAccounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell>{account.full_name}</TableCell>
                  <TableCell>{account.email}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAccept(account)}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDecline(account)} // Call the decline function on click
                      >
                        Decline
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

export default AccountRequest;
