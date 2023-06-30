import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useEditSetting } from "./useEditSetting";
import { useSettings } from "./useSettings";

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      min_booking_length,
      max_booking_length,
      max_guest_per_booking,
      breakfast_price,
    } = {},
  } = useSettings();

  const { isEditing, editSetting } = useEditSetting();

  function handleEdit(e: React.FocusEvent<HTMLInputElement>, field: string) {
    const { value } = e.target;
    if (!value) return;
    editSetting({ [field]: value });
  }

  if (isLoading) return <Spinner />;
  // This time we are using UNCONTROLLED fields, so we will NOT store state
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={min_booking_length || 3}
          disabled={isEditing}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleEdit(e, "min_booking_length")
          }
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={max_booking_length || 90}
          disabled={isEditing}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleEdit(e, "max_booking_length")
          }
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={max_guest_per_booking || 8}
          disabled={isEditing}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleEdit(e, "max_guest_per_booking")
          }
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfast_price || 15}
          disabled={isEditing}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
            handleEdit(e, "breakfast_price")
          }
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
