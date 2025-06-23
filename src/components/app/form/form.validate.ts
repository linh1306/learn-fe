import * as yup from "yup";
import { FieldOption, IOptionsField } from "./form.type";
import { FieldValues } from "react-hook-form";

type SchemaShape = Record<string, yup.Schema<any>>;

export function createSchemaYup<T extends FieldValues>(
  fields: FieldOption<T>[]
): yup.ObjectSchema<any> {
  const shape: SchemaShape = {};

  fields.forEach((field) => {
    if (field.hidden) return;

    const { name, type, options = {} } = field;
    const fieldName = String(name);

    switch (type) {
      case "text": {
        let schema = yup.string();
        const opts = options as Partial<IOptionsField["text"]>;

        if (opts.required) {
          const message =
            typeof opts.required === "object"
              ? opts.required.message
              : undefined;
          schema = schema.required(message || "Trường này không được để trống");
        }
        if (opts.min)
          schema = schema.min(
            opts.min.val,
            opts.min.message ||
              `Trường này phải có ít nhất ${opts.min.val} ký tự`
          );
        if (opts.max)
          schema = schema.max(
            opts.max.val,
            opts.max.message ||
              `Trường này không được vượt quá ${opts.max.val} ký tự`
          );
        if (opts.length)
          schema = schema.length(
            opts.length.val,
            opts.length.message || `Trường này phải có ${opts.length.val} ký tự`
          );
        if (opts.matches)
          schema = schema.matches(
            opts.matches.regex,
            opts.matches.message || `Trường này không hợp lệ`
          );
        if (opts.email) {
          const message =
            typeof opts.email === "object" ? opts.email.message : undefined;
          schema = schema.email(message || "Email không hợp lệ");
        }
        if (opts.url) {
          const message =
            typeof opts.url === "object" ? opts.url.message : undefined;
          schema = schema.url(message || "URL không hợp lệ");
        }
        if (opts.trim) {
          const message =
            typeof opts.trim === "object" ? opts.trim.message : undefined;
          schema = schema.trim(
            message || "Trường này không được có khoảng trắng đầu cuối"
          );
        }

        shape[fieldName] = schema;
        break;
      }

      case "textarea": {
        let schema = yup.string();
        const opts = options as Partial<IOptionsField["textarea"]>;

        if (opts.required) {
          const message =
            typeof opts.required === "object"
              ? opts.required.message
              : undefined;
          schema = schema.required(message || "Trường này không được để trống");
        }
        if (opts.min)
          schema = schema.min(
            opts.min.val,
            opts.min.message ||
              `Trường này phải có ít nhất ${opts.min.val} ký tự`
          );
        if (opts.max)
          schema = schema.max(
            opts.max.val,
            opts.max.message ||
              `Trường này không được vượt quá ${opts.max.val} ký tự`
          );

        shape[fieldName] = schema;
        break;
      }

      case "password": {
        let schema = yup.string();
        const opts = options as Partial<IOptionsField["password"]>;

        if (opts.required) {
          const message =
            typeof opts.required === "object"
              ? opts.required.message
              : undefined;
          schema = schema.required(message || "Trường này không được để trống");
        }
        if (opts.min)
          schema = schema.min(
            opts.min.val,
            opts.min.message ||
              `Trường này phải có ít nhất ${opts.min.val} ký tự`
          );
        if (opts.max)
          schema = schema.max(
            opts.max.val,
            opts.max.message ||
              `Trường này không được vượt quá ${opts.max.val} ký tự`
          );
        if (opts.length)
          schema = schema.length(
            opts.length.val,
            opts.length.message || `Trường này phải có ${opts.length.val} ký tự`
          );
        if (opts.matches)
          schema = schema.matches(
            opts.matches.regex,
            opts.matches.message || `Trường này không hợp lệ`
          );

        shape[fieldName] = schema;
        break;
      }

      case "number": {
        let schema = yup.number();
        const opts = options as Partial<IOptionsField["number"]>;

        if (opts.required) {
          const message =
            typeof opts.required === "object"
              ? opts.required.message
              : undefined;
          schema = schema.required(message || "Trường này không được để trống");
        }
        if (opts.min)
          schema = schema.min(
            opts.min.val,
            opts.min.message || `Giá trị phải ít nhất ${opts.min.val}`
          );
        if (opts.max)
          schema = schema.max(
            opts.max.val,
            opts.max.message || `Giá trị không được vượt quá ${opts.max.val}`
          );
        if (opts.lessThan)
          schema = schema.lessThan(
            opts.lessThan.val,
            opts.lessThan.message || `Giá trị phải nhỏ hơn ${opts.lessThan.val}`
          );
        if (opts.moreThan)
          schema = schema.moreThan(
            opts.moreThan.val,
            opts.moreThan.message || `Giá trị phải lớn hơn ${opts.moreThan.val}`
          );
        if (opts.positive) {
          const message =
            typeof opts.positive === "object"
              ? opts.positive.message
              : undefined;
          schema = schema.positive(message || "Giá trị phải là số dương");
        }
        if (opts.negative) {
          const message =
            typeof opts.negative === "object"
              ? opts.negative.message
              : undefined;
          schema = schema.negative(message || "Giá trị phải là số âm");
        }
        if (opts.integer) {
          const message =
            typeof opts.integer === "object" ? opts.integer.message : undefined;
          schema = schema.integer(message || "Giá trị phải là số nguyên");
        }

        shape[fieldName] = schema;
        break;
      }

      case "switch": {
        let schema = yup.boolean();
        const opts = options as Partial<IOptionsField["switch"]>;

        if (opts.required) {
          const message =
            typeof opts.required === "object"
              ? opts.required.message
              : undefined;
          schema = schema.required(message || "Trường này không được để trống");
        }
        if (opts.oneOf)
          schema = schema.oneOf(
            opts.oneOf.values,
            opts.oneOf.message ||
              `Giá trị phải là ${opts.oneOf.values.join(" hoặc ")}`
          );

        shape[fieldName] = schema;
        break;
      }

      case "select": {
        let schema = yup.mixed();
        const opts = options as Partial<IOptionsField["select"]>;

        if (opts.required) {
          const message =
            typeof opts.required === "object"
              ? opts.required.message
              : undefined;
          schema = schema.required(message || "Trường này không được để trống");
        }

        shape[fieldName] = schema;
        break;
      }

      case "date": {
        let schema = yup.date();
        const opts = options as Partial<IOptionsField["date"]>;

        if (opts.required) {
          const message =
            typeof opts.required === "object"
              ? opts.required.message
              : undefined;
          schema = schema.required(message || "Trường này không được để trống");
        }
        if (opts.min)
          schema = schema.min(
            new Date(opts.min.val),
            opts.min.message || `Ngày phải sau ${opts.min.val}`
          );
        if (opts.max)
          schema = schema.max(
            new Date(opts.max.val),
            opts.max.message || `Ngày phải trước ${opts.max.val}`
          );

        shape[fieldName] = schema;
        break;
      }

      case "checkbox": {
        let schema = yup.array();
        const opts = options as Partial<IOptionsField["checkbox"]>;

        if (opts.required) {
          const message =
            typeof opts.required === "object"
              ? opts.required.message
              : undefined;
          schema = schema.min(1, message || "Phải chọn ít nhất một tùy chọn");
        }

        shape[fieldName] = schema;
        break;
      }

      case "select_async": {
        let schema = null;
        const opts = options as Partial<IOptionsField["select_async"]>;

        if (opts.multiple) schema = yup.array().of(yup.string());
        else schema = yup.string();

        if (opts.required) {
          const message =
            typeof opts.required === "object"
              ? opts.required.message
              : undefined;
          schema = schema.min(1, message || "Phải chọn ít nhất một tùy chọn");
        }

        shape[fieldName] = schema;
        break;
      }

      default:
        shape[fieldName] = yup.string();
        break;
    }
  });

  return yup.object().shape(shape);
}
