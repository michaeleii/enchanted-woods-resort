import { ChangeEvent, FormEvent, useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const {
    user: { email, user_metadata: { full_name: currentFullName } } = {} as any,
  } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();
  const [fullName, setFullName] = useState<string>(currentFullName);
  const [avatar, setAvatar] = useState<File | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    updateUser(
      { full_name: fullName as string, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          if (e.currentTarget) e.currentTarget.reset();
        },
      }
    );
  }
  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          disabled={isUpdating}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFullName(e.target.value)
          }
          id="fullName"
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          disabled={isUpdating}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (!e.target.files) return;
            setAvatar(e.target.files[0]);
          }}
        />
      </FormRow>
      <FormRow>
        <Button
          type="reset"
          variation="secondary"
          disabled={isUpdating}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
