import { createFileRoute } from "@tanstack/react-router";

import { CheckIcon } from "@heroicons/react/20/solid";

export const Route = createFileRoute("/_components/Plans")({
  component: () => <div>Hello /_components/Plans!</div>,
});
const tiers = [
  {
    name: "Mecânico autônomo",
    id: "small",
    href: "/register",
    priceMonthly: "R$9,99",
    description:
      "Perfeito para pequenos empreendedores, que trabalham sozinhos.",
    features: [
      "1 mecânico",
      "Gerenciamento de clientes",
      "5 veículos simultâneos",
      "30 orçamentos mensais",
      "Métodos de pagamento dos clientes: Boleto, PIX, débito e crédito em até 3x sem júros",
      "Histórico de serviços por 90 dias",
    ],
    featured: false,
    startText: "Começe agora",
  },
  {
    name: "Grande oficina",
    id: "large",
    href: "/register",
    priceMonthly: "R$99,99",
    description:
      "Dedicado a oficinas de grande porte e que possuam mais de 5 mecânicos.",
    features: [
      "Mecânicos ilimitados",
      "Gerenciamento de clientes",
      "Orçamentos ilimitados",
      "Veículos simultâneos ilimitados",
      "Métodos de pagamento dos clientes: Boleto, PIX, débito e crédito em até 12x sem júros",
      "Dashbards personalizados",
      "Histórico de serviços ilimitado",
    ],
    startText: "Experimentar 30 dias grátis",
    featured: true,
  },
  {
    name: "Oficina média",
    id: "medium",
    href: "/register",
    priceMonthly: "R$49,99",
    description:
      "Dedicado a oficinas de médio porte e que possuam até de 5 mecânicos.",
    features: [
      "5 mecânicos",
      "Gerenciamento de clientes",
      "25 veículos simultâneos",
      "100 orçamentos mensais",
      "Métodos de pagamento dos clientes: Boleto, PIX, débito e crédito em até 12x sem júros",
      "Histórico de serviços por 12 mêses",
    ],
    startText: "Começe agora",
    featured: false,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function Plans() {
  return (
    <div
      id="plans"
      className="relative isolate bg-slate-100 px-6 py-8 sm:py-8 lg:px-8"
    >
      <div className="mx-auto max-w-2xl text-left lg:max-w-4xl lg:text-center">
        <h2 className="text-base font-semibold leading-7 text-orange-600">
          Planos
        </h2>
        <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          O preço certo para a sua oficina
        </p>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-left text-lg leading-8 text-gray-600 lg:text-center">
        Encontre o preço ideal para a sua oficina e comece a usar hoje mesmo.
      </p>
      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-8 sm:gap-y-0 lg:max-w-7xl lg:grid-cols-3">
        {tiers.map((tier, tierIdx) => (
          <div
            key={tier.id}
            className={classNames(
              tier.featured
                ? "relative bg-gray-900 shadow-2xl"
                : "bg-white/60 sm:mx-8 lg:mx-0",
              tier.featured
                ? ""
                : tierIdx === 0
                  ? "rounded-t-3xl sm:rounded-b-none lg:rounded-bl-3xl lg:rounded-tr-none"
                  : "sm:rounded-t-none lg:rounded-bl-none lg:rounded-tr-3xl",
              "rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10",
            )}
          >
            <h3
              id={tier.id}
              className={classNames(
                tier.featured ? "text-orange-400" : "text-orange-600",
                "text-base font-semibold leading-7",
              )}
            >
              {tier.name}
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span
                className={classNames(
                  tier.featured ? "text-white" : "text-gray-900",
                  "text-5xl font-bold tracking-tight",
                )}
              >
                {tier.priceMonthly}
              </span>
              <span
                className={classNames(
                  tier.featured ? "text-gray-400" : "text-gray-500",
                  "text-base",
                )}
              >
                /mês
              </span>
            </p>
            <p
              className={classNames(
                tier.featured ? "text-gray-300" : "text-gray-600",
                "mt-6 text-base leading-7",
              )}
            >
              {tier.description}
            </p>
            <ul
              role="list"
              className={classNames(
                tier.featured ? "text-gray-300" : "text-gray-600",
                "mt-8 space-y-3 text-sm leading-6 sm:mt-10",
              )}
            >
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    aria-hidden="true"
                    className={classNames(
                      tier.featured ? "text-orange-400" : "text-orange-600",
                      "h-6 w-5 flex-none",
                    )}
                  />
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href={tier.href}
              aria-describedby={tier.id}
              style={{ fontWeight: 300 }}
              className={classNames(
                tier.featured
                  ? "bg-orange-500 text-white shadow-sm hover:bg-orange-400 hover:text-orange-50 focus-visible:outline-orange-500"
                  : "text-orange-600 ring-1 ring-inset ring-orange-200 hover:text-orange-400 hover:ring-orange-300 focus-visible:outline-orange-600",
                "mt-8 block rounded-md px-3.5 py-2.5 text-center text-base font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10",
              )}
            >
              {tier.startText}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
