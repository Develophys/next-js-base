"use client";
import { useRouter } from "next/navigation";

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

  return (
    <Card className="h-full overflow-auto">
      <CardHeader>
        <CardTitle>Courses</CardTitle>
        <CardDescription>Show all available courser for you. </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          className="bg-purple-400"
          onClick={() => router.push("/courses/new-courses")}
        >
          Add a new Course
        </Button>
      </CardContent>
    </Card>
  );
}
