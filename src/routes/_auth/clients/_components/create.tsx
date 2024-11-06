import { Button } from "@/components/ui/button";
import {
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/routes/_components/Input";
import {
  CreateClientI,
  useCreateClient,
} from "@/services/clients/createClient";
import { createFileRoute } from "@tanstack/react-router";
import { Formik } from "formik";
import { Dispatch, SetStateAction } from "react";
import { object, string } from "yup";

export const Route = createFileRoute("/_auth/clients/_components/create")({
  component: () => <div>Hello /_auth/mechanicals/_components/create!</div>,
});

const userSchema = object().shape({
  name: string().required("O nome é obrigatório"),
  cellphone: string().required("O telefone é obrigatório"),
});

export function CreateClient({
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { mutate } = useCreateClient({ setOpen });

  return (
    <DrawerContent>
      <div className="mx-auto w-full max-w-sm">
        <DrawerHeader>
          <DrawerTitle>Cadastrar cliente</DrawerTitle>
          <DrawerDescription>
            Preencha todos os campos para cadastrar um novo cliente.
          </DrawerDescription>
        </DrawerHeader>
        <div>
          <div>
            <Formik<CreateClientI>
              initialValues={{ name: "", cellphone: "" }}
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
                    name="name"
                    label="Nome"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    errors={errors.name}
                    touched={touched.name}
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
                      Cadastrar cliente
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
