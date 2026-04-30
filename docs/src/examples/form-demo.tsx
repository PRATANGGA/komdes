import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput, FormInputGroup, FormInputPassword, FormRadioGroup, FormSwitch } from 'komdes';
import { Link2Icon, SparklesIcon, ZapIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

const formSchema = z.object({
  notifications: z.boolean(),
  password: z.string().min(10),
  plan: z.enum(['free', 'pro']),
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  website: z.url('Must be a valid URL').optional().or(z.literal('')),
});

type FormData = z.infer<typeof formSchema>;

const PLANS = [
  { icon: SparklesIcon, id: 'free', label: 'Free', sub: 'Forever' },
  { icon: ZapIcon, id: 'pro', label: 'Pro', sub: '$9 / month' },
] as const;

export default function FormDemo() {
  const [formLayout, setFormLayout] = useState<'vertical' | 'horizontal'>('vertical');

  const form = useForm<FormData>({
    defaultValues: {
      notifications: true,
      password: '',
      plan: 'free',
      username: '',
      website: '',
    },
    mode: 'onChange',
    resolver: zodResolver(formSchema),
  });

  const onSubmit = () => {};

  const onError = () => {};

  return (
    <div className="flex flex-col items-center w-full max-w-sm space-y-6 mx-auto">
      <div className="flex items-center space-x-1 bg-secondary/60 p-1 rounded-lg w-full">
        <button
          className={`flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
            formLayout === 'vertical'
              ? 'bg-background shadow-sm text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setFormLayout('vertical')}
          type="button"
        >
          Vertical Layout
        </button>
        <button
          className={`flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
            formLayout === 'horizontal'
              ? 'bg-background shadow-sm text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setFormLayout('horizontal')}
          type="button"
        >
          Horizontal Layout
        </button>
      </div>

      <Form {...form}>
        <form className="space-y-6 w-full" onSubmit={form.handleSubmit(onSubmit, onError)}>
          <div className="space-y-4">
            <FormInput
              control={form.control}
              inputProps={{ placeholder: 'e.g. johndoe' }}
              label="Username"
              labelClassName="sm:w-[120px]"
              layout={formLayout}
              name="username"
            />
            <FormInputPassword
              control={form.control}
              inputProps={{ placeholder: 'xxxxxx' }}
              label="Password"
              labelClassName="sm:w-[120px]"
              layout={formLayout}
              name="password"
            />

            <FormInputGroup
              addon={<Link2Icon className="w-4 h-4 text-muted-foreground" />}
              control={form.control}
              inputGroupProps={{ placeholder: 'https://example.com', type: 'url' }}
              label="Website"
              labelClassName="sm:w-[120px]"
              layout={formLayout}
              name="website"
            />
          </div>

          <FormRadioGroup
            control={form.control}
            label="Subscription Plan"
            labelClassName="sm:w-[120px]"
            layout={formLayout}
            name="plan"
            options={PLANS}
            radioGroupProps={{ className: 'grid grid-cols-2 gap-4' }}
          />

          <FormSwitch
            control={form.control}
            description="Receive updates and alerts about your account"
            label="Enable notifications"
            layout={formLayout === 'horizontal' ? 'inline' : 'default'}
            name="notifications"
          />

          <Button className="w-full" type="submit">
            Save Changes
          </Button>
        </form>
      </Form>
    </div>
  );
}
