import { useState, useContext } from 'react';
import { UserContext } from '../../context/user/UserContext';
import { useRouter } from 'next/router';
import { RadioGroup } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import {
  classNames,
  plan_pricing,
  stripePromise
} from '../../constants/constans';
// import {frequencies, tiers} from '../../constants/PricingConstans'
import CheckoutForm from '../payment/CheckoutForm';
import { ContacUsPricing } from '../contact_us/contactUsPricing';
import { PopUpModal } from '../modal/popUpModal';
import axios from 'axios';

export default function PricingPlans() {
  const { user } = useContext(UserContext);
  const router = useRouter();
  // console.log('User in pricing is:' + user);
  const [frequency, setFrequency] = useState(plan_pricing.frequencies[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEnterpriseOpen, setIsEnterpriseOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState('cop');

  const handleCheckout = async ({ price }) => {
    // console.log(price);
    if (user == null) {
      router.push('/auth/signin');
      // Set the state to open the modal
    } else {
      try {
        const stripe = await stripePromise;
        const customerid = user.customer_id;
        const userId = user.id;

        // console.log("inside the handleCheckout", price, customerid, userId)

        const checkoutSession = await axios.post('/api/create-subscription', {
          price,
          customerid,
          userId
        });
        console.log('hey cjeckout session', checkoutSession);

        const result = await stripe.redirectToCheckout({
          sessionId: checkoutSession.data.sessionId
        });

        if (result.error) {
          alert(result.error.message);
        }
      } catch (error) {
        // console.log(error);
      }
    }
  };

  const handleButtonClick = ({ amount }) => {
    if (user == null) {
      router.push('/auth/signin');
      // Set the state to open the modal
    } else {
      setAmount(amount);
      setIsModalOpen((prev) => !prev);
    }
  };
  const handleButtonEnterprise = () => {
    setIsEnterpriseOpen((prev) => !prev);
  };
  return (
    <>
      {isModalOpen && (
        <CheckoutForm
          onClose={handleButtonClick}
          amount={amount}
          currency={currency}
          user={user}
        />
      )}
      {isEnterpriseOpen && (
        <PopUpModal isModalNeedIt={true}>
          <ContacUsPricing onClose={handleButtonEnterprise} />
        </PopUpModal>
      )}

      <section id="pricing" className="bg-lightColor dark:bg-darkColor">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-base font-semibold leading-7 text-eco2MainColor">
              Suscripciones
            </h2>
            <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Escoge el plan que mejor se adapte a tus necesidades.
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600 dark:text-white">
            Elige la suscripción más adecuada para ti. Puedes cambiar de plan o
            cancelar en cualquier momento.
          </p>
          <div className="mt-16 flex justify-center">
            <RadioGroup
              value={frequency}
              onChange={setFrequency}
              className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200"
            >
              <RadioGroup.Label className="sr-only">
                Frecuencia de suscripción{' '}
              </RadioGroup.Label>
              {plan_pricing.frequencies.map((option) => (
                <RadioGroup.Option
                  key={option.value}
                  value={option}
                  className={({ checked }) =>
                    classNames(
                      checked ? 'bg-green-600 text-white' : 'text-gray-500',

                      'cursor-pointer rounded-full px-2.5 py-1'
                    )
                  }
                >
                  <span>{option.label}</span>
                </RadioGroup.Option>
              ))}
            </RadioGroup>
          </div>

          <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0  sm:max-w-none sm:grid-cols-2 lg:grid-cols-4">
            {plan_pricing.tiers.map((tier) => (
              <article
                key={tier.name}
                className={classNames(
                  tier.mostPopular
                    ? 'ring-2 ring-eco2HoverColor'
                    : 'ring-1 ring-gray-200',
                  'rounded-3xl p-8 xl:p-10 shadow-xl flex flex-col justify-between items-center '
                )}
              >
                <div className="flex items-center flex-col">
                  <h3
                    id={tier.id}
                    className={classNames(
                      tier.mostPopular
                        ? 'text-eco2MainColor'
                        : 'text-gray-900 dark:text-white',
                      'text-lg font-semibold leading-8'
                    )}
                  >
                    {tier.name}
                  </h3>
                  {tier.mostPopular ? (
                    <p className="rounded-full bg-eco2MainColor px-2.5 py-1 text-xs font-semibold leading-5 text-white">
                      Most popular
                    </p>
                  ) : null}
                </div>

                <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-white">
                  {tier.description}
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-eco2MainColor">
                    {tier.price[frequency.value]}
                  </span>
                  <span className="text-sm font-semibold leading-6 text-eco2HoverColor">
                    {frequency.priceSuffix}
                  </span>
                </p>

                <ul
                  role="list"
                  className="mt-8 space-y-3 text-sm leading-6 text-gray-600 xl:mt-10"
                >
                  {tier.mainFeatures.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon
                        className="h-6 w-5 flex-none text-eco2MainColor"
                        aria-hidden="true"
                      />
                      <p className="dark:text-white">{feature}</p>
                    </li>
                  ))}
                </ul>
                {tier.name === 'FREEMIUM' ? (
                  <button disabled className=" w-full opacity-95 py-2">
                    Plan Freemium
                  </button>
                ) : (
                  <button
                    onClick={
                      tier.name === 'ENTERPRISE'
                        ? () => {
                            handleButtonEnterprise();
                          }
                        : () => {
                            handleCheckout({
                              price: tier.priceid
                            });
                          }
                    }
                    aria-describedby={tier.id}
                    className={classNames(
                      tier.featured
                        ? 'bg-darkColor dark:text-black dark:bg-lightColor dark:hover:bg-eco2MainColor text-white hover:bg-darkBgCard transition-all focus-visible:outline-eco2MainColor focus-visible:outline-2 focus-visible:outline-offset-2'
                        : 'bg-eco2MainColor text-black hover:bg-eco2HoverColor transition-all focus-visible:outline-eco2MainColor',
                      `cursor-pointer w-full  mt-6 block rounded-md py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`
                    )}
                  >
                    {tier.cta}
                  </button>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
