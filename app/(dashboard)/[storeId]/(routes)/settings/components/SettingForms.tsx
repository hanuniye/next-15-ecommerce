"use client";

import { Store } from "@prisma/client";
import { Trash } from "lucide-react";
import * as z from "zod";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AlertModel from "@/components/modals/AlertModel";
import ApiAlert from "@/components/ui/api-alert";
import UseOrigin from "@/hooks/UseOrigin";

interface SettingFormsProps {
  store: Store;
}

const formSchema = z.object({
  name: z.string().min(3),
});

type SettingsFormVales = z.infer<typeof formSchema>;

const SettingForms = ({ store }: SettingFormsProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const params = useParams();
  const router = useRouter();

  const origin = UseOrigin()

  const form = useForm<SettingsFormVales>({
    resolver: zodResolver(formSchema),
    defaultValues: store,
  });

  const onSubmit = async (value: SettingsFormVales) => {
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`, value);
      router.refresh();
      toast.success("Store updated.");
    } catch (error) {
      toast.error("Error creating store");
    } finally {
      setLoading(false);
    }
  };

  const deleteStore = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      router.push("/");
    } catch (error) {
      toast.error("Error deleting store");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModel
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        onConfirm={deleteStore}
      />
      <div className="flex items-center justify-between">
        <Heading title="Settings" desc="Manage store preferences" />
        <Button
          variant="destructive"
          size="icon"
          onClick={() => setOpen(true)}
          disabled={loading}
        >
          <Trash className="w-4 h-4" />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Store name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit">
            Save changes
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert descreption={`${origin}/api/${params.storeId}`} title="test" variant="public" />
    </>
  );
};

export default SettingForms;
