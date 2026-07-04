import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "../../features/authentication/useSignup";

interface SignupFormValues {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

function SignupForm() {
  const { signup, isPending } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } =
    useForm<SignupFormValues>();
  const { errors } = formState;

  function onSubmit({ fullName, email, password }: SignupFormValues) {
    signup({ fullName, email, password }, { onSettled: () => reset() });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", { required: "This Field is required." })}
        />
      </FormRow>
      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "This Field is required.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email.",
            },
          })}
        />
      </FormRow>
      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "This Field is required.",
            minLength: {
              value: 8,
              message: "Password must be atleast 8 characters long.",
            },
          })}
        />
      </FormRow>
      <FormRow
        label="Repeat password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This Field is required.",
            validate: (value) =>
              value === getValues().password || "Passwords do not match.",
          })}
        />
      </FormRow>
      <FormRow>
        <Button variation="secondary" type="reset" onClick={reset}>
          Cancel
        </Button>
        <Button disabled={isPending}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;