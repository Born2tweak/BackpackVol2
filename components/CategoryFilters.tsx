'use client';

const categories = [
  { id: 'all', name: 'All Items' },
  { id: 'textbooks', name: 'Textbooks' },
  { id: 'electronics', name: 'Electronics' },
  { id: 'furniture', name: 'Furniture' },
  { id: 'clothing', name: 'Clothing' },
  { id: 'supplies', name: 'School Supplies' },
  { id: 'sports', name: 'Sports & Fitness' },
  { id: 'other', name: 'Other' },
];

interface CategoryFiltersProps {
  selected: string;
  onSelect: (category: string) => void;
}

export default function CategoryFilters({ selected, onSelect }: CategoryFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelect(category.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selected === category.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
