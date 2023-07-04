import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignup } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

const UserSchema = z
  .object({
    full_name: z.string().min(3, { message: "Please enter your full name" }),
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirm: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  })
  .required()
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["password_confirm"],
  });
export type UserSchemaType = z.infer<typeof UserSchema>;

function SignupForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserSchemaType>({
    resolver: zodResolver(UserSchema),
  });

  const { signup, isLoading } = useSignup();

  const onSubmit = ({ full_name, email, password }: UserSchemaType) => {
    signup(
      { full_name, email, password },
      {
        onSettled: () => reset(),
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors.full_name?.message}>
        <Input
          type="text"
          id="full_name"
          {...register("full_name")}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label="Email address" error={errors.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email")}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register("password")}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label="Confirm password" error={errors.confirm?.message}>
        <Input
          type="password"
          id="confirm"
          {...register("confirm")}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          disabled={isLoading}
          onClick={() => reset()}
        >
          Cancel
        </Button>
        <Button disabled={isLoading}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
