import {
  ActionBar,
  ActionBarClose,
  ActionBarGroup,
  ActionBarItem,
  ActionBarSelection,
  ActionBarSeparator,
} from 'komdes';
import { Edit, Share, Trash, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

export default function ActionBarDemo() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const clearSelection = () => setSelectedIds([]);

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full h-[350px] border border-dashed rounded-xl bg-slate-50/50 dark:bg-slate-900/50"
      ref={containerRef}
      style={{ transform: 'translateZ(0)' }}
    >
      <div className="border bg-background rounded-lg p-4 space-y-4 w-3/4 max-w-sm shadow-sm">
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="font-semibold text-lg">Documents</h3>
          <span className="text-xs text-muted-foreground">{selectedIds.length} selected</span>
        </div>
        {[1, 2, 3].map((id) => (
          <div className="flex items-center space-x-3" key={id}>
            <Checkbox
              checked={selectedIds.includes(String(id))}
              id={`doc-${id}`}
              onCheckedChange={() => toggleSelect(String(id))}
            />
            <label
              className="text-sm font-medium leading-none cursor-pointer flex-1"
              htmlFor={`doc-${id}`}
            >
              Document {id}.pdf
            </label>
          </div>
        ))}
      </div>

      {mounted && (
        <ActionBar
          onOpenChange={(open) => !open && clearSelection()}
          open={selectedIds.length > 0}
          portalContainer={containerRef.current}
        >
          <ActionBarSelection>{selectedIds.length} Selected</ActionBarSelection>
          <ActionBarSeparator />
          <ActionBarGroup>
            <ActionBarItem onClick={() => alert('Edit')}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </ActionBarItem>
            <ActionBarItem onClick={() => alert('Share')}>
              <Share className="w-4 h-4 mr-2" />
              Share
            </ActionBarItem>
            <ActionBarItem
              className="text-destructive focus:text-destructive"
              onClick={() => alert('Delete')}
            >
              <Trash className="w-4 h-4 mr-2" />
              Delete
            </ActionBarItem>
          </ActionBarGroup>
          <ActionBarSeparator />
          <ActionBarClose asChild>
            <Button className="h-8 w-8 rounded-full" size="icon" variant="ghost">
              <X className="w-4 h-4" />
            </Button>
          </ActionBarClose>
        </ActionBar>
      )}
    </div>
  );
}
