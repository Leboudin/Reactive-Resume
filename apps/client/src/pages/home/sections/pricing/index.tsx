// sections/pricing.tsx
import { useEffect, useState } from 'react'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import axios from 'axios'
import { PlanDto } from '../../../../../../../libs/dto/src/subscription'
import { fixed } from '@reactive-resume/utils'

export const PricingSection = () => {
  const { i18n } = useLingui()
  const [plans, setPlans] = useState<PlanDto[]>([])
  const [currentPeriod, setCurrentPeriod] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly')

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get('/api/v1/subscription/plans')
        setPlans(response.data)
      } catch (error) {
        console.error('Failed to fetch plans:', error)
      }
    }

    fetchPlans()
  }, [])

  const filteredPlans = plans.filter((plan) => plan.period === currentPeriod)

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">{t`Pricing`}</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {t`Choose the plan that's right for you`}
          </p>
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => setCurrentPeriod('monthly')}
            className={`px-4 py-2 text-sm font-medium rounded-full ${
              currentPeriod === 'monthly' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {t`Monthly`}
          </button>
          <button
            onClick={() => setCurrentPeriod('quarterly')}
            className={`px-4 py-2 text-sm font-medium rounded-full ${
              currentPeriod === 'quarterly'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {t`Quarterly`}
          </button>
          <button
            onClick={() => setCurrentPeriod('yearly')}
            className={`px-4 py-2 text-sm font-medium rounded-full ${
              currentPeriod === 'yearly' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {t`Yearly`}
          </button>
        </div>

        <div className="mt-24 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">
          {filteredPlans.map((plan) => (
            <div
              key={plan.id}
              className={`pt-6 px-6 pb-3 bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl ${plan.highlighted ? 'bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-500 shadow-2xl' : ''}`}
            >
              <div>
                <h3 className="text-xl font-medium text-gray-900">{plan.name}</h3>
                <p className="mt-4 text-gray-500">{plan.description}</p>
              </div>
              <div className="mt-6 flex items-baseline text-5xl font-extrabold text-gray-900">
                ${fixed(plan.price)}
                {plan.originalPrice && (
                  <del className="ml-2 text-3xl font-normal text-gray-500 line-through">
                    ${fixed(plan.originalPrice)}
                  </del>
                )}
              </div>
              <div className="mt-2 text-xl font-medium text-gray-500 capitalize">{plan.period}</div>
              <a
                href="#"
                className="mt-6 block w-full bg-indigo-600 border border-transparent rounded-md py-3 px-5 text-center font-medium text-white hover:bg-indigo-700"
              >
                {t`Subscribe`}
              </a>

              <ul className="mt-6 list-disc pl-6 space-y-2">
                {(plan.display?.features || []).map((feature: string, index: number) => (
                  <li
                    key={index}
                    className="text-gray-500"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
