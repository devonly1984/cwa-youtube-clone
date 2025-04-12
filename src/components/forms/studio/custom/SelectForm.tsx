"use client";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

import { SelectTrigger } from "@radix-ui/react-select";
import { trpc } from "@/trpc/client";
interface SelectFormProps {
  control: Control;
}
const SelectForm = ({ control }: SelectFormProps) => {
    const [categories] = trpc.categories.getMany.useSuspenseQuery();
  return (
    <FormField
      control={control}
      name="categoryId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Category</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value ?? undefined}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};
export default SelectForm;
