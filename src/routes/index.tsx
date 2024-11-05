import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import cover from "../assets/capa.jpeg";
import logo from "../assets/logo2.svg";
import Features from "./_components/Features";
import { Input } from "./_components/Input";
import { Modal } from "./_components/Modal";
import { Plans } from "./_components/Plans";
import { Link } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Example,
});

const navigation = [
  { name: "Produto", href: "#init" },
  { name: "Features", href: "#features" },
  { name: "Planos", href: "#plans" },
  { name: "Sobre nós", href: "#init" },
];

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [subdomain, setSubdomain] = useState<string>("");
  const [isSubdomainModalOpen, setIsSubdomainModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Se o usuário estiver rolando para cima, o header fica fixo
      if (currentScrollY < lastScrollY) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleSmoothScroll = (e: any, targetId: any) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white" style={{ width: "100%" }}>
      <header
        className={`inset-x-0 top-0 z-50 bg-white bg-opacity-75 backdrop-blur-sm transition-transform duration-300 ${
          isSticky ? "sticky" : ""
        }`}
      >
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">garage</span>
              <img alt="" src={logo} className="h-8 w-auto" />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href.slice(1))}
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-orange-500"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <p
              onClick={() => setIsSubdomainModalOpen(true)}
              className="cursor-pointer text-sm font-semibold leading-6 text-gray-900 hover:text-orange-500"
            >
              Acesse sua oficina <span aria-hidden="true">&rarr;</span>
            </p>
          </div>
        </nav>
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="#" className="-m-1.5 p-1.5">
                <span className="sr-only">garage</span>
                <img alt="" src={logo} className="h-8 w-auto" />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleSmoothScroll(e, item.href.slice(1))}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 hover:text-orange-500"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <p
                    onClick={() => setIsSubdomainModalOpen(true)}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Acessar minha garagem
                  </p>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <div
        className="relative isolate bg-cover bg-center px-6 pb-8 pt-14 lg:px-8"
        style={{
          backgroundImage: `
          linear-gradient(
            to top left,
            rgba(255, 255, 255, 0.60),
            rgba(255, 255, 255, 0.8),
            rgba(255, 255, 255, 0.9), 
            rgba(255, 255, 255, 0.9), 
            rgba(255, 255, 255, 0.9), 
            rgba(255, 255, 255, 0.8),
            rgba(255, 255, 255, 0.60)
          ),
          url(${cover})
        `,
        }}
        id="init"
      >
        <div className="mx-auto max-w-2xl py-32 sm:py-20 lg:py-32">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Fale agora com um especialista.{" "}
              <a
                href="#"
                className="font-semibold text-orange-500 hover:text-orange-300"
              >
                <span aria-hidden="true" className="absolute inset-0" />
                Faça um orçamento <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Gerenciamento para oficinas mecânicas
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Uma plataforma completa que te permite gerenciar veículos,
              orçamentos, serviços e o tempo dos seus mecânicos. Junte-se a mais
              de 1000 garagens que já utilizam o Garage Manager.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/register"
                style={{
                  fontWeight: 300,
                }}
                className="rounded-md bg-orange-600 px-3.5 py-2.5 text-base font-semibold text-white shadow-sm transition-all duration-500 hover:bg-orange-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 active:bg-orange-600"
              >
                Iniciar teste grátis
              </a>
              <a
                href="#"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Saiba mais <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Features />
      <Plans />
      <Modal
        mobileMenuOpen={isSubdomainModalOpen}
        setMobileMenuOpen={setIsSubdomainModalOpen}
        title="Acesse sua oficina"
        description="Por favor, digite o domínio da sua oficína para que possamos te redirecionar ao seu painel."
        body={
          <>
            <Input
              name="subdomain"
              label="Subdomínio"
              onChange={({ target }) => {
                const v = target?.value
                  .replace(/\s+/g, "-")
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .replace(/[^a-zA-Z0-9-]/g, "");
                setSubdomain(v);
              }}
              value={subdomain}
              AddonBefore={<span>https://</span>}
              AddonAfter={<span>.garage.com</span>}
              paddingLeft={16}
              paddingRight={36}
            />

            <div className="relative mt-4 rounded-full px-3 py-1 text-sm leading-6">
              Ainda não tem subdomínio?{" "}
              <a
                href="/register"
                className="font-semibold text-orange-500 hover:text-orange-300"
              >
                <span aria-hidden="true" className="absolute inset-0" />
                Registre-se <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </>
        }
        onClose={() => {
          setSubdomain("");
        }}
        onConfirm={() => {
          window.location.href = `http://${subdomain}${import.meta.env.VITE_ENV === "local" ? "." : "-"}${window.location.host}/login`;
        }}
      />
      <footer className="flex flex-col items-center justify-center bg-white pb-8">
        <div className="grid w-11/12 grid-cols-1 py-16 md:grid-cols-4">
          <div className="mx-auto flex flex-col items-start justify-start px-6 lg:px-8">
            <img alt="" src={logo} className="h-8" />
            <p
              style={{ fontWeight: 100, fontFamily: "SF-Pro-Light" }}
              className="mt-8 text-base"
            >
              Transformando a vida de pequenos, médios e grandes empreendedores
              com processos simples e eficientes.
            </p>
          </div>

          <div className="mx-auto flex flex-col items-start justify-start px-6 lg:px-8">
            <p className="text-lg font-semibold">Produtos</p>
            <a>Termos e condições</a>
          </div>
          <div className="mx-auto flex flex-col items-start justify-start px-6 lg:px-8">
            <p className="text-lg font-semibold">Sobre nós</p>
            <a>Termos e condições</a>
            <a>Política de privacidade</a>
            {navigation.map((item) => (
              <a href={item.href}>{item.name}</a>
            ))}
          </div>
          <div className="mx-auto flex flex-col items-start justify-start px-6 lg:px-8">
            <p className="text-lg font-semibold">Contato</p>
            <p className="mt-2 text-gray-600">(45) 98836-9425</p>
            <p className="mt-2 text-gray-600">
              Cascavel - PR, Rua tom Jobim 210
            </p>
            <p className="mt-2 text-gray-600">contato@garage.com</p>
          </div>
        </div>

        <hr className="ml-8 mr-8" />
        <p className="mt-8 text-center text-gray-600">
          garage © 2024. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}
