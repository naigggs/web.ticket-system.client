'use client'

import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function ForbiddenPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <AlertCircle className="h-24 w-24 text-destructive" />
          </motion.div>
        </div>  
        <h1 className="text-4xl font-bold tracking-tight">Access Forbidden</h1>
        <p className="text-xl text-muted-foreground">
          Sorry, you don't have permission to access this page.
        </p>
        <Button asChild>
            <Link href="#" onClick={() => window.history.back()}>Return to Previous Page</Link>
        </Button>
      </div>
    </div>
  );
}
