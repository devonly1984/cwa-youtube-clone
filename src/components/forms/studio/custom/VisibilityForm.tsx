import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Globe2Icon, LockIcon } from "lucide-react";

interface VisibilityFormProps {
  control: Control;
}
const VisibilityForm = ({ control }: VisibilityFormProps) => {
  return (
    <FormField
      control={control}
      name="visibility"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Visibility</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value ?? undefined}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="public">
                <div className="flex items-center">
                  <Globe2Icon className="size-4 mr-2" />
                  Public
                </div>
              </SelectItem>
              <SelectItem value="private">
                <div className="flex items-center">
                  <LockIcon className="size-4 mr-2" />
                  Private
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};
export default VisibilityForm;
