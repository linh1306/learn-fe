import { useEffect, useState } from "react";
import { IOptionsField } from "../form.type";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useDebounce } from "use-debounce";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useApiGetTopics } from "@/api/topics/topics";
import { TopicsDto } from "@/model";

const selectAsyncOption = {
  topic: {
    hook: useApiGetTopics,
    renderLabel: (topic: TopicsDto) => topic.name,
  },
} as const;

export type SelectAsyncType = keyof typeof selectAsyncOption;

interface SelectAsyncFieldProps extends Partial<IOptionsField["select_async"]> {
  type: SelectAsyncType;
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  disabled?: boolean;
  placeholder?: string;
  multiple?: boolean; // Tùy chọn để chọn nhiều hay một
}

export default function SelectAsyncField({
  type,
  value,
  onChange,
  disabled = false,
  placeholder = "Select",
  multiple = false,
}: SelectAsyncFieldProps) {
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    []
  );
  const [searchValue, setSearchValue] = useState("");
  const [search] = useDebounce(searchValue, 500);
  const [open, setOpen] = useState(false);
  const { data, isPending } = selectAsyncOption[type].hook({ search });

  // Normalize value để luôn làm việc với array
  const normalizedValue = Array.isArray(value) ? value : value ? [value] : [];

  useEffect(() => {
    if (data?.data) {
      setOptions(
        data.data.map((item) => ({
          value: item.id,
          label: selectAsyncOption[type].renderLabel(item) || "",
        }))
      );
    }
  }, [data, type]);

  const handleSearch = (query: string) => {
    setSearchValue(query);
  };

  const handleSelect = (selectedValue: string) => {
    if (multiple) {
      // Chế độ multi-select
      const newValue = normalizedValue.includes(selectedValue)
        ? normalizedValue.filter((v) => v !== selectedValue)
        : [...normalizedValue, selectedValue];

      onChange?.(newValue);
    } else {
      // Chế độ single-select
      const newValue = normalizedValue.includes(selectedValue)
        ? ""
        : selectedValue;
      onChange?.(newValue);
      setOpen(false); // Đóng popover sau khi chọn trong chế độ single
    }
  };

  const handleRemove = (valueToRemove: string) => {
    if (multiple) {
      const newValue = normalizedValue.filter((v) => v !== valueToRemove);
      onChange?.(newValue);
    } else {
      onChange?.("");
    }
  };

  const selectedOptions = options.filter((option) =>
    normalizedValue.includes(option.value)
  );

  const renderSelectedContent = () => {
    if (selectedOptions.length === 0) {
      return <span className="text-muted-foreground">{placeholder}</span>;
    }

    if (multiple) {
      // Hiển thị badges cho multi-select
      return (
        <div className="flex flex-wrap gap-1">
          {selectedOptions.map((option) => (
            <Badge key={option.value} variant="secondary" className="px-2 py-1">
              {option.label}
              {!disabled && (
                <X
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(option.value);
                  }}
                  className="h-3 w-3"
                />
              )}
            </Badge>
          ))}
        </div>
      );
    } else {
      // Hiển thị text đơn giản cho single-select
      return (
        <div className="flex items-center justify-between w-full">
          <span>{selectedOptions[0]?.label}</span>
          {!disabled && selectedOptions.length > 0 && (
            <X
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(selectedOptions[0].value);
              }}
              className="h-3 w-3"
            />
          )}
        </div>
      );
    }
  };

  return (
    <div className="w-full space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            disabled={disabled}
          >
            {renderSelectedContent()}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput
              placeholder="Tìm kiếm..."
              value={searchValue}
              onValueChange={handleSearch}
            />
            <CommandList>
              {isPending && (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="ml-2">Đang tải...</span>
                </div>
              )}
              {!isPending && options.length === 0 && (
                <CommandEmpty>Không tìm thấy kết quả.</CommandEmpty>
              )}
              {!isPending && options.length > 0 && (
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={() => handleSelect(option.value)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          normalizedValue.includes(option.value)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
