import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { cn } from "@/lib/utils";

import { FieldOption, FormBuilderProps } from "./form.type";
import { useEffect, useMemo } from "react";
import { createSchemaYup } from "./form.validate";
import { useForm, Controller, FieldValues, Control } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import SelectAsyncField from "./customField/selectAsync.cpn";
// import SelectAsyncField from "./customField/selectAsync.cpn";

function renderField<T extends FieldValues>(
  control: Control<T>,
  field: FieldOption<T>
) {
  const { type, placeholder, options, disabled, name } = field;

  if (field.render) {
    return field.render(field, control);
  }

  return (
    <div className="flex flex-col">
      <Controller
        name={name}
        control={control}
        render={({ field: controllerField, fieldState: { error } }) => {
          switch (type) {
            case "text":
              return (
                <Input
                  {...controllerField}
                  placeholder={placeholder}
                  disabled={disabled}
                  className={`w-full ${error ? "border-red-500" : ""}`}
                />
              );

            case "textarea":
              return (
                <Textarea
                  {...controllerField}
                  rows={4}
                  placeholder={placeholder}
                  disabled={disabled}
                  className={`w-full ${error ? "border-red-500" : ""}`}
                />
              );

            case "number":
              return (
                <Input
                  {...controllerField}
                  type="number"
                  placeholder={placeholder}
                  disabled={disabled}
                  className={`w-full ${error ? "border-red-500" : ""}`}
                  onChange={(e) =>
                    controllerField.onChange(
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                />
              );

            case "select":
              return (
                <Select
                  value={controllerField.value?.toString()}
                  onValueChange={controllerField.onChange}
                  disabled={disabled}
                >
                  <SelectTrigger
                    className={`w-full ${error ? "border-red-500" : ""}`}
                  >
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {options?.options?.map((option) => (
                      <SelectItem
                        key={option.value.toString()}
                        value={option.value.toString()}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              );

            case "date":
              return (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !controllerField.value && "text-muted-foreground",
                        error && "border-red-500"
                      )}
                      disabled={disabled}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {controllerField.value ? (
                        format(controllerField.value, "dd/MM/yyyy", {
                          locale: vi,
                        })
                      ) : (
                        <span>{placeholder || "Chọn ngày"}</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={controllerField.value}
                      onSelect={controllerField.onChange}
                      disabled={disabled}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              );

            case "switch":
              return (
                <Switch
                  checked={controllerField.value}
                  onCheckedChange={controllerField.onChange}
                  disabled={disabled}
                />
              );

            case "checkbox":
              return (
                <div className="flex flex-col space-y-2">
                  {options?.options?.map((option) => (
                    <div
                      key={option.value.toString()}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`${String(name)}-${option.value}`}
                        checked={controllerField.value?.includes(option.value)}
                        onCheckedChange={(checked) => {
                          const currentValue = controllerField.value || [];
                          if (checked) {
                            controllerField.onChange([
                              ...currentValue,
                              option.value,
                            ]);
                          } else {
                            controllerField.onChange(
                              currentValue.filter(
                                (v: any) => v !== option.value
                              )
                            );
                          }
                        }}
                        disabled={disabled}
                      />
                      <Label htmlFor={`${String(name)}-${option.value}`}>
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              );

            case "password":
              return (
                <Input
                  {...controllerField}
                  type="password"
                  placeholder={placeholder}
                  disabled={disabled}
                  className={`w-full ${error ? "border-red-500" : ""}`}
                />
              );

            case "select_async":
              return (
                <SelectAsyncField
                  type={options?.type ?? "topic"}
                  value={controllerField.value}
                  onChange={controllerField.onChange}
                  disabled={disabled}
                />
              );

            default:
              return (
                <Input
                  {...controllerField}
                  placeholder={placeholder}
                  disabled={disabled}
                  className={`w-full ${error ? "border-red-500" : ""}`}
                />
              );
          }
        }}
      />
    </div>
  );
}

function renderGridFormItems<T extends FieldValues>(
  control: Control<T>,
  fields: FieldOption<T>[],
  errors: any
) {
  return fields.map((field) => {
    if (field.hidden) return null;

    const colClasses = useMemo(() => {
      if (field.grid && typeof field.grid === "number") {
        const span = field.grid;
        return `col-span-${Math.min(span, 12)}`;
      }

      if (field.grid && typeof field.grid === "object") {
        const { xs = 12, sm, md = 6, lg = 6 } = field.grid;
        return `col-span-${xs} ${sm ? `sm:col-span-${sm}` : ""} ${
          md ? `md:col-span-${md}` : ""
        } ${lg ? `lg:col-span-${lg}` : ""}`.trim();
      }

      return "col-span-12 md:col-span-6";
    }, [field.grid]);

    const fieldName = String(field.name);
    const error = errors[fieldName];

    return (
      <div key={fieldName} className={colClasses}>
        <div className="space-y-2">
          <Label htmlFor={fieldName}>{field.label}</Label>
          {renderField(control, field)}
          {error && <p className="text-sm text-red-500">{error.message}</p>}
        </div>
      </div>
    );
  });
}

export default function FormBuilder<T extends FieldValues>(
  props: FormBuilderProps<T>
): React.ReactElement {
  const {
    fields,
    onSubmit,
    onCancel,
    defaultValues,
    ref,
    button,
    loading = false,
    gridGutter = "gap-4",
  } = props;

  const schema = createSchemaYup(fields);

  const form = useForm<T>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues as any,
    mode: "onChange",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  useEffect(() => {
    if (ref) {
      ref.current = form;
    }
  }, [ref, form]);

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues as any);
    }
  }, [defaultValues, reset]);

  const handleFormSubmit = (values: T) => {
    onSubmit(values);
  };

  const getButtonAlignment = () => {
    switch (button?.position) {
      case "start":
        return "justify-start";
      case "center":
        return "justify-center";
      case "end":
      default:
        return "justify-end";
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className={`grid grid-cols-12 ${gridGutter}`}>
        {renderGridFormItems(control, fields, errors)}
      </div>

      {button && (
        <div className={`flex ${getButtonAlignment()} gap-3`}>
          {button?.cancel && onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              {button.cancel}
            </Button>
          )}
          {button?.ok && (
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {button.ok}
            </Button>
          )}
        </div>
      )}
    </form>
  );
}
