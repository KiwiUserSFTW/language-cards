// styles and images
import './aftercare.scss';
import aftecareImage from '@assets/aftercare-welcome.png';

// react
import { FC, useState } from 'react';

// components
import AftercareInstructions from './aftercareInstructions/aftercareInstructions';
import CreamCompositionButton from './creamComposition/creamCompositionButton/creamCompositionButton';

export enum aftercareTabs {
  SUPRASORB = 'Suprasorb',
  BANDAGE = 'Bandage',
}

export type tabButton = {
  active: boolean;
  name: aftercareTabs;
  onClick: () => void;
};

const renderTabButtons = (tabButtons: tabButton[]) => {
  return tabButtons.map((button, index) => {
    return (
      <button
        key={index}
        onClick={button.onClick}
        className={button.active ? 'active' : ''}
      >
        {button.name}
      </button>
    );
  });
};

const Aftercare: FC = () => {
  const [tab, setTab] = useState<aftercareTabs>(aftercareTabs.BANDAGE);

  const tabButtons: tabButton[] = [
    {
      active: tab == aftercareTabs.SUPRASORB,
      name: aftercareTabs.SUPRASORB,
      onClick: () => setTab(aftercareTabs.SUPRASORB),
    },
    {
      active: tab == aftercareTabs.BANDAGE,
      name: aftercareTabs.BANDAGE,
      onClick: () => setTab(aftercareTabs.BANDAGE),
    },
  ];

  return (
    <div className="aftercare">
      <div className="aftercare-container">
        <img
          src={aftecareImage}
          alt="aftercare"
          className="aftercare-container-welcome-image"
        />
        <div className="aftercare-container-tab-buttons">
          {renderTabButtons(tabButtons)}
        </div>
        <AftercareInstructions tab={tab} />
      </div>
    </div>
  );
};

export default Aftercare;
