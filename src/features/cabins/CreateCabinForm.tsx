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
import { createCabin } from "../../services/apiCabins";
import FormRow from "../../ui/FormRow";

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

function CreateCabinForm() {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CabinSchemaType>({
    resolver: zodResolver(CabinSchema),
  });
  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("Cabin created successfully", { autoClose: 3000 });
      queryClient.invalidateQueries({ queryKey: ["cabin"] });
      reset();
    },
    onError: (err) => {
      if (err instanceof Error) toast.error(err.message, { autoClose: 5000 });
    },
  });

  const onSubmit: SubmitHandler<CabinSchemaType> = (data) => {
    console.log(data);
    mutate(data);
  };

  console.log(errors);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name")}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          defaultValue={0}
          disabled={isCreating}
          {...register("maxCapacity", { valueAsNumber: true })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          defaultValue={0}
          disabled={isCreating}
          {...register("regularPrice", { valueAsNumber: true })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isCreating}
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
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image")}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" disabled={isCreating}>
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
