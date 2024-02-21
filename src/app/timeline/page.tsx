"use client";

import PageWrapper from "@/components/page-wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useBackground from "@/hooks/use-background";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function TimelinePage() {
  useBackground();

  return (
    <PageWrapper>
      <Card>
        <CardHeader>
          <CardTitle>Timeline</CardTitle>
          <CardDescription>Your check-ins on day to day basis</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="me" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="me">Me</TabsTrigger>
              <TabsTrigger value="friends">Friends</TabsTrigger>
            </TabsList>
            <TabsContent value="me">
              <TimelinePlaceHolder />
            </TabsContent>
            <TabsContent value="friends">
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

function TimelinePlaceHolder() {
  return (
    <div className="flex-1 border-t border-b">
      <div className="container flex flex-col gap-4 py-6 mx-auto">
        <div className="flex flex-col md:flex-row gap-4 px-4">
          <div className="flex items-center space-x-4">
            <div className="rounded-full overflow-hidden border-2 border-white w-12 h-12"></div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">Miami Beach</h3>
              <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                2023-08-12 14:32
              </p>
            </div>
          </div>
          <div className="flex-1 grid w-full min-w-0">
            <p className="text-sm font-normal leading-relaxed text-gray-500 dark:text-gray-400">
              Beautiful sunny day at the beach. Water was warm and crystal
              clear.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 px-4">
          <div className="flex items-center space-x-4">
            <div className="rounded-full overflow-hidden border-2 border-white w-12 h-12"></div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">Central Perk Cafe</h3>
              <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                2023-09-28 10:15
              </p>
            </div>
          </div>
          <div className="flex-1 grid w-full min-w-0">
            <p className="text-sm font-normal leading-relaxed text-gray-500 dark:text-gray-400">
              Enjoyed a cup of coffee and the cozy atmosphere. Best place to
              people-watch.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 px-4">
          <div className="flex items-center space-x-4">
            <div className="rounded-full overflow-hidden border-2 border-white w-12 h-12"></div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">Golden Gate Bridge</h3>
              <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                2023-10-15 16:45
              </p>
            </div>
          </div>
          <div className="flex-1 grid w-full min-w-0">
            <p className="text-sm font-normal leading-relaxed text-gray-500 dark:text-gray-400">
              Incredible views of the bridge and the city. Perfect spot for
              sunset photos.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 px-4">
          <div className="flex items-center space-x-4">
            <div className="rounded-full overflow-hidden border-2 border-white w-12 h-12"></div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">Sushi Heaven</h3>
              <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                2023-11-02 19:20
              </p>
            </div>
          </div>
          <div className="flex-1 grid w-full min-w-0">
            <p className="text-sm font-normal leading-relaxed text-gray-500 dark:text-gray-400">
              Delicious and fresh sushi. The chef's special rolls were amazing.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 px-4">
          <div className="flex items-center space-x-4">
            <div className="rounded-full overflow-hidden border-2 border-white w-12 h-12"></div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">Starlight Observatory</h3>
              <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                2023-12-19 21:10
              </p>
            </div>
          </div>
          <div className="flex-1 grid w-full min-w-0">
            <p className="text-sm font-normal leading-relaxed text-gray-500 dark:text-gray-400">
              Stargazing on a clear night. Saw shooting stars and the rings of
              Saturn through the telescope.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
