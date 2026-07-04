import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

interface CreateCabinFormProps {
  editToCabin?: any;
  onCloseModal?: () => void;
}

function CreateCabinForm({ editToCabin = {}, onCloseModal }: CreateCabinFormProps) {
  const { id: editId, ...editValues } = editToCabin;
  const isEditingSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditingSession ? editValues : {},
  });
  const { errors } = formState;

  const { createCabin, isCreatingCabin } = useCreateCabin();
  const { editCabin, isEditingCabin } = useEditCabin();
  const isWorking = isCreatingCabin || isEditingCabin;

  function onSubmit(data: any) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditingSession) {
      editCabin({ newCabinData: { ...data, image }, id: editId }, {
        onSuccess: () => { reset(); onCloseModal?.(); },
      });
    } else {
      createCabin({ ...data, image }, {
        onSuccess: () => { reset(); onCloseModal?.(); },
      });
    }
  }

  function onError(errors: any) { console.log(errors); }

  return (
    <Form type={onCloseModal ? "modal" : "regular"} onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin Name" error={errors?.name?.message as string}>
        <Input type="text" id="name" disabled={isWorking} {...register("name", { required: "This field is required." })} />
      </FormRow>
      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message as string}>
        <Input type="number" id="maxCapacity" disabled={isWorking} {...register("maxCapacity", { required: "This field is required.", min: { value: 1, message: "Value should be minimum 1" } })} />
      </FormRow>
      <FormRow label="Regular Price" error={errors?.regularPrice?.message as string}>
        <Input type="number" id="regularPrice" disabled={isWorking} {...register("regularPrice", { required: "This field is required.", min: { value: 1, message: "Value should be minimum 1" } })} />
      </FormRow>
      <FormRow label="Discount" error={errors?.discount?.message as string}>
        <Input type="number" id="discount" disabled={isWorking} defaultValue={0} {...register("discount", { required: "This field is required.", validate: (value) => value < getValues().regularPrice || "Discount cannot be greater than regular price." })} />
      </FormRow>
      <FormRow label="Description for website" error={errors?.description?.message as string}>
        <Textarea id="description" disabled={isWorking} defaultValue="" {...register("description", { required: "This field is required." })} />
      </FormRow>
      <FormRow label="Cabin photo">
        <FileInput id="image" accept="image/*" disabled={isWorking} {...register("image", { required: isEditingSession ? false : "Image is required" })} />
      </FormRow>
      <FormRow>
        <Button variation="secondary" type="reset" onClick={() => onCloseModal?.()}>Cancel</Button>
        <Button disabled={isWorking}>{isEditingSession ? "Edit Cabin" : "Create Cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;