import { DataMattCV } from '../../data/mattcv';
import { Fragment } from 'react';
import { Page, Text, View, Document, Image, PDFDownloadLink } from '@react-pdf/renderer';
import dynamic from 'next/dynamic';
import { stylesOne } from './TemplatesStyles';
const DynamicPDFViewer = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFViewer),
  {
    ssr: false
  }
);
import { strapiUrl } from "../../constants/constans";

export const PDFTemplateOne = ({
  spokenLanguages,
  debouncedFormData,
  debouncedTextProfile,
  user,
  textProfile,
  dropdowns,
  educationFields
}) => {
  return (
    <DynamicPDFViewer style={{ width: '100%', height: '100%' }}>
      <Document>
        <Page style={stylesOne.page} wrap>
          <View style={stylesOne.firstColumn} fixed>
            <Text style={stylesOne.heading}>{debouncedFormData.fullName}</Text>
            <View style={stylesOne.spacing}>
              <Text style={stylesOne.subtitle}>
                {debouncedFormData.jobTitle}
              </Text>
            </View>
            {textProfile.length > 0 && (
              <View>
                <Text style={stylesOne.subtitle}>{DataMattCV.Profile}</Text>
                <Text style={stylesOne.profileText}>
                  {debouncedTextProfile}
                </Text>
              </View>
            )}
            {dropdowns.length > 0 && (
              <View>
                <Text style={stylesOne.subtitle}>
                  {DataMattCV.EmploymentHistory}
                </Text>
                {dropdowns.map((experience, index) => (
                  <View key={index}>
                    <Text style={stylesOne.thirdTitle}>
                      {`${experience.jobTitleXp} at ${experience.employer}, ${experience.cityXp}`}
                    </Text>
                    <Text style={stylesOne.thirdTitle}>
                      {`${experience.startDate} - ${experience.endDate}`}
                    </Text>
                    {experience?.description?.length > 0 && (
                      <View>
                        {experience?.description?.map((bullet, bulletIndex) => (
                          <View key={bulletIndex}>
                            <Text
                              style={stylesOne.bulletPoint}
                            >{`${bullet}`}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}
            {educationFields.length > 0 && (
              <View>
                <Text style={stylesOne.subtitle}>
                  {DataMattCV.EducationBackground}{' '}
                </Text>
                {educationFields.map((education, index) => (
                  <Fragment key={index}>
                    <Text style={stylesOne.thirdTitle}>
                      {`${education.degree}, ${education.institution}, ${education.city}`}
                    </Text>
                    <Text style={stylesOne.profileText}>
                      {`${education.startDate} - ${education.endDate}`}
                    </Text>
                  </Fragment>
                ))}
              </View>
            )}
          </View>
          <View style={stylesOne.secondColumn}>
            <View style={stylesOne.pictureContainer}>
              <Image
                src={strapiUrl + user?.avatar?.formats?.thumbnail?.url}
              />
            </View>
            {debouncedFormData.fullName && debouncedFormData.domainOfStudy && (
              <View>
                <Text style={stylesOne.subtitle}>{DataMattCV.Details}</Text>
                <Text style={stylesOne.profileText}>
                  {debouncedFormData.domainOfStudy}
                </Text>

                <Text style={stylesOne.phoneDetail}>
                  {debouncedFormData.phone}
                </Text>
                <Text style={stylesOne.subtitle}>{DataMattCV.Email}</Text>
                <Text style={stylesOne.profileText}>
                  {debouncedFormData.email}
                </Text>
                {/* Add other customer info based on the formData */}
                <Text style={stylesOne.subtitle}>{DataMattCV.Nationality}</Text>
                <Text style={stylesOne.profileText}>
                  {debouncedFormData.nationality}
                </Text>
              </View>
            )}
            {spokenLanguages.length > 0 && (
              <View>
                <Text style={stylesOne.heading}>Langues</Text>
                {spokenLanguages.map((language, index) => (
                  <Fragment key={index}>
                    <Text style={stylesOne.thirdTitle}>
                      {`${language.name} - ${language.proficiency}`}
                    </Text>
                  </Fragment>
                ))}
              </View>
            )}
          </View>
        </Page>
      </Document>
    </DynamicPDFViewer>
  );

};
