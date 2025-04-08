import { videoUpdateSchema } from "@/db/schema"
import { Control, FieldPath } from "react-hook-form"
import { z } from "zod"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface CustomTextsProps {
  control: Control;
  name: FieldPath<z.infer<typeof videoUpdateSchema>>;
  label: string;
  placeholder: string;
  type: string;
}
const CustomTexts = ({
  control,
  name,
  label,
  placeholder,
  type
}: CustomTextsProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {type === "text" ? (
              <Input placeholder={placeholder} {...field} />
            ) : (
              <Textarea
                {...field}
                value={field.value ?? ""}
                rows={10}
                className="resize-none pr-10"
                placeholder={placeholder}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export default CustomTexts