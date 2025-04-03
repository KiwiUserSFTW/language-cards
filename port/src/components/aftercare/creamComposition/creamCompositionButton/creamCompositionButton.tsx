// styles
import './creamCompositionButton.scss';

// react
import { FC } from 'react';
import { useNavigate } from 'react-router';

// localization
import { useTranslation } from 'react-i18next';

const CreamCompositionButton: FC = () => {
  const navigate = useNavigate();

  const { t } = useTranslation('gift');

  return (
    <div className='cream-composition-container'>
      <button className="cream-composition-button" onClick={() => navigate('/cream-composition')}>
        {t('gift.cream-composition.button.title')}
      </button>
    </div>
  );
};

export default CreamCompositionButton;
