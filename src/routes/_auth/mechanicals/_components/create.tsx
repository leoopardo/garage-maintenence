import { Button } from "@/components/ui/button";
import {
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/routes/_components/Input";
import { useCreateMechanical } from "@/services/mechanicals/createMechanical";
import { createFileRoute } from "@tanstack/react-router";
import { Formik } from "formik";
import { Dispatch, SetStateAction } from "react";
import { object, string } from "yup";
import { CreateMechanicalI } from "../../../../services/mechanicals/createMechanical";

export const Route = createFileRoute("/_auth/mechanicals/_components/create")({
  component: () => <div>Hello /_auth/mechanicals/_components/create!</div>,
});

const userSchema = object().shape({
  firstname: string().required("O nome é obrigatório"),
  lastname: string().required("O sobrenome é obrigatório"),
  cellphone: string().required("O telefone é obrigatório"),
});

export function CreateMechanical({
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { mutate } = useCreateMechanical({ setOpen });

  return (
    <DrawerContent>
      <div className="mx-auto w-full max-w-sm">
        <DrawerHeader>
          <DrawerTitle>Cadastrar mecânico</DrawerTitle>
          <DrawerDescription>
            Preencha todos os campos para cadastrar um novo mecânico.
          </DrawerDescription>
        </DrawerHeader>
        <div>
          <div>
            <Formik<CreateMechanicalI>
              initialValues={{ firstname: "", lastname: "", cellphone: "" }}
              validationSchema={userSchema}
              onSubmit={(values, { setSubmitting }) => {
                mutate(values);
                setSubmitting(false);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
              }) => (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-1 p-4"
                >
                  <Input
                    name="firstname"
                    label="Primeiro nome"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstname}
                    errors={errors.firstname}
                    touched={touched.firstname}
                  />
                  <Input
                    name="lastname"
                    label="Ultimo nome"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastname}
                    errors={errors.lastname}
                    touched={touched.lastname}
                  />
                  <Input
                    name="cellphone"
                    label="Telefone"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.cellphone}
                    errors={errors.cellphone}
                    touched={touched.cellphone}
                  />
                  <DrawerFooter className="absolute bottom-0 left-0 w-full">
                    <Button type="submit" disabled={isSubmitting}>
                      Cadastrar mecânico
                    </Button>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                      Cancel
                    </Button>
                  </DrawerFooter>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </DrawerContent>
  );
}
