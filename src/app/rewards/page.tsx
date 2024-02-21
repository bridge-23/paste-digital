"use client";

import PageWrapper from "@/components/page-wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useBackground from "@/hooks/use-background";

export default function RewardsPage() {
  useBackground();

  return (
    <PageWrapper>
      <Card>
        <CardHeader>
          <CardTitle>Rewards</CardTitle>
          <CardDescription>
            Keep checking in every day to claim exclusive rewards.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Rewards are comming soon. Keep checking in in different places to
            increase airdrop chances!
          </p>
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
