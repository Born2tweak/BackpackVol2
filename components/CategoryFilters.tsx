'use client';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'textbooks', label: 'Textbooks' },
  { id: 'electronics', label: 'Electronics' },
  { id: 'furniture', label: 'Furniture' },
  { id: 'clothing', label: 'Clothing' },
  { id: 'supplies', label: 'Supplies' },
  { id: 'sports', label: 'Sports' },
  { id: 'other', label: 'Other' },
];

interface CategoryFiltersProps {
  selected: string;
  onSelect: (category: string) => void;
}

export default function CategoryFilters({ selected, onSelect }: CategoryFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selected === cat.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
