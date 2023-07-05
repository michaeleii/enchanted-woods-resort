import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import CabinData from "../../interfaces/CabinData";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

const CabinSchema = z
  .object({
    name: z.string({ required_error: "This field is required" }),
    maxCapacity: z
      .number({ required_error: "This field is required" })
      .min(1, { message: "Capacity should be atleast 1" }),
    regularPrice: z
      .number({ required_error: "This field is required" })
      .min(1, { message: "Regular price should be atleast $1" }),
    discount: z.number({ required_error: "This field is required" }).min(0),
    description: z.optional(z.string()),
    image: z.any().optional(),
  })
  .refine((data) => data.discount < data.regularPrice, {
    message: "Discount should be less than regular price",
    path: ["discount"],
  });

export type CabinSchemaType = z.infer<typeof CabinSchema>;

interface CreateCabinFormProps {
  cabinToEdit?: CabinData;
  onCloseModal?: () => void;
}

function CreateCabinForm({ cabinToEdit, onCloseModal }: CreateCabinFormProps) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const { id: editId, ...editValues } = cabinToEdit || ({} as CabinData);
  const editMode = !!editId;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CabinSchemaType>({
    defaultValues: editMode
      ? {
          name: editValues.name || undefined,
          maxCapacity: editValues.max_capacity || undefined,
          regularPrice: editValues.regular_price || undefined,
          discount: editValues.discount || undefined,
          description: editValues.description || undefined,
          image: editValues.image || undefined,
        }
      : {},
    resolver: zodResolver(CabinSchema),
  });

  const onSubmit: SubmitHandler<CabinSchemaType> = (data) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    editMode
      ? editCabin(
          {
            cabinData: {
              ...data,
              image,
            },
            id: editId,
          },
          { onSuccess: () => reset() }
        )
      : createCabin({ ...data, image } as any, { onSuccess: () => reset() });
    onCloseModal?.();
  };

  const isSubmitting = isCreating || isEditing;

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name")}
          disabled={isSubmitting}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          defaultValue={0}
          disabled={isSubmitting}
          {...register("maxCapacity", { valueAsNumber: true })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          defaultValue={0}
          disabled={isSubmitting}
          {...register("regularPrice", { valueAsNumber: true })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isSubmitting}
          {...register("discount", { valueAsNumber: true })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          id="description"
          {...register("description")}
          disabled={isSubmitting}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: editMode ? false : "This field is requried",
          })}
          disabled={isSubmitting}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          disabled={isSubmitting}
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isSubmitting}>
          {editMode ? "Edit cabin" : "Create cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
