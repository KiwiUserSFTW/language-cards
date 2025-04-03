// react
import { FC } from 'react';

// types
import { aftercareTabs } from '../aftercare';

// compoennets
import AftercareInstruction from './aftercareInstruction/aftercareInstruction';
import CreamCompositionButton from '../creamComposition/creamCompositionButton/creamCompositionButton';

type AfterCareInstructionsProps = {
  tab: aftercareTabs;
};

export enum aftercareInstructionsSections {
  GO = 'go',
  QA = 'qa',
  NO_GO = 'no-go',
}

const AftercareInstructions: FC<AfterCareInstructionsProps> = ({ tab }) => {
  // using aftercareTabsInstructionKeys as a key for translation.json
  const aftercareTabsInstructionKeys = {
    [aftercareTabs.SUPRASORB]: 'suprasorbInstructions',
    [aftercareTabs.BANDAGE]: 'bandageInstructions',
  };

  return (
    <div className="aftercare-instructions">
      <div className="aftercare-instructions-go"></div>
      <AftercareInstruction
        section={aftercareInstructionsSections.GO}
        numerology={true}
        customKey={aftercareTabsInstructionKeys[tab]}
      />
      <div className="aftercare-instructions-no-go">
        <AftercareInstruction
          section={aftercareInstructionsSections.NO_GO}
          numerology={true}
          customKey={'general'}
        />
      </div>
      <div className="aftercare-instructions-questions-and-answers">
        <AftercareInstruction
          section={aftercareInstructionsSections.QA}
          numerology={false}
          customKey={aftercareTabsInstructionKeys[tab]}
        />
      </div>
      <CreamCompositionButton />
    </div>
  );
};

export default AftercareInstructions;
