// import dynamic from "next/dynamic";

// const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface MarkdownFormFieldProps {
  value?: string;
  onChange?: (value: string) => void;
}

export default function MarkdownFormField({ value = "", onChange }: MarkdownFormFieldProps) {
  return (
    <div className="w-full" data-color-mode="light">
      {/* <MDEditor
        value={value}
        onChange={(val) => onChange?.(val || '')}
        height={300}
      /> */}
      test
    </div>
  );
}
