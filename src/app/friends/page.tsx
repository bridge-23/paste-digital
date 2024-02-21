"use client";

import PageWrapper from "@/components/page-wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useBackground from "@/hooks/use-background";
import { TabsContent } from "@radix-ui/react-tabs";

export default function FriendsPage() {
  useBackground();

  return (
    <PageWrapper>
      <Card>
        <CardHeader>
          <CardTitle>Friends</CardTitle>
          <CardDescription>
            Be Social and earn even more rewards!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="friends" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="friends">Friends</TabsTrigger>
              <TabsTrigger value="requests">Requests</TabsTrigger>
            </TabsList>
            <TabsContent value="friends">
              <CardDescription className="mt-4">
                You dont have any friends yet
              </CardDescription>
            </TabsContent>
            <TabsContent value="requests">
              <CardDescription className="mt-4">
                You dont have any outstanding friend requests
              </CardDescription>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
