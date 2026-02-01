import { Form } from "react-bootstrap";

type DropdownProps<T extends string> = {
  value: T;
  onChange: (value: T) => void;
  options: readonly T[];
};

export function Dropdown<T extends string>({
  value,
  onChange,
  options,
}: DropdownProps<T>) {
  return (
    <Form.Select
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      className="w-50"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt[0].toUpperCase() + opt.slice(1)}
        </option>
      ))}
    </Form.Select>
  );
}

// function Dropdown({ value, onChange }: SizeProps) {
//   return (
//     <div className="form-container">
//       <Form.Select
//         value={value}
//         onChange={(e) => onChange(e.target.value as Size)}
//       >
//         {SIZE_OPTIONS.map((s, i) => (
//           <option key={i} value={s}>
//             {s[0].toUpperCase() + s.slice(1)}
//           </option>
//         ))}
//       </Form.Select>
//     </div>
//   );
// }

// export default Dropdown;

/* 

More complex but safer way to guarantee that v is Size (type predicate) 
- "If this function returns true, then inside this block you can treat v as a Size."
- Teaching compiler how to narrow a type.
- Good for values that come from APIs, Dynamic lists, User input, runtime validation + safety.

*/

// const isSize = (v: string) => v === "small" || v === "medium" || v === "large";

// function Dropdown({ value, onChange }: SizeProps) {
//   return (
//     <div className="form-container">
//       <Form.Select
//         value={value}
//         onChange={(e) => {
//           const v = e.target.value;
//           if (isSize(v)) onChange(v);
//         }}
//       >
//         <option value="large">Large</option>
//         <option value="medium">Medium</option>
//         <option value="small">Small</option>
//       </Form.Select>
//     </div>
//   );
// }

// export default Dropdown;
