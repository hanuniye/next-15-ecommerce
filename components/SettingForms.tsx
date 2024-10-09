"use client";

import { Store } from "@prisma/client";
import { Trash } from "lucide-react";

import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface SettingFormsProps {
  store: Store;
}

const SettingForms = ({ store }: SettingFormsProps) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Settings" desc="Manage store preferences" />
        <Button variant="destructive" size="icon" onClick={() => {}}>
          <Trash className="w-4 h-4" />
        </Button>
      </div>
      <Separator />
    </>
  );
};

export default SettingForms;
