import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_components/Features")({
  component: () => <div>Hello /_components/Features!</div>,
});

import {
  CalculatorIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  DocumentPlusIcon,
  NewspaperIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Cadastros completos",
    description:
      "Cadastre clientes, veículos e mecânicos e mantenha-se sempre no controle de todos os dados que precisar.",
    icon: DocumentPlusIcon,
  },
  {
    name: "Faça orçamentos com credibilidade",
    description:
      "Gere orçamentos detalhados que fornecerão credibilidade para os seus serviços.",
    icon: NewspaperIcon,
  },
  {
    name: "Gerencie seus processos",
    description:
      "Gerencie os processos da sua oficina e tenha maior assertividade e eficiência no seu empreendimento.",
    icon: ChartBarIcon,
  },
  {
    name: "Controle seus ganhos e gastos",
    description:
      "Use dos painéis detalhados para manter sempre na palma da mão seus gastos e lucros mensais.",
    icon: CurrencyDollarIcon,
  },
  {
    name: "Gere cobranças e pagamentos",
    description:
      "Nossas integrações bancárias permite que você gere pagamentos por boleto, PIX, débito e crédito em até 12x sem júros.",
    icon: CalculatorIcon,
  },
];

export default function Features() {
  return (
    <>
      <div id="features" className="bg-white py-16 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-orange-600">
              Agilidade e eficiência
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              A metodologia ágil que a sua oficina precisa
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Use metodologias ágeis eficazes para garantir que os processos na
              sua oficina sejam sempre os mais eficientes possíveis.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-6xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600">
                      <feature.icon
                        aria-hidden="true"
                        className="h-6 w-6 text-white"
                      />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}
