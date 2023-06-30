import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import FormRow from "../../ui/FormRow";
import CabinData from "../../interfaces/CabinData";

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
}

function CreateCabinForm({ cabinToEdit }: CreateCabinFormProps) {
  const { id: editId, ...editValues } = cabinToEdit || ({} as CabinData);
  const editMode = !!editId;
  const queryClient = useQueryClient();
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
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("Cabin created successfully", { autoClose: 3000 });
      queryClient.invalidateQueries({ queryKey: ["cabin"] });
      reset();
    },
    onError: (err) => {
      if (err instanceof Error) toast.error(err.message, { autoClose: 5000 });
    },
  });
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({
      cabinData,
      id,
    }: {
      cabinData: CabinSchemaType;
      id: number;
    }) => createEditCabin(cabinData, id),
    onSuccess: () => {
      toast.success("Cabin edited successfully", { autoClose: 3000 });
      queryClient.invalidateQueries({ queryKey: ["cabin"] });
      reset();
    },
    onError: (err) => {
      if (err instanceof Error) toast.error(err.message, { autoClose: 5000 });
    },
  });

  const onSubmit: SubmitHandler<CabinSchemaType> = (data) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    editMode
      ? editCabin({
          cabinData: {
            ...data,
            image,
          },
          id: editId,
        })
      : createCabin({ ...data, image });
  };

  const isSubmitting = isCreating || isEditing;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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
        <Button variation="secondary" type="reset" disabled={isSubmitting}>
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
