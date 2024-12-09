"use client";

import { Color } from "@prisma/client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(3),
  value: z.string().min(4).regex(/^#[0-9A-Fa-f]{6}$/, {
    message: "string must be valid hex code character.",
  }), //regex(/^#/) this regex is hex decimal color string
});

type ColorFormValues = z.infer<typeof formSchema>;

interface ColorFormsProps {
  initialData: Color | null;
}

const ColorForms = ({ initialData }: ColorFormsProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const params = useParams();
  const router = useRouter();

  const title = initialData ? "Edit color" : "Create color";
  const descriprion = initialData ? "Edit color" : "Add new color";
  const textMessage = initialData ? "Color updated." : "Color created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<ColorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      value: "",
      name: "",
    },
  });

  const onSubmit = async (value: ColorFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/colors/${params.colorId}`,
          value
        );
      } else {
        await axios.post(`/api/${params.storeId}/colors`, value);
      }

      router.push(`/${params.storeId}/colors`);
      router.refresh();
      toast.success(textMessage);
    } catch (error) {
      toast.error("Error creating color");
    } finally {
      setLoading(false);
    }
  };

  const deleteColor = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`);
      router.push(`/${params.storeId}/colors`);
      router.refresh();
      toast.success("color deleted.");
    } catch (error) {
      toast.error("Error deleting color");
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
        onConfirm={deleteColor}
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
                      placeholder="Color name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4">
                      <Input
                        disabled={loading}
                        placeholder="Value"
                        {...field}
                      />
                      <div
                        className="border p-4 rounded-full"
                        style={{ backgroundColor: field.value }}
                      ></div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ColorForms;
