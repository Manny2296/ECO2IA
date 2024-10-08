import { motion } from 'framer-motion';
import { DataFeatures, features } from '../../data/features';

export default function Features() {
  return (
    <>
      <section
        className={`mx-auto w-full relative overflow-hidden bg-darkBgCard px-4 pt-10 pb-14 shadow-xl lg:px-24 `}
      >
        <div className="grid grid-cols-1 items-center lg:grid-cols-2 lg:gap-8">
          <motion.div
          // variants={item}
          >
            <motion.img
              className="h-80 w-80 mx-auto animate-float"
              src="https://eco2.com.co/moanooch/2021/09/Eco3.gif"
              alt="features"
              loading="lazy"
            />
          </motion.div>
          <motion.div className="space-y-6">
            <h1 className="text-center text-3xl font-bold leading-9 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 lg:text-left lg:text-6xl lg:leading-none text-white dark:text-white">
              Nuestros beneficios
            </h1>
            <p className="mt-4 text-lg leading-8 sm:text-left text-white dark:text-green-200">
              {DataFeatures.maintext_features}
            </p>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 1.1 }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 10 }}
              >
                <div className="p-6 rounded-lg shadow-lg bg-white dark:bg-eco2MainColor dark:text-green-200">
                  <dt className="flex items-center text-lg font-medium text-gray-900 dark:text-white">
                    <feature.icon
                      className="flex-shrink-0 h-6 w-6 text-green-600 dark:text-green-300"
                      aria-hidden="true"
                    />
                    <span className="ml-3 font-bold">{feature.name}</span>
                  </dt>
                  <dd className="mt-2 text-base text-gray-500 dark:text-white">
                    {feature.description}
                  </dd>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
