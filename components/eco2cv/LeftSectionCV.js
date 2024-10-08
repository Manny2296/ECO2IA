import { useState } from 'react';
import { TextAreaProfile } from './TextAreaProfile';
import { FormCV } from './FormCV';
import TextAreaEducation from './TextAreaEducation';
import ToggleProfileOpt from './ToggleProfileOpt';
import { RadioButtonsTemplate } from './RadioButtonsTemplate';
import { DataEco2CV } from '../../data/eco2cv';
import ExperienceForm from './ExperienceForm';
import SpokenLanguagesForm from './SpokenLanguagesForm';

export const LeftSectionCV = ({
  setSpokenLanguages,
  formData,
  selectedTemplate,
  setSelectedTemplate,
  setFormData,
  textProfile,
  setTextProfile,
  setEducationFields,
  dropdowns,
  setDropdowns
}) => {
  const [toggleHovered, setToggleHovered] = useState(false);


  const handleToggleHover = (isHovered) => {
    setToggleHovered(isHovered);
  };

  const handleTemplateChange = (event) => {
    setSelectedTemplate(event.target.value);
  };

  return (
    <section className="lg:w-[50%] lg:absolute lg:-left-4 dark:bg-darkColor bg-lightColor h-full">
      <h1 className="text-xl font-bold text-eco2MainColor">
        {' '}
        {DataEco2CV.PersonalDetails}{' '}
      </h1>
      <p className="text-xs text-black dark:text-white">
        {DataEco2CV.PersonalDetailsText}
      </p>
      <FormCV formData={formData} setFormData={setFormData} />

      <div className="flex justify-start items-center relative">
        <div
          // title={DataEco2CV.AddProfileInfo}
          onMouseEnter={() => handleToggleHover(true)}
          onMouseLeave={() => handleToggleHover(false)}
        >
          <ToggleProfileOpt setFormData={setFormData} />
          {/* <ToggleProfileOpt setEducationData={setEducationData} /> */}

        </div>
        {toggleHovered && (
          <p className="absolute top-[-40px] left-0 text-black bg-white p-1 rounded border border-gray-300 shadow">
            {DataEco2CV.AddProfileInfo}
          </p>
        )}
      </div>
      <TextAreaProfile
        textProfile={textProfile}
        setTextProfile={setTextProfile}
      />
      <TextAreaEducation setEducationFields={setEducationFields} />

      {/* Radio button group for choosing templates */}
      <RadioButtonsTemplate
        handleTemplateChange={handleTemplateChange}
        selectedTemplate={selectedTemplate}
      />
      <ExperienceForm dropdowns={dropdowns} setDropdowns={setDropdowns} />
      <SpokenLanguagesForm setSpokenLanguages={setSpokenLanguages} />
    </section>
  );
};
