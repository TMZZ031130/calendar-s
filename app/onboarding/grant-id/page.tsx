import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarCheck2 } from "lucide-react";
import Link from "next/link";

const OnboardingrouteTwo = () => {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>You are almost Done!</CardTitle>
          <CardDescription>
            We have to now connect your calendar to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link href="/">
              <CalendarCheck2 className="size-4 mr-2" />
              Connect Calendar to your Account
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingrouteTwo;
