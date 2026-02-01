type HeaderProp = {
  children: React.ReactNode;
};

export function Header({ children }: HeaderProp) {
  return <h1>{children}</h1>;
}
