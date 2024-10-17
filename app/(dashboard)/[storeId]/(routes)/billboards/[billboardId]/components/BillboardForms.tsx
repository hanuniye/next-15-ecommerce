"use client";

import { Billboard } from "@prisma/client";
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
import ImageUpload from "@/components/ui/ImageUpload";

const formSchema = z.object({
  label: z.string().min(3),
  imageUrl: z.string().min(3),
});

type BillboardFormVales = z.infer<typeof formSchema>;

interface SettingFormsProps {
  initialData: Billboard | null;
}

const BillboardForms = ({ initialData }: SettingFormsProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const params = useParams();
  const router = useRouter();

  const title = initialData ? "Edit billboard" : "Create billboard";
  const descriprion = initialData ? "Edit billboard" : "Add new billboard";
  const textMessage = initialData ? "Billboard updated." : "Billboard created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<BillboardFormVales>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (value: BillboardFormVales) => {
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
        <Heading title={title} desc={descriprion} />
        {initialData && (
          <Button
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
            disabled={loading}
          >
            <Trash className="w-4 h-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Billboard label"
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
    </>
  );
};

export default BillboardForms;
