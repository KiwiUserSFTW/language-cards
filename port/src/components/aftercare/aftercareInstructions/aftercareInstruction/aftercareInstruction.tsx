// react
import { FC } from 'react';

// compoents
import Instruction from '@/components/general/instruction/instruction';

// localization
import { useTranslation } from 'react-i18next';

// types
import { aftercareInstructionsSections } from '../aftercareInstructions';
import { paragraph } from '@/components/general/instruction/paragraphs/paragraphs';

type AftercareInstructionProps = {
  section: aftercareInstructionsSections;
  numerology: boolean;
  customKey: string;
};

const AftercareInstruction: FC<AftercareInstructionProps> = ({
  section,
  numerology,
  customKey,
}) => {
  const { t } = useTranslation('aftercare');

  const getObjectValues = (instructionKey: string) => {
    return Object.values(
      t(instructionKey, { returnObjects: true })
    ) as paragraph[];
  };
  const getInstructions = (
    section: aftercareInstructionsSections,
    customKey?: string
  ): paragraph[] => {
    const instructionKey = `aftercare.${section}${
      customKey !== '' ? '.' + customKey : ''
    }`;
    return getObjectValues(instructionKey);
  };

  const instructions = getInstructions(section, customKey);
  return (
    <Instruction
      paragraphs={{
        list: instructions,
        numerology: numerology,
      }}
      title={t(`aftercare.${section}.title`)}
    />
  );
};

export default AftercareInstruction;
