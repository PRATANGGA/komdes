import { createFileRoute } from '@tanstack/react-router';
import { NotFoundError } from '@/error/not-found-error';

export const Route = createFileRoute('/(errors)/404')({
  component: NotFoundError,
});
