"use client";

import { useState, useMemo } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ContentCard } from "./ContentCard";
import { ContentItem } from "@/types";
import { GripVertical } from "lucide-react";

// Wrapper for individual sortable cards
function SortableCard({ content }: { content: ContentItem }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: content.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute -top-3 -left-3 z-50 flex h-8 w-8 cursor-grab items-center justify-center rounded-full bg-slate-800 dark:bg-accent-base text-white shadow-lg opacity-0 group-hover/card:opacity-100 transition-opacity hover:scale-110 active:cursor-grabbing"
        title="Drag to reorder"
      >
        <GripVertical size={16} />
      </div>

      {/* We pass a special class to ContentCard to enable group hover */}
      <div className="group/card">
        <ContentCard content={content} />
      </div>
    </div>
  );
}

interface DraggableFeedProps {
  items: ContentItem[];
}

export function DraggableFeed({ items }: DraggableFeedProps) {
  // Initialize order based on incoming items
  const [orderedItems, setOrderedItems] = useState<ContentItem[]>(items);

  // Update ordered items if the source items change (e.g., new search results)
  useMemo(() => {
    // Simple reconciliation: keep existing order if items are the same, else reset
    const currentIds = new Set(orderedItems.map((i) => i.id));
    const newIds = new Set(items.map((i) => i.id));

    if (
      currentIds.size !== newIds.size ||
      ![...currentIds].every((id) => newIds.has(id))
    ) {
      setOrderedItems(items);
    }
  }, [items]); // eslint-disable-line react-hooks/exhaustive-deps

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }), // Prevents accidental drags on click
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setOrderedItems((prevItems) => {
        const oldIndex = prevItems.findIndex((item) => item.id === active.id);
        const newIndex = prevItems.findIndex((item) => item.id === over.id);
        return arrayMove(prevItems, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={orderedItems.map((i) => i.id)}
        strategy={rectSortingStrategy}
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {orderedItems.map((item) => (
            <SortableCard key={item.id} content={item} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
