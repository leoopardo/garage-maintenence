import { LoadingOutlined } from "@ant-design/icons";
import { createFileRoute } from "@tanstack/react-router";
import { Formik } from "formik";
import cover from "../../assets/capa.jpeg";
import logo from "../../assets/logo1.svg";
import { Input } from "../_components/Input";
import { mixed, object, ref, string } from "yup";
import { formatter } from "../../utils/formatter";

export const Route = createFileRoute("/_register/registerSubdomain")({
  component: RegisterSubDomain,
});

const plans = ["free-trial", "self-employed", "medium-garage", "big-garage"];
const plansPrices = {
  "self-employed": 19.99,
  "medium-garage": 49.99,
  "big-garage": 99.99,
  "free-trial": 0,
};

const credentialsSchema = object({
  subdomain: string().required("Subdomínio é obrigatório."),
  garage_name: string().required("Nome da oficina é obrigatório."),
  admin_name: string().required("Nome do administrador é obrigatório."),
  username: string().required("Nome de usuário é obrigatório."),
  email: string()
    .email("Deve ser um email válido.")
    .required("Email é obrigatório."),
  admin_password: string().required("Senha é obrigatória."),
  confirm_password: string().oneOf(
    [ref("admin_password"), undefined],
    "As senhas devem ser iguais.",
  ),
  plan: mixed().oneOf(plans),
});

export function RegisterSubDomain() {
  return (
    <div
      className="grid grid-cols-1 bg-white md:flex md:grid-cols-2"
      style={{ width: "100%" }}
    >
      <div
        style={{
          backgroundImage: `
      linear-gradient(
        to top left,
       rgba(255, 255, 255, 0.50),
        rgba(255, 255, 255, 0.7),
        rgba(255, 255, 255, 0.8), 
        rgba(255, 255, 255, 0.8), 
        rgba(255, 255, 255, 0.8), 
        rgba(255, 255, 255, 0.7),
        rgba(255, 255, 255, 0.50)
      ),
      url(${cover})
    `,
        }}
        className="isolate grid h-[30vh] place-items-center bg-cover bg-center md:h-screen md:w-[60%]"
      >
        <img alt="" src={logo} className="w-64" />
      </div>
      <div className="mt-[-16px] flex h-[70vh] flex-col place-items-center bg-slate-100 p-8 md:h-screen md:w-[40%]">
        <h1 className="mt-8 max-w-96 text-center text-xl font-bold text-gray-900">
          Cadastre sua oficina e melhore seus processos agora mesmo.
        </h1>

        <div className="w-full">
          <Formik
            initialValues={{
              subdomain: "",
              garage_name: "",
              admin_name: "",
              email: "",
              admin_password: "",
              confirm_password: "",
              plan: "free-trial",
            }}
            validationSchema={credentialsSchema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
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
            }) => (
              <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-8">
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                  <Input
                    name="subdomain"
                    label="Subdomínio"
                    type="text"
                    onChange={(e) => handleChange(e)}
                    onBlur={handleBlur}
                    value={values.subdomain}
                    errors={errors.subdomain}
                    touched={touched.subdomain}
                  />
                  <Input
                    name="garage_name"
                    label="Nome da oficina"
                    type="text"
                    onChange={(e) => handleChange(e)}
                    onBlur={handleBlur}
                    value={values.garage_name}
                    errors={errors.garage_name}
                    touched={touched.garage_name}
                  />
                </div>

                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                  <Input
                    name="admin_name"
                    label="Nome do administrador"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.admin_name}
                    errors={errors.admin_name}
                    touched={touched.admin_name}
                  />
                  <Input
                    name="email"
                    label="Email"
                    type="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    errors={errors.email}
                    touched={touched.email}
                  />
                  <Input
                    name="admin_password"
                    label="Senha do administrador"
                    type="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.admin_password}
                    errors={errors.admin_password}
                    touched={touched.admin_password}
                  />
                  <Input
                    name="confirm_password"
                    label="Confirmar senha"
                    type="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirm_password}
                    errors={errors.confirm_password}
                    touched={touched.confirm_password}
                  />
                </div>

                {/* Botões de rádio em formato de card */}
                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {plans.map((plan) => (
                    <label
                      key={plan}
                      className={`flex cursor-pointer flex-col rounded-md border p-4 text-center transition-all duration-500 ${
                        values.plan === plan
                          ? "border-orange-500 bg-orange-100"
                          : "border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="plan"
                        value={plan}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values.plan === plan}
                        className="hidden"
                      />
                      {plan === "free-trial" && "Teste Grátis"}
                      {plan === "self-employed" && "Autônomo"}
                      {plan === "medium-garage" && "Oficina Média"}
                      {plan === "big-garage" && "Grande Oficina"}
                      <div className="absolute ml-[-24px] mt-[-24px] rounded-lg bg-orange-300 p-1 text-xs">
                        {formatter.currency((plansPrices as any)[plan])}
                      </div>
                    </label>
                  ))}
                </div>
                {errors.plan && touched.plan && (
                  <div className="text-red-500">{errors.plan}</div>
                )}

                <button
                  type="submit"
                  style={{ fontWeight: 300 }}
                  className={
                    "mt-2 block rounded-md bg-orange-500 px-3.5 py-2.5 text-center text-base font-semibold text-white shadow-sm transition-all duration-500 hover:bg-orange-400 hover:text-orange-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 sm:mt-10"
                  }
                  disabled={isSubmitting}
                >
                  Entrar agora {isSubmitting && <LoadingOutlined />}
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
