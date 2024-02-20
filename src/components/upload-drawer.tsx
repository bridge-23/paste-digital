import { LocationSelect } from "./location-select";
import { Button } from "./ui/button";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function UploadDrawer() {
  return (
    <DrawerContent>
      <div className="mx-auto w-full max-w-sm">
        <DrawerHeader>
          <DrawerTitle>Check In</DrawerTitle>
          <DrawerDescription>Upload your receipt to check in</DrawerDescription>
        </DrawerHeader>
        <div className="grid w-full max-w-sm items-center gap-1.5 p-4">
          <div>
            <LocationSelect />
          </div>
          <div>
            <Label htmlFor="picture">Picture</Label>
            <Input id="picture" type="file" />
          </div>
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  );
}
