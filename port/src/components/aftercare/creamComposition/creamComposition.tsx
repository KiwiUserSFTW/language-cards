// styles
import "./CreamComposition.scss";

// react
import { FC, useEffect} from 'react';

// localization
import { useTranslation } from 'react-i18next';

type creamCompositionData = {
  title: string;
  description: string;
  specialFormula: {
    title: string;
    details: string;
    benefits: string[];
  };
  usage: {
    title: string;
    instructions: string;
    naturalHealing: {
      title: string;
      content: string;
    };
    seasonalUse: {
      content: string;
      title: string;
    };
  };
  storageConditions: {
    title: string;
    content: string;
  };
  ingredients: {
    title: string;
    content: string[];
  };
};
const CreamComposition: FC = () => {
  const { t } = useTranslation('gift');
  const data = t('gift.cream-composition', {
    returnObjects: true,
  }) as creamCompositionData;


  useEffect(() => {
    window.scrollTo(0, 0); // Прокручує на верх сторінки
  }, [location]);

  return (
    <div className="cream-composition">
      <h3> {data.title}</h3>
      <p>{data.description}</p>
      <div className="special-formula">
        <h4>Special Formula</h4>
        <p>{data.specialFormula.details}</p>
        <ul>
          {data.specialFormula.benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </div>

      <div className="usage">
        <h4>{data.usage.title}</h4>
        <p>{data.usage.instructions}</p>
        <p>
          <strong>{data.usage.naturalHealing.title}:</strong>{' '}
          {data.usage.naturalHealing.content}
        </p>
        <p>
          <strong>{data.usage.seasonalUse.title}</strong> {data.usage.seasonalUse.content}
        </p>
      </div>
      <div className="storage-conditions">
        <h4>{data.storageConditions.title}</h4>
        <p>{data.storageConditions.content}</p>
      </div>
      <div className="ingredients">
        <h4>{data.ingredients.title}</h4>
        <ul>
          {data.ingredients.content.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CreamComposition;
