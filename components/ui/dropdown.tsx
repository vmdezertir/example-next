import Image from 'next/image';

export interface IDropdownProps {
  label: string;
  items: string[];
}

export const Dropdown = ({ label, items }: IDropdownProps) => {
  return (
    <div className="relative">
      <div className="inline-flex items-center overflow-hidden rounded-md border bg-white">
        <a href="#" className="border-e px-4 py-2 text-sm/none text-gray-600 hover:bg-gray-50 hover:text-gray-700">
          {label}
        </a>
        <button className="h-full p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-700">
          <span className="sr-only">Menu</span>
          <Image src="/chevron-down.svg" alt="chevron down icon" />
        </button>
      </div>

      <div className="absolute end-0 z-10 mt-2 w-56 rounded-md border border-gray-100 bg-white shadow-lg" role="menu">
        <div className="p-2">
          {items.map((item, index) => (
            <a
              href="#"
              className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              role="menuitem"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
