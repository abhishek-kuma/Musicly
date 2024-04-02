"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Dropzone from "react-dropzone";
import { useFieldArray, useForm } from "react-hook-form";
import { TbMusicPlus } from "react-icons/tb";
import { z } from "zod";

const validationSchema = z.object({
  products: z
    .array(
      z.object({
        file: z.any(),
        name: z.string().min(1, { message: "Product Name is required" }),
        description: z.string().min(1, {
          message: "Product Description is required",
        }),
        price: z.coerce.number(),
        artist: z.string().min(1, { message: "Artist Name is required" }),
        album: z.string().min(1, { message: "Album Name is required" }),
      })
    )
    .nonempty({ message: "Product is required" }),
});

type FormValues = z.infer<typeof validationSchema>;

export default function Home() {
  const form = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
    mode: "onBlur",
    defaultValues: {
      products: [],
    },
  });

  const { fields, append } = useFieldArray({
    name: "products",
    control: form.control,
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Form {...form}>
        <form
          action=""
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-1 max-w-md space-y-5"
        >
          <div className="relative products_name_price_desc">
            {fields.map((_, index) => {
              return (
                <div key={index}>
                  <div className="mt-7 mb-2 text-xl font-bold">
                    {form.getValues(`products.${index}.file.name`)}
                  </div>
                  <div className="flex gap-x-3">
                    <FormField
                      control={form.control}
                      key={index}
                      name={`products.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage className="text-red-500 capitalize" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      key={index + 1}
                      name={`products.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Description</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage className="text-red-500 capitalize" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      key={index + 2}
                      name={`products.${index}.price`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Price</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage className="text-red-500 capitalize" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      key={index + 3}
                      name={`products.${index}.artist`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Artist Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage className="text-red-500 capitalize" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      key={index + 4}
                      name={`products.${index}.album`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Album Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage className="text-red-500 capitalize" />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="relative products">
            <FormField
              control={form.control}
              name="products"
              render={() => (
                <Dropzone
                  accept={{
                    "music/*": [".mp3", ".flac", ".ogg", ".aac", ".wav"],
                  }}
                  onDropAccepted={(acceptedFiles) => {
                    acceptedFiles.map((acceptedFile) => {
                      return append({
                        file: acceptedFile,
                        name: "",
                        description: "",
                        price: 0,
                        artist: "",
                        album: "",
                      });
                    });
                  }}
                  multiple={true}
                  maxSize={5000000}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div
                      {...getRootProps({
                        className: cn(
                          "p-3 mb-4 flex flex-col items-center justify-center w-full rounded-md cursor-pointer border border-[#e2e8f0]"
                        ),
                      })}
                    >
                      <div className="flex items-center gap-x-3 mt-2 mb-2 h-60 w-50">
                        <label
                          htmlFor="Products"
                          className={`text-sm text-[7E8DA0] cursor-pointer focus:outline-none focus:underline ${
                            form.formState.errors.products && "text-red-500"
                          }`}
                          tabIndex={0}
                        >
                          <div className="flex gap-3 align-middle ">
                            Add your Music Files | Under Development
                            <TbMusicPlus className="h-5 w-5" />
                          </div>
                          <input {...getInputProps()} />
                        </label>
                      </div>
                    </div>
                  )}
                </Dropzone>
              )}
            />
          </div>
          <Button type="submit" className="!mt-0 w-full">
            Add
          </Button>
        </form>
      </Form>
    </div>
  );
}
