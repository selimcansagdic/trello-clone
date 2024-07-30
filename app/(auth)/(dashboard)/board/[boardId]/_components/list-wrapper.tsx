interface ListWrapperProps {
  children: React.ReactNode;
}
export const ListWrapper = ({ children }: ListWrapperProps) => {
  return <li className="flex-shrink-0 h-4 w-[272px] select-none">{children}</li>;
};

export default ListWrapper;
