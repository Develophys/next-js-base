"use client";
import { useRouter } from "next/navigation";

import { useSession } from "next-auth/react";

import { User } from "@prisma/client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CoursesPage() {
  const router = useRouter();

  const { data: session } = useSession();

  const user = session?.user as User;

  return (
    <Card className="h-full overflow-auto">
      <CardHeader>
        <CardTitle>Courses</CardTitle>
        <CardDescription>Show all available courser for you. </CardDescription>
      </CardHeader>
      <CardContent>
        {user && user.type !== "STUDENT" && (
          <Button
            className="bg-purple-400"
            onClick={() => router.push("/courses/new-courses")}
          >
            Add a new Course
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
