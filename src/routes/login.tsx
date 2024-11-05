import { LoadingOutlined } from "@ant-design/icons";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Formik } from "formik";
import secureLocalStorage from "react-secure-storage";
import { object, string } from "yup";
import cover from "../assets/capa.webp";
import logo from "../assets/logo1.svg";
import { useLogin } from "../services/auth/login";
import { Input } from "./_components/Input";

export const Route = createFileRoute("/login")({
  component: Login,
});

const credentialsSchema = object({
  email: string()
    .email("Deve ser um email válido.")
    .required("Email é obrigatório."),
  password: string().required("Senha é obrigatória."),
});

function Login() {
  const token = secureLocalStorage.getItem("token");
  const router = useRouter();
  const { mutate } = useLogin();
  const subdomain = window.location.hostname.split(".")[0];

  if (token) {
    router.navigate({ to: "/dashboard" });
  }

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
      <div className="flex h-[70vh] flex-col place-items-center bg-slate-100 p-8 md:h-screen md:w-[40%] md:pt-36">
        {/* <img alt="" src={logo} className="w-36" /> */}
        <h1 className="mt-8 text-center text-2xl font-bold text-gray-900">
          {/* Aqui terá uma chamada que faz uma busca dos dados do subdominio e retorna o nome e logo da oficina */}
          Bem vindo ao painel {subdomain}
        </h1>
        <p className="text-center text-gray-700">
          Faça login ou cadastre uma conta para continuar
        </p>

        <div className="w-full">
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={credentialsSchema}
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
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-8">
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
                  name="password"
                  label="Senha"
                  type="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  errors={errors.password}
                  touched={touched.password}
                />{" "}
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
                <span className="text-center text-gray-700">
                  Ainda não tem uma conta?{" "}
                  <a
                    href="/register"
                    className="text-orange-500 hover:text-orange-400"
                  >
                    Cadastre-se
                  </a>
                </span>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
