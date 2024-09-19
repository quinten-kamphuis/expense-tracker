import { FieldApi, useForm } from '@tanstack/react-form';
import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { api } from '@/lib/api';

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em>{field.state.meta.errors.join(',')}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  );
}

const CreateExpense = () => {
  const form = useForm({
    defaultValues: {
      title: '',
      amount: 0,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      await api.expenses.$post({
        json: value,
      });
    },
    validatorAdapter: zodValidator(),
  });

  return (
    <main className="flex h-svh flex-col items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Create expense</CardTitle>
          <CardDescription>
            Enter the details of the expense you'd like to create
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={e => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <div>
              <form.Field
                name="title"
                validators={{
                  onChange: z
                    .string()
                    .min(3, 'Title must be at least 3 characters'),
                }}
                children={field => (
                  <>
                    <Label htmlFor={field.name}>Title:</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={e => field.handleChange(e.target.value)}
                    />
                    <FieldInfo field={field} />
                  </>
                )}
              />
            </div>
            <div>
              <form.Field
                name="amount"
                validators={{
                  onChange: z.coerce.number().min(1),
                }}
                children={field => (
                  <>
                    <Label htmlFor={field.name}>Amount:</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={e =>
                        field.handleChange(parseInt(e.target.value))
                      }
                    />
                    <FieldInfo field={field} />
                  </>
                )}
              />
            </div>
            <form.Subscribe
              selector={state => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button type="submit" disabled={!canSubmit}>
                  {isSubmitting ? '...' : 'Submit'}
                </Button>
              )}
            />
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export const Route = createFileRoute('/create-expense')({
  component: CreateExpense,
});
