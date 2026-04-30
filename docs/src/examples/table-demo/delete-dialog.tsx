import type { Table } from '@tanstack/react-table';
import { ConfirmDialog } from 'komdes';
import { AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type DeleteDialogProps<TData> = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  table: Table<TData>;
};

const CONFIRM_WORD = 'DELETE';

export function DeleteDialog<TData>({ open, onOpenChange, table }: DeleteDialogProps<TData>) {
  const [value, setValue] = useState('');

  const selectedRows = table.getFilteredSelectedRowModel().rows;

  const handleDelete = () => {
    if (value.trim() !== CONFIRM_WORD) {
      alert(`Please type "${CONFIRM_WORD}" to confirm.`);
      return;
    }

    onOpenChange(false);
    alert(`Deleted ${selectedRows.length} ${selectedRows.length > 1 ? 'users' : 'user'}`);
  };

  return (
    <ConfirmDialog
      confirmText="Delete"
      desc={
        <form
          className="space-y-4"
          id="users-multi-delete-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleDelete();
          }}
        >
          <p className="mb-2">
            Are you sure you want to delete the selected users? <br />
            This action cannot be undone.
          </p>

          <Label className="my-4 flex flex-col items-start gap-1.5">
            <span className="">Confirm by typing "{CONFIRM_WORD}":</span>
            <Input
              autoFocus
              onChange={(e) => setValue(e.target.value)}
              placeholder={`Type "${CONFIRM_WORD}" to confirm.`}
              value={value}
            />
          </Label>

          <Alert variant="destructive">
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>
              Please be careful, this operation can not be rolled back.
            </AlertDescription>
          </Alert>
        </form>
      }
      destructive
      disabled={value.trim() !== CONFIRM_WORD}
      form="users-multi-delete-form"
      onOpenChange={onOpenChange}
      open={open}
      title={
        <span className="text-destructive">
          <AlertTriangle className="me-1 inline-block stroke-destructive" size={18} /> Delete{' '}
          {selectedRows.length} {selectedRows.length > 1 ? 'users' : 'user'}
        </span>
      }
    />
  );
}
